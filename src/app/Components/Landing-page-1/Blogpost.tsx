import { createClient } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

// Configure the Sanity client using environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-08-31',
  useCdn: false,
});

// Define the type for the blog posts fetched from Sanity
interface BlogPost {
  _id: string;
  title: string;
  publishedAt: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
}

export default async function BlogPage() {
  let blogPosts: BlogPost[] = [];

  try {
    const query = `
      *[_type == "blog"] | order(publishedAt desc)[0...3] {
        _id,
        title,
        mainImage {
          asset->{
            _id,
            url
          }
        },
        publishedAt,
        slug
      }
    `;
    blogPosts = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-amber-500 text-2xl font-serif text-center mb-2">Blog Post</h2>
        <h3 className="text-4xl font-bold text-center mb-12">Latest News & Blog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <div key={post._id} className="bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={post.mainImage?.asset?.url || "/placeholder.png"} // Fallback image
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <p className="text-amber-500 text-sm mb-2">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h4 className="text-xl font-semibold mb-4">{post.title}</h4>
                  <div className="flex items-center justify-between">
                    <Link href={`/blog/${post.slug.current}`} className="text-amber-500 hover:underline">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No recent blog posts available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
