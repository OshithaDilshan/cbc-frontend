import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <Header />
      <ProductCard name="Apple Laptop" description="MACBook Air" price= "1000/=" picture="https://picsum.photos/id/2/200/300" />
      <ProductCard name="Gaming Laptop" description="MSI laptop" price= "1500/=" picture="https://picsum.photos/id/3/200/300" />
      <ProductCard name="work Laptop" description="MSI laptop" price= "1500/=" picture="https://picsum.photos/id/4/200/300" />

    </>
  )
}

export default App