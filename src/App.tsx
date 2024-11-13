import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { DropOptions } from './components/DropOptions';
import { Testimonials } from './components/Testimonials';
import { VisualShowcase } from './components/VisualShowcase';
import { MinySlider } from './components/MinySlider';

function App() {
  const [selectedDropType, setSelectedDropType] = useState('');

  return (
    <Layout>
      <Hero />
      <DropOptions onDropSelect={setSelectedDropType} />
      <Testimonials />
      <VisualShowcase />
      <MinySlider selectedDropType={selectedDropType} />
    </Layout>
  );
}

export default App;