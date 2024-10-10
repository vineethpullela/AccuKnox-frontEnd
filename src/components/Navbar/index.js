import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./index.css"


const Navbar = ({ searchQuery, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="nav-bar-container">
      <div className="nav-link-container">
        <NavLink
          to="/"
          className="nav-link"
        >
          Home
        </NavLink>
        <p className="font-semibold">&gt;</p>
        <NavLink
          to="/dashboard"
          className="nav-link"
        >
          Dashboard v2
        </NavLink>
      </div>
      <div className="search-container">
      <CiSearch size={15}/>
        <input
          placeholder="Search anything..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};



export default Navbar;
