"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";

// Define the type for the menu
interface MenuItem {
  name: string;
  description: string;
  calories: number;
  price: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface Menu {
  title: string;
  imageUrl: string;
  sections: MenuSection[];
}

// Create a utility function to get the Sanity client
const getSanityClient = () => {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: true,
    apiVersion: process.env.SANITY_API_VERSION || '2021-08-31',
    token: process.env.SANITY_API_TOKEN || "",
  });
};

const MenuPage: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const client = getSanityClient();
        const data: Menu[] = await client.fetch(`*[_type == "menu"]{
          title,
          "imageUrl": image.asset->url,
          sections[] {
            title,
            items[] {
              name,
              description,
              calories,
              price
            }
          }
        }`);
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  if (!menus.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white font-sans">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Header-bg.png')",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Our Menus</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">
            Home
          </Link>
          <span className="text-orange-500">›</span>
          <span className="text-orange-500">Menus</span>
        </p>
      </div>

      <main className="py-12 px-6 md:px-16 lg:px-28">
        {menus.map((menu, menuIndex) => (
          <div key={menuIndex}>
            {/* Menu Sections */}
            {menu.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-gray-50 flex justify-center items-center p-8 mb-16"
              >
                <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 p-6">
                    <Image
                      src={menu.imageUrl}
                      alt={menu.title || "Menu Image"}
                      width={400}
                      height={480}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-8">
                    <h3 className="text-3xl font-bold mb-6">{section.title}</h3>
                    <div className="space-y-6">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex justify-between items-center border-b pb-4"
                        >
                          <div>
                            <h4 className="text-lg font-semibold hover:text-orange-600">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.calories} CAL
                            </p>
                          </div>
                          <p className="text-orange-500 font-bold">
                            ${item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
};

export default MenuPage;
