import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-divider">
        <div className="footer-grid">
          <div className="footer-logos">
            <Image
              src="/images/rtu-logo.png"
              alt="RTU Logo"
              className="footer-logo"
              width={200}
              height={200}
            />
            <Image
              src="/images/iflde-logo.png"
              alt="Flexible Learning Icon"
              className="footer-logo"
              width={200}
              height={200}
            />
          </div>

          <div>
            <h4 className="footer-column-title">Programs</h4>
            <ul className="space-y-2">
              {[
                "College of Arts and Science",
                "College of Business and Entrepreneurial Technology",
                "Institute of Computer Studies",
                "College of Engineering",
                "Vocational Courses",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Support</h4>
            <ul className="space-y-2">
              {["Submit ticket", "Documentation", "Guides"].map((item) => (
                <li key={item}>
                  <Link href="#" className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">University</h4>
            <ul className="space-y-2">
              {["About", "Blog", "Jobs", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Legal</h4>
            <ul className="space-y-2">
              {["Terms of service", "Privacy policy", "License"].map((item) => (
                <li key={item}>
                  <Link href="#" className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Rizal Technological University. All rights reserved.
          </p>
          <div className="footer-social-icons">
            <Link
              href="https://www.facebook.com/rtuiflde"
              className="footer-social-icon"
            >
              <FaFacebookF />
            </Link>

            <Link href="#" className="footer-social-icon">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
