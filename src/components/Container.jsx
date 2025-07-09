import './Container.css'

const Container = ({ children }) => {
  return (
    <main className="container">
      <div className="container-content">
        {children}
      </div>
    </main>
  )
}

export default Container
