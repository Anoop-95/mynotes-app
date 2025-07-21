
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import './custom.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Notestate from "./Context/Notestate";
import { Toaster } from 'react-hot-toast';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {
  
  

  return(<>
  <Toaster position="top-center" reverseOrder={false} />
  <Notestate>
  <BrowserRouter>
  <Navbar/>
  
  <Routes>
    
    <Route path="/" element={<Home/>} />
    
    <Route path="/Login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
  </Routes>
  </BrowserRouter>  
  </Notestate>
  

  
  
  </>)
}

export default App
