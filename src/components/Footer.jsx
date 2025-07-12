import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            Phone: <a href="tel:+919825326475">+91 98253 26475</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:navkalaplasticindustries@gmail.com">
              navkalaplasticindustries@gmail.com
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h3>Location</h3>
          <p>17/A, Mahalaxmi Industrial Estate,</p>
          <p>Near Bombay Conductor,</p>
          <p>Vatva, Ahmedabad - 382445,</p>
          <p>Gujarat, India</p>
        </div>

        <div className="footer-section">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5234567890123!2d72.8776559!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwNTInMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890123"
              width="200"
              height="200"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Navkala Plastic Industries Location"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Navkala Plastic Industries. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
