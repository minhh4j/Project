import React from 'react';
import Nav from './nav'; 
import HeroSection from './HeroSection';
import Center from './Center';

function HomePage() {
  return (
    <div>
      <Nav /> 
      
      <HeroSection />
      
      <Center/>
    </div>
  );
}

export default HomePage;
