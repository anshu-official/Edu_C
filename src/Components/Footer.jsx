
import { Link } from "react-router-dom";
import { FaFacebook, FaRss } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import "../index.css";
const Footer = () => {
  return (
    <footer className="flex bg-gray-900 text-center text-white p-10">
      <div className="flex text-center gap-y-10 w-screen justify-around">
        <div className="flex flex-col gap-y-5 text-center justify-center  items-center ">
          <img src="/images/logo.png" width={80} alt="Edu Craft Logo" />
          <img src="/images/logo_title.jpeg" alt="Edu Craft" />
          <Link className="copyright hover:text-blue-800 ">
            CopyRight @ 2024 | Edu Craft{" "}
          </Link>
        </div>
        <div className="flex flex-col gap-y-5">
          <Link className="hover:underline hover:text-blue-800">
            Terms of Use
          </Link>
          <Link className="hover:underline hover:text-blue-800">
            Privacy Policy
          </Link>
          <Link className="hover:underline hover:text-blue-800">About Us</Link>
          <Link className="hover:underline hover:text-blue-800">
            Contact Us
          </Link>
          <Link className="hover:underline hover:text-blue-800">
            Refund Policy
          </Link>
        </div>
        <div className="flex gap-x-5 text-2xl text-center justify-center items-center">
          <Link className="hover:translate-y-[-2px] hover:text-blue-800">
            <FaRss />
          </Link>
          <Link className="hover:translate-y-[-2px] hover:text-blue-800">
            <FaFacebook />
          </Link>
          <Link className="hover:translate-y-[-2px] hover:text-blue-800">
            <FaInstagram />
          </Link>
          <Link className="hover:translate-y-[-2px] hover:text-blue-800">
            <FaTwitter />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;