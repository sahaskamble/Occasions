import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">EventPro</h3>
            <p className="mb-4 text-gray-400">
              Making your special moments extraordinary. We specialize in creating unforgettable experiences through expert event planning and execution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-purple-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-purple-500 transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-purple-500 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-purple-500 transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-500 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/birthday" className="hover:text-purple-500 transition-colors">Birthday Celebrations</Link>
              </li>
              <li>
                <Link href="/services/wedding" className="hover:text-purple-500 transition-colors">Wedding Planning</Link>
              </li>
              <li>
                <Link href="/services/corporate" className="hover:text-purple-500 transition-colors">Corporate Events</Link>
              </li>
              <li>
                <Link href="/services/decoration" className="hover:text-purple-500 transition-colors">Decoration Services</Link>
              </li>
              <li>
                <Link href="/services/catering" className="hover:text-purple-500 transition-colors">Catering Services</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-500 mt-1" />
                <p>123 Event Street, Celebration City, EC 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="w-5 h-5 text-purple-500" />
                <p>+1 234 567 8900</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-purple-500" />
                <p>contact@eventpro.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              {new Date().getFullYear()} EventPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-purple-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-purple-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-sm text-gray-400 hover:text-purple-500 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
