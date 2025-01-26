import Image from 'next/image';
import React from 'react';

const StatsSection: React.FC = () => {
  return (
   <div className='-mt-96'>
   <div className="relative bg-black text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('/why-choose-us-img/img-1.png')", // Replace with your image URL
        }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 py-12 ">
        <div className="container mx-auto px-4">
          {/* Flexbox for Icons & Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Item 1 */}
            <div className="flex flex-col items-center gap-2">
              <Image
              src='/menu-img/Group-1.png'
              alt=''
              width={120}
              height={120}
               />
              <p className="text-lg font-semibold">Professional Chefs</p>
              <p className="text-3xl font-bold mt-2">20</p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center gap-2">
            <Image
              src='/menu-img/Group-2.png'
              alt=''
              width={120}
              height={120}
               />
              <p className="text-lg font-semibold">Items Of Food</p>
              <p className="text-3xl font-bold mt-2">30</p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center gap-2">
            <Image
              src='/menu-img/Group-3.png'
              alt=''
              width={120}
              height={120}
               />
              <p className="text-lg font-semibold">Years Of Experienced</p>
              <p className="text-3xl font-bold mt-2">30+</p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center gap-2">
            <Image
              src='/menu-img/Group-4.png'
              alt=''
              width={120}
              height={120}
               />
              <p className="text-lg font-semibold">Happy Customers</p>
              <p className="text-3xl font-bold mt-2">220</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StatsSection;
