
import React from 'react';
import { COPY } from '../constants.ts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 md:py-24">
      <main className="w-full max-w-xl flex flex-col gap-8 flex-grow">
        {children}
      </main>
      <footer className="w-full max-w-xl pt-16 mt-auto">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 text-center md:text-left">
          {COPY.FOOTER}
        </p>
      </footer>
    </div>
  );
};

export default Layout;
