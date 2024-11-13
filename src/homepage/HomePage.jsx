import React from 'react';
import Nav from './nav'; // Make sure this is correct
import HeroSection from './HeroSection'; // Make sure this is correct
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
