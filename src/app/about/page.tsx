import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Aboutus = () => {
  return (
    <div>
        <div className="bg-gray-50  w-full min-h-screen">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Header-bg.png')",
        }}
      >
        <h1 className="text-white text-3xl font-bold">ABOUT-US</h1>
        <p className="text-white mt-2">
          <Link href="/" className="text-gray-300 hover:underline">Home</Link>
          <span className="text-orange-500">›</span>
          <span className="text-orange-500">About us</span>
        </p>
      </div>
        {/* About us Section */}
      <section className="py-12 px-4 md:px-16 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left - Images */}
        <div className="grid grid-cols-2 gap-4 md:w-1/2">
          <Image
            src="/Aboutus-img/Aboutus-img-1.png"
            alt="Food 1"
            width={669}
            height={734}
            className="rounded-lg shadow-md ml-20"
          />
        </div>

        {/* Right - Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h4 className="text-orange-500 font-semibold mb-2">About us</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Food is an important <br /> part of a balanced Diet
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum non tristique blandit. Ut magna nulla
            augue augue, vitae feugiat pretium donec id elementum. Ultrices
            morbi vitae risus, lacus, nisi id.
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition">
              Show more
            </button>
            <button className="flex items-center gap-2 text-gray-800 font-medium py-3 px-6 rounded-full border-2 border-gray-200 hover:border-gray-400 transition">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-orange-500">
                ►
              </span>
              Watch video
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Why Choose Us */}
      <section className="text-center py-10 bg-gray-100 px-6">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
        <p className="text-gray-600 mt-4 -mb-1">
          Explore our unique features that make us stand out!
        </p>
        <span className='text-gray-600 mt-1 mb-8'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, debitis.
            </span>
        <Image
        src='/Aboutus-img/img-4.png'
        alt=''
        width={1320}
        height={386}
        className='ml-[200px]'
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col items-center">
            <span className="text-amber-500 text-4xl">&#127860;</span>
            <h3 className="font-semibold text-lg mt-4">Best Chef</h3>
            <p className="text-gray-500 mt-2">Our experienced chefs deliver exceptional flavors.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-500 text-4xl">&#127869;</span>
            <h3 className="font-semibold text-lg mt-4">100% New Food</h3>
            <p className="text-gray-500 mt-2">Fresh, quality ingredients in every meal.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-500 text-4xl">&#127757;</span>
            <h3 className="font-semibold text-lg mt-4">Clean Environment</h3>
            <p className="text-gray-500 mt-2">Our spaces are hygienic and welcoming.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Image
      src='/Aboutus-img/Team Member.png'
      alt=''
      width={1920}
      height={686}
      />
    </div>
</div>
  )
}

export default Aboutus
