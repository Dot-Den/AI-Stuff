import { NavLink } from 'react-router-dom';
const Navbar = () => {

  return (
    <nav className={`fixed top-0 left-0 h-full bg-gray-200 text-black z-10 p-4`}>
      <div className={`flex flex-col space-y-4`}>
        <NavLink to="/sheqaudit" className="hover:bg-gray-300 p-2 rounded">
          SHEQ Audit View
        </NavLink>
        {/* Add more links here */}
      </div>
    </nav>
  );
};

export default Navbar;