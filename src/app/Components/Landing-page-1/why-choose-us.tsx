import React from 'react';
import { PiHamburgerFill } from "react-icons/pi";
import { FaPizzaSlice, FaWineGlass } from "react-icons/fa";
import Image from 'next/image';

const WhyChooseUs: React.FC = () => {
  return (
    <div className='-mt-20'>
    <section className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left Image Section */}
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <Image
          src="/why-choose-us-img/img-1.png" // Use the correct relative path
          alt="Tacos"
          width={362} // Set the appropriate width
          height={356} // Set the appropriate height
          className="rounded-md object-cover row-span-2"
          />
          <Image
            src="/why-choose-us-img/img-2.png"
            alt="Burger"
            width={281} // Set the appropriate width
            height={231} // Set the appropriate height
            className="rounded-md object-cover mt-20"
          />
          <Image
            src="/why-choose-us-img/img-4.png"
            alt="Fast Food"
            width={210} // Set the appropriate width
            height={300} // Set the appropriate height
            className="row-span-3 rounded-md object-cover -ml-20"
          />
          <Image
            src="/why-choose-us-img/img-3.png"
            alt="Chicken"
            width={244} // Set the appropriate width
            height={306} // Set the appropriate height
            className="rounded-md object-cover -mt-[330px]"
          />
          <Image
            src="/why-choose-us-img/img-5.png"
            alt="Dinner"
            width={141} // Set the appropriate width
            height={168} // Set the appropriate height
            className="rounded-lg object-cover -mt-[650px] ml-[470]"
          />
          <Image
            src="/why-choose-us-img/img-6.png"
            alt="Fast Food"
            width={141} // Set the appropriate width
            height={166} // Set the appropriate height
            className="rounded-lg object-cover ml-[470] -mt-[520px]"
          />
        </div>
        {/* Right Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-amber-500 italic text-2xl mb-2">Why Choose us</p>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="text-amber-500">Ex</span>tra ordinary taste And Experienced
          </h2>
          <p className="text-gray-300  text-xl mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum.
          </p>
          {/* Service Categories */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-amber-500 text-gray-900 flex items-center justify-center rounded-lg">
              <PiHamburgerFill className='w-14 h-14'/>
                <i className="PiHamburgerFill text-2xl"></i>
              </div>
              <p className="mt-2 text-gray-300">Fast Food</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-amber-500 text-gray-900 flex items-center justify-center rounded-lg">
              <FaPizzaSlice className='w-14 h-14'/>
                <i className="FaPizzaSlice text-2xl"></i>
              </div>
              <p className="mt-2 text-gray-300">Lunch</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-amber-500 text-gray-900 flex items-center justify-center rounded-lg">
              <FaWineGlass className='w-14 h-14'/>
                <i className="FaWineGlass text-2xl"></i>
              </div>
              <p className="mt-2 text-gray-300">Dinner</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="bg-amber-500 text-gray-900 px-6 py-3 rounded-l-md font-bold text-3xl">
              30+
            </div>
            <div className="bg-gray-800 text-white px-6 py-3 rounded-r-md font-semibold">
              Years of <span className="text-white">Experienced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default WhyChooseUs;
