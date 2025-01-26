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

// Define the type for the chef data
interface Chef {
  _id: string;
  name: string;
  position: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export default async function ChefSection() {
  let chefs: Chef[] = [];

  try {
    // Fetch 4 random chefs who are currently active
    const query = `
      *[_type == "chef" && available == true] | order(_createdAt desc)[0...4] {
        _id,
        name,
        position,
        image {
          asset->{
            url
          }
        }
      }
    `;
    chefs = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching chefs:", error);
  }

  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-center text-amber-500 text-2xl mb-2">Chefs</h2>
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-12">
          <span className="text-amber-500">Me</span>et Our Chef
        </h1>

        {/* Chef Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {chefs.length > 0 ? (
            chefs.map((chef) => (
              <div
                key={chef._id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={chef.image?.asset?.url || "/placeholder.png"} // Fallback image
                    alt={chef.name}
                    fill
                    style={{ objectFit: "cover" }} // Updated to use "style" for fill
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-1">{chef.name}</h3>
                  <p className="text-gray-400">{chef.position}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No chefs available.</p>
          )}
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center">
          <Link href="/chefs">
            <button className="bg-transparent border border-amber-500 text-amber-500 px-14 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300">
              See More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
