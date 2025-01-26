import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FoodSection: React.FC = () => {
  return (
    <div className='-mt-40'>
    <section className="bg-black text-white px-6 lg:px-16 py-12 lg:py-24">
      {/* About Us Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-amber-500 italic text-2xl mb-2">About us</p>
          <h2 className="text-6xl lg:text-7xl font-bold mb-4">
            We <span className="text-amber-500">Create</span> the best foody product
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. 
            Ultrices mattis sed vitae mus risus.
          </p>
          <ul className="space-y-2 text-gray-300 mb-6 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 font-bold">&#10003;</span> Lacus nisi, et ac dapibus sit eu velit in consequat.
            </li>
            <li className="flex items-start gap-3 text-lg">
              <span className="text-yellow-400 font-bold">&#10003;</span> Quisque diam pellentesque bibendum non dui volutpat fringilla.
            </li>
            <li className="flex items-start gap-3 text-lg">
              <span className="text-yellow-400 font-bold">&#10003;</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </li>
          </ul>
          <Link
            href="/about"
            className="inline-block bg-amber-500 text-gray-600 px-14 py-4 rounded-full font-medium hover:bg-yellow-500 transition duration-300"
          >
            Read More
          </Link>
        </div>

        {/* Right Image Grid */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Image
              src="/Foodsection-img/img-1.png"
              alt="Food Item 1"
              width={660}
              height={330}
              className="rounded-lg object-cover"
            />
          </div>
          <Image
            src="/Foodsection-img/img-2.png"
            alt="Food Item 2"
            width={350}
            height={194}
            className="rounded-lg object-cover"
          />
          <Image
            src="/Foodsection-img/img-3.png"
            alt="Food Item 3"
            width={350}
            height={194}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Food Category Section */}
      <div className="mt-16 text-center">
        <p className="text-yellow-400 italic text-lg">Food Category</p>
        <h2 className="text-4xl font-bold mb-8">
          Choose <span className="text-yellow-400">Food Item</span>
        </h2>

        {/* Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg font-black">
            <Image
              src="/Foodsection-img/img-4.png"
              alt="Fast Food Dish"
              width={430}
              height={329}
              className="object-cover"
            />
            <div className="absolute top-2 left-2 bg-amber-500 text-gray-600 px-2 py-1 text-sm font-semibold rounded">
              Save 30%
              </div>
              <div className="p-0">
              <p className="hover:text-gray-800 font-semibold text-center">Fast Food Dish</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/Foodsection-img/img-5.png"
              alt="Burger"
              width={430}
              height={329}
              className='object-cover'
            />
            <div className="p-0">
              <p className="hover:text-gray-800 font-semibold text-center">Delicious Burger</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/Foodsection-img/img-6.png"
              alt="Salad"
              width={430}
              height={329}
              className="object-cover"
            />
            <div className="p-0">
              <p className="hover:text-gray-800 font-semibold text-center">Healthy Salad</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/Foodsection-img/img-7.png"
              alt="Dessert"
              width={430}
              height={329}
              className="object-cover"
            />
            <div className="p-0">
              <p className="hover:text-gray-800 font-semibold text-center">Delicious Dessert</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default FoodSection;
