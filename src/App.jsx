import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import TutorRequest from "./pages/TutorRequest";
import TutionJob from "./pages/TutionJob";
import Favourites from "./pages/Favourites";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import ResetPassword from "./pages/ResetPassword"; // ✅ Import the Reset Password page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/TutionJob" element={<TutionJob />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* 🔒 Protected Routes: Only Accessible if Logged In */}
        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/TutorRequest" element={<TutorRequest />} />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
