import React from "react";
import "./Footer.css";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning Platform. All rights are reserves. <br />{" "}
          Made with {" "}
          <a href="https://github.com/lakshya-byte">Lakshya Dubey</a>
        </p>
        <div className="social-links">
          <a href="https://www.instagram.com/">
            <AiFillFacebook />
          </a>
          <a href="https://www.facebook.com/">
            <AiFillInstagram />
          </a>
          <a href="https://www.google.com/">
            <FaGoogle />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
