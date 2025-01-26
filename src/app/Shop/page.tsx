"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { createClient } from "@sanity/client";


const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-08-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});


interface Category {
  _id: string;
  name: string;
}

interface Food {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tags: string[];
  imageUrl: string;
  available: boolean;
  category: Category;
}

const MainLayout = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(8000);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showCount, setShowCount] = useState("default");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetching food data from Sanity
    sanity
      .fetch(
        `*[_type == "food"] {
          _id,
          name,
          price,
          originalPrice,
          tags,
          "imageUrl": image.asset->url,
          available,
          category->{
            _id,
            name
          }
        }`
      )
      .then((foodData: Food[]) => {
        setFoods(foodData);

        // Extract unique tags from food data
        const uniqueTags = [...new Set(foodData.flatMap((food) => food.tags || []))];
        setTags(uniqueTags);
      })
      .catch((error) => console.error("Error fetching food data:", error));

    // Fetching category data from Sanity
    sanity
      .fetch(
        `*[_type == "foodCategories"] {
          _id,
          name
        }`
      )
      .then((categoryData) => setCategories(categoryData))
      .catch((error) => console.error("Error fetching category data:", error));
  }, []);

  const handleAddToCart = (food: Food) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Food) => item._id === food._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch custom event to update Navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${food.name} has been added to your cart!`);
  };

  const filteredFoods = foods
    .filter(
      (food) =>
        food.price <= priceRange &&
        (selectedCategories.length === 0 || selectedCategories.includes(food.category?._id || "")) &&
        (selectedTags.length === 0 || selectedTags.some((tag) => food.tags?.includes(tag))) &&
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "priceLow") return a.price - b.price;
      if (sortOrder === "priceHigh") return b.price - a.price;
      return 0;
    });

  const foodsToDisplay =
    showCount === "default"
      ? filteredFoods
      : filteredFoods.slice(0, parseInt(showCount, 10));

  // Toggle tags and categories
  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  return (
    <div>
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/Header-bg.png')" }}
      >
        <h1 className="text-white text-3xl font-bold">Our Shop</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">
            Home
          </Link>
          <span className="text-orange-500">›</span>
          <span className="text-orange-500">Shop</span>
        </p>
      </div>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Sort By and Show */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <label htmlFor="sortBy" className="text-gray-700 font-medium mr-2">
                Sort By:
              </label>
              <select
                id="sortBy"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded-md px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">Newest</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="showCount" className="text-gray-700 font-medium mr-2">
                Show:
              </label>
              <select
                id="showCount"
                value={showCount}
                onChange={(e) => setShowCount(e.target.value)}
                className="border rounded-md px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-orange-500"
              >
                <option value="default">Default</option>
                <option value="10">10 Items</option>
                <option value="20">20 Items</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodsToDisplay.map((food) => (
              <div
                key={food._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={food.imageUrl}
                  alt={food.name}
                  width={412}
                  height={330}
                  className="object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{food.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-bold">${food.price}</span>
                    {food.originalPrice && (
                      <span className="text-gray-400 line-through">${food.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(food)}
                    className="mt-4 w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
                  >
                    Add to Cart
                  </button>
                  <Link href={`/products/${food._id}`}>
                    <button className="mt-2 w-full py-2 border border-orange-500 text-orange-500 font-semibold rounded-md hover:bg-orange-500 hover:text-white">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <label className="flex items-center text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => toggleCategory(category._id)}
                      className="mr-2 rounded border-gray-300 focus:ring-orange-500"
                    />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter By Price */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Filter By Price</h3>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="8000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>From $0 to ${priceRange}</span>
              <button className="text-orange-500 font-medium">Filter</button>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="p-6 bg-gray-50 shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Popular Tags</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer $$
                    {selectedTags.includes(tag)
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500 hover:text-white transition"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="p-6 bg-gray-50 shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Follow Us</h3>
            <div className="flex justify-center gap-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="hover:bg-gray-400 w-10 h-10" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="hover:bg-gray-400 w-10 h-10" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:bg-gray-400 w-10 h-10" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <FaPinterest className="hover:bg-gray-400 w-10 h-10" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="hover:bg-gray-400 w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
