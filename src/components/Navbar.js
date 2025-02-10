import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Cricket Predictor</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/allMatches" className="hover:text-gray-300">All Matches</Link>
          </li>
          <li>
            <Link to="/teams" className="hover:text-gray-300">Teams</Link>
          </li>
          <li>
            <Link to="/predictions" className="hover:text-gray-300">Predictions</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
