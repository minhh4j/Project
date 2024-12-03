// HeroSection.jsx
import React from 'react';

function HeroSection() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <img 
        src="src/assets/cat-dog.jpg" 
        alt="Cat and Dog" 
        className="w-[1000px] h-[550px]  shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl" 
        style={{objectFit:'fit'}}
      />
    </div>
  );
}

export default HeroSection;
