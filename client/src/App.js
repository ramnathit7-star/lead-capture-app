import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadForm from "./pages/LeadForm";
import LeadList from "./pages/LeadList";
import "./styles/custom.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){

  return(
    <Router>
      <div className="d-flex">
        <Sidebar/>
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard/>} ></Route>
            <Route path="/add-lead" element={<LeadForm/>}></Route>
            <Route path="/lead-list" element={<LeadList/>}></Route>
          </Routes>

        </div>
      </div>
    </Router>
  )
}


export default App;
