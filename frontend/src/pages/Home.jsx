import React from 'react';
import Landing from '../components/Landing';
import Services from '../components/Services';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Testimonial from '../components/Testimonial';
import WhatWeOffer from '../components/WhatWeOffer';

const Home = () => {
  return (
    <div className=""> {/* Optional: Gradient background for aesthetic */}
      <Landing />
      <div className=""> {/* Added padding for spacing between components */}
        <Services />
      </div>
      <WhatWeOffer/>
      <About/>
      <Testimonial/>
      <FAQ/>
    </div>
  );
};

export default Home;
