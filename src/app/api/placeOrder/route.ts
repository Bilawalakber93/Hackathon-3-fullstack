import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";


// Log environment variables for debugging
console.log('Sanity Project ID:', process.env.SANITY_PROJECT_ID);
console.log('Sanity API Token:', process.env.SANITY_API_TOKEN);

// Initialize the Sanity client using environment variables
const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2021-08-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Define types for cart items and order data
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface ShippingDetails {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderRequestBody {
  clerkId: string;
  fullName: string;
  email: string;
  phone?: string;
  cartItems: CartItem[];
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
  shippingDetails: ShippingDetails;
}

export async function POST(req: NextRequest) {
  try {
    console.log('Received order placement request');

    const body = (await req.json()) as OrderRequestBody;
    console.log('Request Body:', JSON.stringify(body, null, 2));

    const validationErrors: string[] = [];
    if (!body.clerkId) validationErrors.push('Missing Clerk User ID');
    if (!body.fullName) validationErrors.push('Missing Full Name');
    if (!body.email) validationErrors.push('Missing Email');
    if (!body.cartItems?.length) validationErrors.push('Cart is empty');
    if (!body.subtotal) validationErrors.push('Missing Subtotal');
    if (!body.total) validationErrors.push('Missing Total');
    if (!body.shippingDetails) validationErrors.push('Missing Shipping Details');

    if (validationErrors.length > 0) {
      console.error('Order Validation Errors:', validationErrors);
      return NextResponse.json(
        { 
          error: "Validation Failed", 
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    try {
      let sanityUser = await sanity.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: body.clerkId }
      );

      if (!sanityUser) {
        console.log(`Creating new user for Clerk ID: ${body.clerkId}`);
        sanityUser = await sanity.create({
          _type: "user",
          clerkId: body.clerkId,
          name: body.fullName,
          email: body.email,
          phone: body.phone || "",
        });
      }

      const order = await sanity.create({
        _type: "order",
        userId: { _type: "reference", _ref: sanityUser._id },
        items: body.cartItems.map((item: CartItem) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: body.subtotal,
        shipping: body.shipping,
        total: body.total,
        discount: body.discount || 0,
        shippingDetails: body.shippingDetails,
      });

      console.log('Order created successfully:', order._id);

      return NextResponse.json(
        { 
          message: "Order placed successfully", 
          orderId: order._id 
        }, 
        { status: 201 }
      );
    } catch (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { 
          error: "Failed to create order", 
          details: orderError instanceof Error ? orderError.message : 'Unknown error' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in order placement:', error);
    return NextResponse.json(
      { 
        error: "Unexpected error", 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
