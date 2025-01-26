import Image from 'next/image'
import React from 'react'

const fact: React.FC = () => {
  return (
    <div>
         {/* Fun Facts Section */}
              <section className="bg-black py-12 rounded-lg mb-16">
                  <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
                    <div>
                    <Image src="/menu-img/Group-1.png" alt="Partner 1" width={96} height={96} className="h-16 mx-auto" />
                      <h3 className="text-4xl font-bold text-white">420+</h3>
                      <p className="text-sm text-white">Professional Chiefs</p>
                    </div>
                    <div>
                    <Image src="/menu-img/Group-2.png" alt="Partner 1" width={96} height={96} className="h-16 mx-auto" />
                      <h3 className="text-4xl font-bold text-white">320+</h3>
                      <p className="text-sm text-white">Items Of Food</p>
                    </div>
                    <div>
                    <Image src="/menu-img/Group-3.png" alt="Partner 1" width={96} height={96} className="h-16 mx-auto" />
                      <h3 className="text-4xl font-bold text-white">30+</h3>
                      <p className="text-sm text-white">Years Of Experience</p>
                    </div>
                    <div>
                    <Image src="/menu-img/Group-4.png" alt="Partner 1"  width={96} height={96} className="h-16 mx-auto" />
                      <h3 className="text-4xl font-bold text-white">200+</h3>
                      <p className="text-sm text-white">Happy Customers</p>
                    </div>
                  </div>
                </section>
        </div>
  )
}

export default fact

