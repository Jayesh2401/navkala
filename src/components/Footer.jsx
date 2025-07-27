import "./Footer.css";

const Footer = () => {
  // Company location coordinates (Vatva, Ahmedabad)
  const companyLocation = {
    lat: 22.9734,
    lng: 72.6369,
    address: "17/A, Mahalaxmi Industrial Estate, Near Bombay Conductor, Vatva, Ahmedabad - 382445, Gujarat, India"
  };

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${companyLocation.lat},${companyLocation.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

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
          <h3>Find Us</h3>
          <div className="map-container">
            <div className="map-wrapper">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d${companyLocation.lng}!3d${companyLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${companyLocation.lat},${companyLocation.lng}!5e0!3m2!1sen!2sin!4v1234567890123`}
                width="400"
                height="200"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Navkala Plastic Industries Location"
              ></iframe>
              <div className="map-overlay" onClick={openInGoogleMaps}>
                <div className="map-overlay-content">
                  <span className="map-icon">📍</span>
                  <span className="map-text">Click to open in Google Maps</span>
                </div>
              </div>
            </div>
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
