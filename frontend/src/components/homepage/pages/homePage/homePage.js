import React from 'react';
import HeroSection from '../heroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './data';
import NavbarHome from '../navbarHome';
import FooterHome from '../footerHome';
function HomePage() {
  return (
    <>
     <NavbarHome></NavbarHome>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjFour} />
      <FooterHome></FooterHome>
    </>
  );
}

export default HomePage;