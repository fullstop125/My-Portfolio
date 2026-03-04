import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Modal from './components/Modal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Portfolio onOpenModal={openModal} />
        <About />
        <Contact />
      </main>
      
      {/* Conditionally render Modal */}
      {selectedProject && (
        <Modal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
