import React from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../components/Services';

export default function ServicesPage() {
  const navigate = useNavigate();

  const handleBookService = (serviceId) => {
    // Navigate to checkout and pass the chosen service ID in router state
    navigate('/book', { state: { serviceId } });
  };

  return (
    <div className="pt-16 animate-fade-in">
      <Services onBookService={handleBookService} />
    </div>
  );
}
