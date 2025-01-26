'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const savedCart = localStorage.getItem('cart');
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    setCartCount(cartItems.length);
  };

  useEffect(() => {
    setIsMounted(true);
    updateCartCount();

    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <nav className="bg-black text-white py-4">
      <div className="mx-auto px-4 text-center">
        {/* Logo */}
        <div className="text-4xl mt-2 font-bold">
          <span className="text-amber-600">Food</span>
          <span className="text-white">tuck</span>
        </div>
      </div>
      <div className="mx-auto text-2xl px-4 flex justify-between items-center">
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
          <Link href="/menu" className="hover:text-amber-600">
            Menu
          </Link>
          <Link href="/blog" className="hover:text-amber-600">
            Blog
          </Link>
          <Link href="/FAQ" className="hover:text-amber-600">
            Pages
          </Link>
          <Link href="/about" className="hover:text-amber-600">
            About
          </Link>
          <Link href="/Shop" className="hover:text-amber-600">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-amber-600">
            Contact
          </Link>
        </div>
        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Link href="/cart" className="text-white hover:text-amber-500">
              <ShoppingCart className="w-6 h-6 cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          {isMounted && (
            <>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              Menu
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              Our Chefs
            </Link>
            <Link
              href="/FAQ"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              Pages
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/Shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;