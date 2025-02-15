import { Routes, Route } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import TutorRequest from "./pages/TutorRequest";
import TutionJob from "./pages/TutionJob";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Login' element={<LogIn />} />
        <Route path='/TutorRequest' element={<TutorRequest />} />
        <Route path='/TutionJob' element={<TutionJob />} />
      </Routes>
    </>
  );
}

export default App;
