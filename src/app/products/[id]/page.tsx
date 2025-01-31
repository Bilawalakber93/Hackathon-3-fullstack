"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { createClient } from "@sanity/client";

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("Missing Sanity configuration in environment variables");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'default_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-08-31',
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true",
});


// Define types
interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tags: string[];
  imageUrl: string;
  available: boolean;
  description: string;
  category: {
    name: string;
  };
}

interface SimilarProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductDetails = () => {
  const { query } = useRouter();
  const { id } = query;
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Fetch product data
    client
      .fetch(
        `*[_type == "food" && _id == $id][0]{
          name,
          price,
          originalPrice,
          tags,
          "imageUrl": image.asset->url,
          available,
          description,
          category->{
            name
          }
        }`,
        { id }
      )
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      });

    // Fetch 4 random similar products
    client
      .fetch(
        `*[_type == "food" && _id != $id][0...4]{
          _id,
          name,
          price,
          "imageUrl": image.asset->url
        }`,
        { id }
      )
      .then((data) => setSimilarProducts(data))
      .catch((error) => console.error("Error fetching similar products:", error));
  }, [id]);

  const handleAddToCart = () => {
    if (quantity < 1) {
      alert("Please select a valid quantity.");
      return;
    }
    const cartItem = {
      productId: id,
      name: product?.name,
      price: product?.price,
      quantity,
      imageUrl: product?.imageUrl,
    };
    console.log("Added to cart:", cartItem);
    alert(`${product?.name} added to cart with quantity ${quantity}!`);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Image */}
      <div>
        <Image
          src={product?.imageUrl || "/placeholder.png"} // Added fallback image
          alt={product?.name || "Product Image"}
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <p className="text-xl font-bold mt-4">${product?.price}</p>
        {product?.originalPrice && (
          <p className="text-gray-400 line-through">${product?.originalPrice}</p>
        )}
        <div className="mt-4 flex items-center space-x-4">
          <label htmlFor="quantity" className="text-gray-600">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            min="1"
            className="border rounded-lg w-20 text-center py-1"
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value));
              setQuantity(value);
            }}
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-orange-500 text-white py-2 px-6 rounded-lg mt-4"
        >
          Add to Cart
        </button>
        <div className="text-sm text-gray-600 mt-4">
          <p>Category: {product?.category?.name}</p>
          <p>Tags: {product?.tags?.join(", ")}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Description</h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
      </div>

      {/* Similar Products */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {similarProducts.map((similarProduct) => (
            <div
              key={similarProduct._id}
              className="border rounded-lg p-4 text-center"
            >
              <Image
                src={similarProduct.imageUrl || "/placeholder.png"} // Fallback image for similar products
                alt={similarProduct.name}
                width={150}
                height={150}
                className="rounded-md mx-auto"
              />
              <h3 className="mt-2 font-bold">{similarProduct.name}</h3>
              <p className="text-gray-600">${similarProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
