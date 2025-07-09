import { useState } from 'react'
import './Products.css'
import productsData from '../data/products.json'
import ProductModal from '../components/ProductModal'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="products">
      {/* <div className="products-header">
        <h1 className="products-title">Our Products</h1>
        <p className="products-subtitle">
          We specialize in manufacturing caps and closures for a variety of industries. 
          Having a large number of injection molding machines of reputed brands, we can 
          fulfill bulk orders promptly. You can visit our website to see our expanding 
          portfolio of products in Gujarat and Maharashtra.
        </p>
      </div> */}

      <div className="products-grid">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}

  
    </div>
  )
}

export default Products
