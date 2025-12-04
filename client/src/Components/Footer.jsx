import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import logo from "/public/icon.jpeg";

export default function Footer() {
  return (
    <footer className="w-full text-white py-16 flex justify-center">
      <div className="w-[90%] p-10 max-w-7xl flex flex-col gap-16 bg-[#f0f8ff] rounded-2xl text-black">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold tracking-wide">TaskTribe</h2>
          </div>

          <div className="p-6 rounded-lg flex flex-col items-center bg-yellow-500 md:items-end gap-3">
            <h1 className="text-3xl text-black font-bold">Get Started</h1>
            <Link
              to="/auth"
              className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:opacity-70 transition"
            >
              Post Task
            </Link>
          </div>
        </div>

        {/* Links + Social */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Quick Links */}
          <div className="grid grid-cols-3 gap-5 text-black">
            <a href="#Home" className="hover:text-orange-500 transition">
              Home
            </a>
            <a href="#Tasks" className="hover:text-orange-500 transition">
              Tasks
            </a>
            <a href="#About" className="hover:text-orange-500 transition">
              About
            </a>
            <a href="#Contact" className="hover:text-orange-500 transition">
              Contact
            </a>
            <a href="#FAQ" className="hover:text-orange-500 transition">
              FAQ
            </a>
            <a href="#Support" className="hover:text-orange-500 transition">
              Support
            </a>
            <a href="#Community" className="hover:text-orange-500 transition">
              Community
            </a>
            <a href="#Privacy" className="hover:text-orange-500 transition">
              Privacy
            </a>
            <a href="#Terms" className="hover:text-orange-500 transition">
              Terms
            </a>
          </div>

          {/* Social + Rights */}
          <div className="text-center md:text-right">
            <div className="flex gap-4 text-3xl justify-center md:justify-end">
              <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
              <FaLinkedin className="hover:text-blue-400 transition cursor-pointer" />
              <FaTwitter className="hover:text-blue-300 transition cursor-pointer" />
            </div>

            <h2 className="text-gray-400 mt-3 text-lg">
              © {new Date().getFullYear()} TaskTribe
            </h2>
            <p className="text-gray-500 text-lg">All Rights Reserved</p>
          </div>
        </div>

        {/* 🔥 Developer Signature Section (NEW) */}

        {/* Large Background Text */}
        <h1 className="logoText m-0 text-center text-[15vw] md:text-[240px] font-semibold tracking-widest select-none">
          Task.Tribe
        </h1>
        <div className="w-full bg-black text-white rounded-2xl py-6 px-8 flex flex-col md:flex-row items-center justify-between shadow-xl border border-white/20">
          <div>
            <h2 className="text-xl font-bold tracking-wide">Developed By</h2>
            <p className="text-orange-400 text-2xl font-extrabold uppercase mt-1">
              Sushant Nachanekar
            </p>
            <p className="text-gray-300 mt-1 text-sm">
              Full Stack Developer • React • Node • MongoDB • Tailwind • GSAP
            </p>
          </div>

          <div className="flex gap-5 text-3xl mt-4 md:mt-0">
            {/* GitHub */}
            <a
              href="https://github.com/DevSushant03"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaGithub className="transition transform group-hover:-translate-y-1 group-hover:text-gray-300" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/sushant-nachanekar"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaLinkedin className="transition transform group-hover:-translate-y-1 group-hover:text-blue-400" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/mr__sushant__030"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaInstagram className="transition transform group-hover:-translate-y-1 group-hover:text-pink-500" />
            </a>

            {/* Portfolio (FaGlobe) */}
            <a
              href="https://devsushant03.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaGlobe className="transition transform group-hover:-translate-y-1 group-hover:text-green-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
