import "./Footer.css";

function Footer({ children }) {
  return (
    <footer className="footer">
      <p className="footer-author">Developed by {children}</p>
      <p className="footer__copyright">© {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
