import { Link } from 'react-router-dom'
import "./Home.css";
import landingPage from "../assets/images/landingPage.png";
import mainProduct from "../assets/images/mainProduct.png";
import owner from "../assets/images/owner.png";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Crafting Caps, Shaping Solutions</h1>
          <div className="hero-image">
            <img src={landingPage} alt="Manufacturing Facility" />
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="our-products">
        <div className="products-content">
          <div className="products-image">
            <img src={mainProduct} alt="Our Products" />
          </div>

          <div className="products-list">
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle">
              We specialize in manufacturing caps and closures for a variety of
              industries.
            </p>
            <div className="product-categories">
              <div className="category-row">
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Cosmetics</span>
                </div>
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Ghee Industy</span>
                </div>
              </div>

              <div className="category-row">
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Confectionery</span>
                </div>
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Household products</span>
                </div>
              </div>

              <div className="category-row">
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Dairy Products</span>
                </div>
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Peanut Jars</span>
                </div>
              </div>

              <div className="category-row">
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Edible Oil</span>
                </div>
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Pharmaceutical</span>
                </div>
              </div>

               <div className="category-row">
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>FMCG Segment</span>
                </div>
                <div className="category-item">
                  <span className="bullet">•</span>
                  <span>Spices</span>
                </div>
              </div>
            </div>

            <p className="products-description">
              Having a large number of injection molding machines of reputed
              brands, we can fulfil bulk orders promptly. You can check out
              various products on the <Link to="/products" style={{
                fontWeight: "bold",
                color: "#2563eb",
                textDecoration: "none"
              }}>Products</Link> page.
            </p>
          </div>
        </div>
      </section>

      {/* About Navkala Section */}
      <section className="about-navkala">
        <div className="about-content">
          <div className="about-text">
            <h2>About Navkala</h2>
            <p>
              Navkala Plastics was established in 1970 by Mr. Sandeep Kumar
              Khatana. The name Navkala originates from the Sanskrit word
              meaning "new art" and mother Khatana. Founded on the principle of
              innovation and excellence.
            </p>
            <p>
              The first factory started with just 4 injection molding machines,
              established in Ahmedabad. Over the past 35 years, Navkala has been
              blessed with the goodwill from family, friends, and clients. It
              has since grown in scale and size, expanding to manufacturing
              plants in Gujarat and Maharashtra.
            </p>
          </div>
          <div className="about-image">
            <img src={owner} alt="Company Owner" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
