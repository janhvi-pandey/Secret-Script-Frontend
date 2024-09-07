import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaUserShield, FaBolt } from 'react-icons/fa';

function Landpage() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      
      {/* Welcome Section */}
      <div className="container-fluid" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-center">
          <h1 className="display-3 fw-bold mb-4">
            Welcome to <span style={{ color: 'yellow' }}>Secret Script</span>
          </h1>
          <h4 className="lead mb-3" style={{ fontWeight: '400' }}>
            "Keep It Safe. Keep It Private. Your Notes, Your Way."
          </h4>
          <p className="lead mb-5">
            Discover a secure haven for your thoughts—where organization meets complete confidentiality.
          </p>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-outline-light btn-lg me-3" to="/login">Login</Link>
            <Link className="btn btn-outline-light btn-lg" to="/register">Register</Link>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container mt-5 " style={{ marginBottom:"4rem" }}>
        <h2 className="text-center fw-bold " style={{ color: '#fff',marginBottom:"4rem" }}>Key Features</h2>
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <div className="card bg-dark text-light border-light" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', height: '100%' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaLock className="display-4 mb-3" style={{ color: '#FFD700' }} />
                <h5 className="card-title">Top-notch Security</h5>
                <p className="card-text">Your thoughts are encrypted and stored securely.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card bg-dark text-light border-light" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', height: '100%' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaUserShield className="display-4 mb-3" style={{ color: '#FFD700' }} />
                <h5 className="card-title">Anonymity</h5>
                <p className="card-text">No personal information required, stay completely anonymous.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card bg-dark text-light border-light" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', height: '100%' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaBolt className="display-4 mb-3" style={{ color: '#FFD700' }} />
                <h5 className="card-title">Lightning Fast</h5>
                <p className="card-text">Access your ideas and thoughts instantly with zero delays.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-center text-light py-3">
      <p style={{marginTop: "2rem",
      fontSize: "0.9rem",
      color: "#fff",}}>Designed with<span style={{color:"#ffd700",}}> &hearts; </span>  by Janhvi Pandey</p>
      </footer>
    </div>
  );
}

export default Landpage;
