
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-card mt-12 border-t border-brand-border">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Keychainz.shop. All Rights Reserved.</p>
        <p className="text-sm mt-1">Bringing joy to your keys, one chain at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
