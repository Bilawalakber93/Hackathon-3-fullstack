'use client';

import { createClient } from "next-sanity";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import { Search } from "lucide-react";
import Link from "next/link";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'default_project_id',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2021-08-31',
  useCdn: process.env.SANITY_USE_CDN === "true",
});

interface Comment {
  author: string;
  content: string;
  timestamp: string;
}

interface Blog {
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  author: string;
  comments: Comment[];
  slug: string;
  tags: string[];
  menu: string;
}

interface Menu {
  title: string;
  image: string;
  itemCount: number;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fetchedBlogs = await client.fetch(
          `*[_type == "blog"] | order(publishedAt desc) {
            title,
            description,
            publishedAt,
            "image": mainImage.asset->url,
            author,
            comments,
            slug,
            tags,
            "menu": menu->title
          }`
        );
        const fetchedMenuItems = await client.fetch(
          `*[_type == "menu"] {
            title,
            "image": image.asset->url,
            "itemCount": count(*[_type == "blog" && menu._ref == ^._id])
          }`
        );

        setBlogs(fetchedBlogs);
        setMenuItems(fetchedMenuItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMenuChange = (menu: string) => {
    setSelectedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedMenus.length === 0 || selectedMenus.includes(blog.menu)) &&
      (searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTags.length === 0 || blog.tags?.some((tag) => selectedTags.includes(tag)))
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Header-bg.png')",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Blog</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">
            Home
          </Link>
          <span className="text-orange-500">›</span>
          <span className="text-orange-500">Blog</span>
        </p>
      </div>

      <div className="container mx-auto px-3 py-5 lg:flex gap-8">
        {/* Main Blog Content */}
        <div className="lg:w-2/3 w-full">
          {filteredBlogs.map((blog, index) => (
            <div key={index} className="bg-gray-50 shadow-md mb-8">
              <Image
                src={blog.image}
                alt={blog.title}
                width={871}
                height={520}
                className="object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  <span>{blog.comments?.length || 0} Comments</span>
                  <span>{blog.author}</span>
                </div>
                <h2 className="text-2xl font-bold mt-4">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Section */}
        <div className="lg:w-1/3 w-full">
          {/* Search Bar */}
          <div className="p-6 bg-gray-50 shadow-md mb-8 text-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Keywords ..."
                className="bg-white text-gray-400 py-4 px-14 pr-8 outline-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-8 h-8 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Profile Card */}
          <div className="p-6 bg-gray-50 shadow-md mb-8 text-center">
            <Image
              src="/Blog-img/Blogger.png"
              alt="User"
              width={147}
              height={125.45}
              className="mx-auto rounded-full"
            />
            <h3 className="font-bold text-lg mt-4">Admin</h3>
            <p className="text-orange-500 text-sm mb-2">Blogger & Photographer</p>
            <p className="text-gray-600 text-sm">This is the blogger of the website.</p>
            <div className="flex justify-center gap-4 mt-4 hover:text-amber-500">
              <FaFacebook className="w-6 h-6" />
              <FaTwitter className="w-6 h-6" />
              <FaInstagram className="w-6 h-6" />
              <FaPinterest className="w-6 h-6" />
              <FaYoutube className="w-6 h-6" />
            </div>
          </div>

          {/* Recent Posts */}
          <div className="p-6 bg-gray-50 shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Recent Posts</h3>
            <div className="space-y-4">
              {blogs
                .slice(0, 5)
                .map((blog, index) => (
                  <div key={index} className="flex gap-4">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={120}
                      height={90}
                      className="object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">{blog.title}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Filter by Menu */}
          <div className="p-6 bg-gray-50 shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Filter By Menu</h3>
            <ul className="space-y-4">
              {menuItems.map((menu, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image src={menu.image} alt={menu.title} width={50} height={50} />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedMenus.includes(menu.title)}
                        onChange={() => handleMenuChange(menu.title)}
                        className="form-checkbox"
                      />
                      <span className="text-gray-700">{menu.title}</span>
                    </label>
                  </div>
                  <span className="text-gray-500">{menu.itemCount}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags Section */}
          <div className="p-6 bg-gray-50 shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Popular Tags</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-3">
                {[...new Set(blogs.flatMap((blog) => blog.tags || []))].map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition ${
                      selectedTags.includes(tag)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300 text-gray-700 hover:bg-orange-500 hover:text-white"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="p-6 bg-gray-50 shadow-md mb-8 text-center">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Follow Us</h3>
            <div className="flex justify-center gap-5">
              <FaFacebook className="hover:bg-gray-400 p-2 w-10 h-10 rounded-full cursor-pointer" />
              <FaTwitter className="hover:bg-gray-400 p-2 w-10 h-10 rounded-full cursor-pointer" />
              <FaInstagram className="hover:bg-gray-400 p-2 w-10 h-10 rounded-full cursor-pointer" />
              <FaPinterest className="hover:bg-gray-400 p-2 w-10 h-10 rounded-full cursor-pointer" />
              <FaYoutube className="hover:bg-gray-400 p-2 w-10 h-10 rounded-full cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
