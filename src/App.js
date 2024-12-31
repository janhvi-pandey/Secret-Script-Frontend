import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserProfile from './components/Userprofile';
import Login from './components/Login';
import Register from './components/Register';
// import Home from './components/Home';
import Landpage from './components/Landpage';
import AddNote from './components/AddNote';
import Shownote from './components/Shownote';
import ManageProfile from './components/settings/ManageProfile';
import { UserState } from './components/context/user/UserState';
// import UploadImage from './components/UploadImage';
function App() {
  return (
    <>
    <Router>
      <UserState>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Landpage />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="/shownotes" element={<Shownote />} />
        {/* <Route path="/imageupload" element={<UploadImage />} />   */}

        {/* Routes for user settings */}
        <Route path="/settings" element={<ManageProfile />} />

      </Routes>
      </UserState>
    </Router>
    </>
  );
}

export default App;