"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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
  description: string;
  imageUrl?: string;
  available: boolean;
  category: Category;
}

const HeroMenu: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    // Fetch categories initially
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/sanity");
        const data = await response.json();
        setCategories(data.categories);

        // Set first category as default
        if (data.categories.length > 0) {
          setActiveCategory(data.categories[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    // Fetch foods based on active category
    const fetchFoods = async () => {
      try {
        const response = await fetch(`/api/sanity?category=${activeCategory}`);
        const data = await response.json();
        setFoods(data.foods);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, [activeCategory]);

  return (
    <div>
      <section className="bg-black text-white py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-center text-amber-500 text-2xl mb-2">Choose & Pick</h2>
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-8">
            <span className="text-amber-500">Fr</span>om Our Menu
          </h1>

          {/* Category Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category._id}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category._id
                    ? "bg-amber-500 text-white"
                    : "text-amber-500 hover:bg-amber-500 hover:text-white"
                } transition-colors duration-300`}
                onClick={() => setActiveCategory(category._id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Featured Image */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/Hero-menu-sec-img/main.png"
                alt="Featured Dish"
                width={466}
                height={362}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Food Items */}
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <div key={food._id} className="flex items-center gap-2">
                    <Image
                      src={food.imageUrl || "/placeholder.png"} // Fallback image
                      alt={food.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{food.name}</h3>
                      <p className="text-gray-400 text-sm">{food.description}</p>
                      <p className="text-amber-500 font-bold mt-1">
                        ${food.price.toFixed(2)}
                        {food.originalPrice && food.originalPrice !== food.price && (
                          <span className="line-through text-gray-500 ml-2">
                            ${food.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center w-full">No items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroMenu;
