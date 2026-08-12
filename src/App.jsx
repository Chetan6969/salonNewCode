import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import LookbookPage from './pages/LookbookPage';
import ScannerPage from './pages/ScannerPage';
import BookingPage from './pages/BookingPage';
import WorkersPage from './pages/WorkersPage';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121214] text-[#f5f5f7] selection:bg-white selection:text-black flex flex-col justify-between">
        
        {/* Navigation header shared across pages */}
        <Header />

        {/* Content routing wrapper */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/lookbook" element={<LookbookPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/workers" element={<WorkersPage />} />
          </Routes>
        </main>

        {/* Brand footer shared across pages */}
        <Footer />
        
      </div>
    </Router>
  );
}
