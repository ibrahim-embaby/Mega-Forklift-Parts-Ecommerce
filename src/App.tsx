import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import logo from './assets/mega.jpg';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <img src={logo} alt="Mega Forklifts" className="h-12 w-14" />
              <h1 className="text-2xl font-bold text-gray-900"><span className="text-blue-600">Elmasria</span> <span className="text-red-600">"Mega"</span></h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;