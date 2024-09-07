import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Home from './components/Home';
import UserProfile from './components/Userprofile';
// import LandingPage from './components/Landingpg';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Landpage from './components/Landpage';
import AddNote from './components/AddNote';
import Shownote from './components/Shownote';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/landpage" element={<Landpage />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="/shownotes" element={<Shownote />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;