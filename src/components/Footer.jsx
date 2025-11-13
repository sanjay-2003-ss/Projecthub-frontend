import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 blur-3xl opacity-60"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 sm:px-8 md:px-12">
    
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          
          <div className="text-center md:text-left max-w-sm z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProjectHub
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Discover, share, and collaborate on amazing projects.
              <br />
              A hub where developers get inspired and build together.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center md:justify-end gap-10 text-center md:text-left z-10">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Explore
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    Create
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Support
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <a
                    href="mailto:support@projecthub.com"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 dark:text-gray-400 text-sm z-10">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              ProjectHub
            </span>{" "}
            — All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition transform hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition transform hover:scale-110"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition transform hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
