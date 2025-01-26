import React from "react";
import { FaPlayCircle } from "react-icons/fa"

const FoodProcessSection: React.FC = () => {
  return (
    <section className="relative w-full h-auto bg-black text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: "url('/Eight-hero-img/bg-img.png')", // Replace with your actual image
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 lg:px-16 py-12">
        {/* Left Section: Image (optional for responsiveness) */}
        <div className="hidden lg:block w-full lg:w-1/2">
        </div>

        {/* Right Section: Text and Buttons */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-amber-500 italic text-lg mb-2">
            Restaurant Active Process
          </p>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            <span className="text-amber-500">We</span> Document Every Food <br />
            Bean Process until it is saved
          </h1>
          <p className="text-gray-300 mt-4 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum non dui volutpat fringilla bibendum. Uma,
            elit augue urna.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="px-6 py-2 border-2 border-amber-500 text-amber-500 rounded-full hover:bg-yellow-400 hover:text-black transition duration-300">
              Read More
            </button>
            <button className="px-6 py-2 flex items-center gap-2 text-black bg-amber-500 rounded-full hover:bg-yellow-500 transition duration-300">
              <span>Play Video</span>
              <span className="bg-amber-700 text-amber-500 w-6 h-6 flex items-center justify-center rounded-full">
              <FaPlayCircle />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodProcessSection;
