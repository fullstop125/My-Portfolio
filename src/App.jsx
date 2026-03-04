import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import About from './components/About';
import Testimonials from './components/Testimonials';
import GitHubActivity from './components/GitHubActivity';
import Contact from './components/Contact';
import Modal from './components/Modal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div className="relative dark:bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Portfolio onOpenModal={openModal} />
        <Experience />
        <About />
        <Testimonials />
        <GitHubActivity />
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
