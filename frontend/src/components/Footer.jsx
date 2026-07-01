const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              deVTinder
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Connect. Collaborate. Code.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a className="hover:text-white transition-colors cursor-pointer">
              About Us
            </a>
            <a className="hover:text-white transition-colors cursor-pointer">
              Contact
            </a>
            <a className="hover:text-white transition-colors cursor-pointer">
              Jobs
            </a>
            <a className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-5">
            <a className="hover:text-blue-400 transition-colors cursor-pointer">
              <i className="fa-brands fa-x-twitter text-xl"></i>
            </a>

            <a className="hover:text-red-500 transition-colors cursor-pointer">
              <i className="fa-brands fa-youtube text-xl"></i>
            </a>

            <a className="hover:text-blue-600 transition-colors cursor-pointer">
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>

            <a className="hover:text-pink-500 transition-colors cursor-pointer">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-zinc-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} deVTinder. All rights reserved.</p>

          <p>Built with ❤️ by developers, for developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
