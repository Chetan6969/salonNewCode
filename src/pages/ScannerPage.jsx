import React from 'react';
import { useNavigate } from 'react-router-dom';
import FaceScanner from '../components/FaceScanner';

export default function ScannerPage() {
  const navigate = useNavigate();

  const handleBookRecommendedStyle = (faceShape) => {
    // Navigate to checkout and pass the diagnosed face shape recommendations in router state
    navigate('/book', { state: { faceShape } });
  };

  return (
    <div className="pt-16 animate-fade-in">
      <FaceScanner onBookRecommendedStyle={handleBookRecommendedStyle} />
    </div>
  );
}
