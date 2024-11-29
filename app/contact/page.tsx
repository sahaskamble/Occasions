'use client';

import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        toast.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Modern Geometric Hero Section */}
        <section className="relative bg-purple-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.15) 25%, transparent 25%, transparent 50%, rgba(139, 92, 246, 0.15) 50%, rgba(139, 92, 246, 0.15) 75%, transparent 75%, transparent)`,
            backgroundSize: '30px 30px',
            animation: 'move-bg 3s linear infinite'
          }}></div>

          {/* Geometric Shapes */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-1/4 w-40 h-40 border-2 border-purple-500/30 rotate-45"></div>
            <div className="absolute top-1/2 right-20 w-32 h-32 border-2 border-purple-400/30 rotate-12"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-purple-600/30 -rotate-12"></div>
            <div className="absolute right-1/3 bottom-1/3 w-36 h-36 border-2 border-purple-300/30 rotate-45"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-3xl mx-auto text-center space-y-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Let's Connect
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl transition-all duration-300 group-hover:from-purple-500/30"></div>
                  <div className="relative border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 border border-purple-400/30 rounded-lg group-hover:border-purple-400/50 transition-all duration-300">
                        <FaPhone className="text-purple-200 text-2xl" />
                      </div>
                      <div className="text-left">
                        <div className="text-purple-200 text-sm font-medium">Call Us</div>
                        <div className="text-white text-lg">+91 77799 91645</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl transition-all duration-300 group-hover:from-purple-500/30"></div>
                  <div className="relative border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 border border-purple-400/30 rounded-lg group-hover:border-purple-400/50 transition-all duration-300">
                        <FaEnvelope className="text-purple-200 text-2xl" />
                      </div>
                      <div className="text-left">
                        <div className="text-purple-200 text-sm font-medium">Email Us</div>
                        <div className="text-white text-lg">info@occasions.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div> */}
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Map and Contact Info */}
              <div className="space-y-6">
                {/* Map */}
                <div className="h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985619587854!2d77.59796717381517!3d12.970220814851992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709667547039!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Get in Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="text-purple-600">
                        <FaMapMarkerAlt size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Location</h4>
                        <p className="text-gray-600">
                          123 Event Street, Bangalore,<br />
                          Karnataka, India 560001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-purple-600">
                        <FaPhone size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-purple-600">
                        <FaEnvelope size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">info@occasions.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Tell us about your event or inquiry..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
