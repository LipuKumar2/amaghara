import { Link, Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

export default function MainLayout() {
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-amber-500 shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden p-1">
              <img
                src="/images/bird.png"
                alt="Ama Ghara Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Ama Ghara
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`
              }
            >
              Properties
            </NavLink>

            {/* Pricing Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPricingDropdownOpen(!pricingDropdownOpen)}
                className="px-4 py-2 rounded-lg font-medium transition text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center gap-1"
              >
                Pricing <span className="text-xs">▼</span>
              </button>
              {pricingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-indigo-100 py-2 z-50">
                  <Link
                    to="/pricing/user"
                    className="block px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium"
                    onClick={() => setPricingDropdownOpen(false)}
                  >
                    User Pricing
                  </Link>
                  <Link
                    to="/pricing/broker"
                    className="block px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium"
                    onClick={() => setPricingDropdownOpen(false)}
                  >
                    Broker Pricing
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/submit-property"
              className="rounded-lg px-4 py-2 font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
            >
              List Your Property
            </Link>
            <Link
              to="/register"
              className="rounded-lg px-4 py-2 font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="rounded-xl p-2 border border-indigo-200 text-slate-700 hover:bg-indigo-50 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-indigo-100 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 py-4 grid gap-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
              >
                🏠 Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
              >
                ℹ️ About
              </NavLink>
              <NavLink
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
              >
                🏘️ Properties
              </NavLink>

              <div className="px-2">
                <div className="text-xs uppercase tracking-wide text-slate-500 px-2 mb-1">
                  Pricing
                </div>
                <div className="grid gap-1">
                  <Link
                    to="/pricing/user"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    👤 User Pricing
                  </Link>
                  <Link
                    to="/pricing/broker"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    🏢 Broker Pricing
                  </Link>
                </div>
              </div>

              <NavLink
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
              >
                🛠️ Services
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
              >
                📞 Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-100 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white relative">
        {/* Floating Social Icons */}
       <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">
  {[
    { href: "https://wa.me/918093237123", color: "bg-green-500", icon: <FaWhatsapp size={20} />, title: "WhatsApp" },
    { href: "mailto:contact.amaghara@gmail.com", color: "bg-red-500", icon: <FaEnvelope size={20} />, title: "Email" },
    { href: "tel:+918093237123", color: "bg-blue-500", icon: <FaPhone size={20} />, title: "Call" },
    { href: "https://www.facebook.com/share/1B48C9BYnY/", color: "bg-blue-700", icon: <FaFacebookF size={20} />, title: "Facebook" },
    { href: "https://www.instagram.com/ama___ghara?igsh=MWFscW9rZjEyNTh5aw==", color: "bg-pink-500", icon: <FaInstagram size={20} />, title: "Instagram" },
    { href: "https://www.linkedin.com/in/ama-ghara-9772a137a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "bg-blue-600", icon: <FaLinkedin size={20} />, title: "LinkedIn" },
  ].map((item, i) => (
    <a
      key={i}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${item.color} text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg relative transition-all duration-300 hover:scale-125`}
      title={item.title}
    >
      {/* Glow Effect */}
      <span className="absolute inset-0 rounded-full blur-lg opacity-75 animate-pulse" style={{ backgroundColor: "inherit" }}></span>
      <span className="relative z-10">{item.icon}</span>
    </a>
  ))}
</div>


        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 shadow-md overflow-hidden p-0.5">
                <img
                  src="/images/bird.png"
                  alt="Ama Ghara Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-xl font-black bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                Ama Ghara
              </div>
            </Link>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link to="/" className="text-slate-300 hover:text-indigo-300 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-indigo-300 transition-colors">
                About
              </Link>
              <Link to="/properties" className="text-slate-300 hover:text-indigo-300 transition-colors">
                Properties
              </Link>
              <Link to="/services" className="text-slate-300 hover:text-indigo-300 transition-colors">
                Services
              </Link>
              <Link to="/pricing/user" className="text-slate-300 hover:text-indigo-300 transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-indigo-300 transition-colors">
                Contact
              </Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-all">📱</a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-all">📧</a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-all">📘</a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-all">📷</a>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>© {new Date().getFullYear()} Ama Ghara. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-indigo-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-300 transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-indigo-300 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
