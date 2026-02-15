import { Link, useLocation } from "react-router-dom";
 

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar p-3">
      <h4 className="text-center mb-4">Lead Capture</h4>

      <Link to="/" className={`nav-link ${location.pathname === "/" && "active"}`}>
           Dashboard 
      </Link>

      <Link to="/add-lead" className={`nav-link ${location.pathname === "/add-lead" && "active"}`}>
         Add Lead 
      </Link>

      <Link to="/lead-list" className={`nav-link ${location.pathname === "/lead-list" && "active"}`}>
         Lead List 
      </Link>
    </div>
  );
}

export default Sidebar;
