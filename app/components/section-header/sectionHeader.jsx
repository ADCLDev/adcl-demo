import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <header className="my-16 py-12 text-center md:mb-8">
      <h3 className="text-black text-5xl mb-2 uppercase">{title}</h3>
      <p className="text-slate-800 mx-auto max-w-4xl md:max-w-md text-2xl uppercase">{subtitle}</p>
    </header>
  );
}

export default SectionHeader;
