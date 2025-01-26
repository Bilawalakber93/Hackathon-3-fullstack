import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-black text-white px-6 lg:px-16 py-12 lg:py-24 flex flex-col lg:flex-row items-center lg:items-start justify-between">
      {/* Left Content */}
      <div className="text-center lg:text-left max-w-xl space-y-6">
        <p className="text-amber-500 italic text-2xl">Its Quick & Amazing!</p>
        <h1 className="text-7xl lg:text-7xl font-bold leading-tight">
        <span className="text-amber-600">Th</span>e Art of speed food Quality
        </h1>
        <p className="text-gray-300 text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed pharetra dolor necque massa congue.
        </p>
        <Link
          href="/menu"
          className="inline-block bg-amber-500 text-gray-600 px-14 py-4 rounded-full font-medium hover:bg-yellow-500 transition duration-300"
        >
          See Menu
        </Link>
      </div>

      {/* Right Image */}
      <div className="ml-24 md:mt-0 md:w-[50%] flex justify-center">
          <Image
            src="/Hero-img/Image-1.png"
            alt="Delicious Food"
            width={977.8}
            height={770}
            />
        </div>
    </section>
  );
};

export default HeroSection;
