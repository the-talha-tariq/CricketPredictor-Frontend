const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Cricket Predictor. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  