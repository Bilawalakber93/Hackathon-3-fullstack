import React from 'react'
import HeroSection from './Components/Landing-page-1/Hero'
import FoodSection from './Components/Landing-page-1/FoodSection'
import WhyChooseUs from './Components/Landing-page-1/why-choose-us'
import StatsSection from './Components/Landing-page-1/StatsSection'
import HeroMenu from './Components/Landing-page-1/HeroMenu'
import CheifSection from './Components/Landing-page-1/Cheif-Section'
import Testimonials from './Components/Landing-page-1/TestimonialsSection'
import FoodProcessSection from './Components/Landing-page-1/FoodProcessSection'
import Blogpost from './Components/Landing-page-1/Blogpost'




const page = () => {
  return (
    <div>
      <HeroSection />
      <FoodSection />
      <WhyChooseUs />
      <StatsSection />
      <HeroMenu />
      <CheifSection />
      <Testimonials />
      <FoodProcessSection />
      <Blogpost />
     </div>
  )
}

export default page
