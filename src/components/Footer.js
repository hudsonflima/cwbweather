import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 p-4 text-slate-300">
      <div className="container mx-auto text-center">
        <p>Developed by Hudson Lima &copy; {new Date().getFullYear()} | Previsão do Tempo em Curitiba</p>
      </div>
    </footer>
  );
};

export default Footer;
