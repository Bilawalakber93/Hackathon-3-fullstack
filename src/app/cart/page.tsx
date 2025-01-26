"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Load cart data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    setCartItems(parsedCart as CartItem[]);
  }, []);

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Handle quantity change
  const handleQuantityChange = (id: string, action: string) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === id) {
        const updatedQuantity =
          action === "increment" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(updatedQuantity, 1) };
      }
      return item;
    });
    updateCart(updatedItems);
  };

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    updateCart(updatedItems);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Calculate the total
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

  // Apply coupon functionality
  const applyCoupon = () => {
    const validCoupon = "pakistan";
    if (coupon === validCoupon) {
      setDiscount(15);
      alert("Coupon applied successfully! You got 15% off.");
      localStorage.setItem("discount", "15");
    } else {
      setDiscount(0);
      alert("Invalid coupon code. Please try again.");
      localStorage.removeItem("discount");
    }
  };

  const { subtotal, shipping, total } = calculateTotal();

  // User authentication
  const { userId } = useAuth();
  const router = useRouter();

  // Checkout functionality
  const handleCheckout = () => {
    if (userId) {
      router.push("/checkout");
    } else {
      alert("Please log in to proceed to checkout.");
    }
  };

  return (
    <div className="bg-gray-400">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Header-bg.png')",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Shopping Cart</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">Home</Link>
          <span className="text-orange-500">›</span>
          <span className="text-orange-500">Shopping cart</span>
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Cart Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-8">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                          onClick={() => handleQuantityChange(item._id, "decrement")}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                          onClick={() => handleQuantityChange(item._id, "increment")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td
                      className="px-6 py-4 text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      X
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Coupon Code Section */}
        <div className="lg:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Coupon Code</h2>
          <p className="text-gray-600 mb-4">
            Enter a coupon code to get a discount on your order.
          </p>
          <div className="flex">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
            />
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Total Bill Section */}
        <div className="lg:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Total Bill</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Cart Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Shipping Charges</span>
            <span className="font-bold">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Discount</span>
            <span className="font-bold">{discount}%</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold text-orange-500">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-orange-500 text-white py-2 mt-4 rounded hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
