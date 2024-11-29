import Image from 'next/image';
import Header from '@/components/Header';
import { FaCalendarAlt, FaHandshake, FaHeart, FaMagic } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: "Customized Event Planning",
      description: "We create personalized event experiences tailored to your unique style and preferences."
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "Professional Service",
      description: "Our experienced team ensures seamless execution of every event detail."
    },
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Passionate Team",
      description: "We pour our hearts into making your special moments truly unforgettable."
    },
    {
      icon: <FaMagic className="w-6 h-6" />,
      title: "Magical Moments",
      description: "We transform your vision into reality, creating magical experiences that last a lifetime."
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section with Video Background */}
        <section className="relative h-[60vh] pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/container-bg-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="relative z-20 h-full flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Creating Unforgettable Moments
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Your premier destination for exceptional event planning and magical celebrations
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Welcome to Occasions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At Occasions, we believe that every moment is worth celebrating. We specialize in 
                creating bespoke event experiences that reflect your unique style and vision. From 
                intimate gatherings to grand celebrations, we handle every detail with precision and care.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="inline-block p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Why Choose Occasions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-purple-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expertise & Experience</h3>
                    <p className="text-gray-600">
                      Our team brings years of experience in event planning and management,
                      ensuring every detail is perfectly executed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-purple-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Customized Packages</h3>
                    <p className="text-gray-600">
                      We offer flexible packages that can be tailored to your specific needs,
                      preferences, and budget.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Attention to Detail</h3>
                    <p className="text-gray-600">
                      From the smallest detail to the grandest element, we ensure everything
                      is perfect for your special day.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-purple-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Stress-Free Planning</h3>
                    <p className="text-gray-600">
                      We handle all the logistics and coordination, allowing you to relax
                      and enjoy your special occasion.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-purple-600">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Vendors</h3>
                    <p className="text-gray-600">
                      We work with trusted vendors and suppliers to ensure the highest
                      quality services for your event.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-purple-600">6</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                    <p className="text-gray-600">
                      Our team provides continuous support throughout the planning process
                      and during the event.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-lg mb-8">
              Let us help you turn your vision into reality. Browse our packages and start
              planning your dream event today.
            </p>
            <Link href={"/package"} className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Explore Packages
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
