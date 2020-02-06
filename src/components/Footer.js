import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div>© {year}</div>
      </div>
    </footer>
  );
}

export default Footer;
