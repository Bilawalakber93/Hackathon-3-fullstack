import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { createClient } from "next-sanity";

// Configure the Sanity client using environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'default_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-08-31',
  useCdn: false,
});

interface Post {
  _id: string;
  title: string;
  publishedAt: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
}

async function Footer() {
  const query = `
    *[_type == "blog"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      publishedAt,
      mainImage {
        asset->{
          url
        }
      }
    }
  `;
  let recentPosts: Post[] = [];

  try {
    recentPosts = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching posts:", error);
    recentPosts = [];
  }

  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Newsletter Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2 text-white">
            <span className="text-amber-500">Still</span> You Need Our Support?
          </h2>
          <p className="text-gray-400 mb-4">
            Don&apos;t wait! Make a smart &amp; logical quote here. It&apos;s pretty easy.
          </p>

          <form className="flex flex-col md:flex-row justify-center items-center gap-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full md:w-1/3 px-4 py-2 rounded-md focus:outline-none text-black"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-all"
            >
              Subscribe Now
            </button>
          </form>
        </div>
        <hr className="border-gray-700 mb-8" />

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold mb-3">About Us.</h3>
            <p className="text-gray-400 leading-relaxed">
              Corporate clients and leisure travelers rely on Groundlink for
              dependable, safe, and professional chauffeur service across major
              cities worldwide.
            </p>
            <div className="mt-4">
              <span className="block text-amber-500 font-semibold">
                Opening Hours
              </span>
              <p>Mon - Sat (8.00 - 6.00)</p>
              <p>Sunday - Closed</p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Useful Links</h3>
            <ul className="space-y-2">
              {["About", "News", "Partners", "Team", "Menu", "Contacts"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-orange-500">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white font-semibold mb-3">Help?</h3>
            <ul className="space-y-2">
              {[
                "FAQ",
                "Term & Conditions",
                "Reporting",
                "Documentation",
                "Support Policy",
                "Privacy",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-amber-500">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-white font-semibold mb-3">Recent Post</h3>
            <ul className="space-y-3">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <li key={post._id} className="flex items-start gap-3">
                    <div>
                      <Image
                        src={post.mainImage?.asset?.url || "/placeholder.png"}
                        alt={post.title}
                        width={60}
                        height={59}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold hover:text-amber-500">
                        {post.title}
                      </p>
                      <span className="text-gray-400 text-xs">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No recent posts available.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center text-white text-sm bg-gray-700">
          <p className="text-center md:text-left mb-4 md:mb-0">
            Copyright &copy; {new Date().getFullYear()} by FoodTuck! All Rights Reserved.
          </p>
          <FaFacebook />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
