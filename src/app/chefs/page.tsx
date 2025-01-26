"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";


// Sanity Client Configuration using environment variables
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'default_project_id',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2021-08-31',
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true",
});

interface Chef {
  _id: string;
  name: string;
  position: string;
  experience: number;
  specialty: string;
  description: string;
  available: boolean;
  imageUrl: string;
}

const ChefGallery = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const chefData = await client.fetch(`
          *[_type == "chef"] {
            _id,
            name,
            position,
            experience,
            specialty,
            description,
            available,
            "imageUrl": image.asset->url
          }
        `);
        setChefs(chefData);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Header-bg.png')",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Our Chefs</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">
            Home
          </Link>
          <span className="text-orange-500">›</span>
          <span className="text-orange-500">Chefs</span>
        </p>
      </div>

      {/* Chef Images Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Talented Chefs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chefs.map((chef) => (
            <div
              key={chef._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={chef.imageUrl || "/placeholder.png"}
                alt={chef.name}
                width={400}
                height={400}
                className="w-full h-96 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{chef.name}</h3>
                <p className="text-gray-500 text-sm">{chef.position}</p>
                <p className="text-gray-500 text-sm">Experience: {chef.experience} years</p>
                <p className="text-gray-500 text-sm">Specialty: {chef.specialty}</p>
                <p className="text-gray-500 text-sm">{chef.description}</p>
                {chef.available && (
                  <span className="text-green-500 text-sm">Currently Active</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefGallery;
