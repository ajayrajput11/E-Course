import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-1 bg-black  text-gray-300 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CourseHub
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Learn anytime, anywhere. High-quality courses built by industry experts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "#" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="relative inline-block text-gray-400 hover:text-white transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500 after:transition-all hover:after:w-full"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-white mb-5">
            Contact
          </h3>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Mail size={16} />
            support@coursehub.com
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
            <Phone size={16} />
            +91 98765 43210
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom */}
      <p className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} CourseHub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
