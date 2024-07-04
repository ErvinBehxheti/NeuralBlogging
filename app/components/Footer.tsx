"use client";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-purple-800/100 to-blue-800/0 glassmorphism text-white py-12 max-md:pb-28 poppins">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-gray-300 transition-colors"
                >
                  Home
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/writearticle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-gray-300 transition-colors"
                >
                  Create AI Blog
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaFacebookF size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaLinkedinIn size={24} />
              </motion.a>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
            <form action="#" method="POST" className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="p-2 rounded bg-white text-black"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1, backgroundColor: "#5b3a9b" }}
                whileTap={{ scale: 0.9 }}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-4 rounded"
              >
                Subscribe
              </motion.button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@neuralblogging.com"
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <FaEnvelope size={20} />
                  <span>info@neuralblogging.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  +1 234 567 890
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Neural Blogging. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
