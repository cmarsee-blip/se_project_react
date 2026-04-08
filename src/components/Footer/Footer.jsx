import "./Footer.css";

function Footer({ children }) {
  return (
    <footer className="footer">
      <p className="footer-author">Developed by {children}</p>
      <p className="footer__copyright">© 2026</p>
    </footer>
  );
}

export default Footer;
