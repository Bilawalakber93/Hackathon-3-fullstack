"use client";

import { useAuth, useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const { isLoaded, userId } = useAuth();
  const { user: currentUser } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    phone: "",
    company: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
  });
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedDiscount = localStorage.getItem("discount");
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
    setDiscount(savedDiscount ? parseInt(savedDiscount) : 0);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = cartItems.length > 0 ? 5 : 0;
    const total = subtotal + shipping;
    const discountedTotal = total - (total * discount) / 100;
    return { subtotal, shipping, total: discountedTotal };
  };

  const isShippingFormValid = () => {
    const { phone, country, city, address, zipCode } = shippingDetails;
    return phone && country && city && address && zipCode;
  };

  const placeOrder = async () => {
    if (!isShippingFormValid()) {
      alert("Please fill out all required fields in the shipping form.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      if (!currentUser) {
        alert("User not authenticated!");
        return;
      }

      const { subtotal, shipping, total } = calculateTotal();

      const payload = {
        clerkId: currentUser.id,
        fullName: currentUser.fullName || "Guest",
        email:
          currentUser.primaryEmailAddress?.emailAddress || "guest@example.com",
        phone: currentUser.primaryPhoneNumber?.phoneNumber || "",
        cartItems: cartItems.length > 0 ? cartItems : [],
        subtotal: subtotal || 0,
        discount: discount || 0,
        shipping: shipping || 0,
        total: total || 0,
        shippingDetails: {
          ...shippingDetails,
          state: "",
          postalCode: shippingDetails.zipCode || "",
        },
      };

      const response = await fetch("/api/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      localStorage.removeItem("discount");
      setCartItems([]);
      setDiscount(0);
      router.push("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        `Failed to place order. ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!userId) return <RedirectToSignIn />;

  const { subtotal, shipping, total } = calculateTotal();

  return (
    <div className="bg-checkout-bg bg-cover bg-center min-h-screen">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-48 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Header-bg.png')",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Checkout</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">
            Home
          </Link>
          <span className="text-orange-500">›</span>{" "}
          <span className="text-orange-500">Checkout</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                aria-label="Phone number"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={shippingDetails.company}
                onChange={handleInputChange}
                aria-label="Company"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="country"
                value={shippingDetails.country}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" disabled>
                  Choose country
                </option>
                <option value="Pakistan">Pakistan</option>
              </select>
              <select
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" disabled>
                  Choose city
                </option>
                <option value="Karachi">Karachi</option>
                <option value="Quetta">Quetta</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Lahore">Lahore</option>
                <option value="Multan">Multan</option>
                <option value="Islamabad">Islamabad</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                placeholder="Address 1"
                value={shippingDetails.address}
                onChange={handleInputChange}
                aria-label="Address"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip code"
                value={shippingDetails.zipCode}
                onChange={handleInputChange}
                aria-label="Zip code"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item.id || `item-${index}`}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Your cart is empty.</div>
            )}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sub-total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{discount}%</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className={`w-full mt-6 bg-orange-400 text-white px-4 py-2 rounded-md shadow-md ${
              isPlacingOrder ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-500"
            }`}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? "Placing order..." : "Place an order >"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
