import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaUserShield, FaBolt } from 'react-icons/fa';

function Landpage() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      
      {/* Welcome Section */}
      <div 
        className="container-fluid" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '1rem'  // Add padding for small screens
        }}
      >
        <div className="text-center">
          <h1 
            className="display-3 fw-bold mb-4" 
            style={{ fontSize: 'calc(1.5rem + 2vw)' }}  // Responsive font size for h1
          >
            Welcome to <span style={{ color: 'yellow' }}>Secret Script</span>
          </h1>
          <h4 
            className="lead mb-3" 
            style={{ fontWeight: '400', fontSize: 'calc(0.9rem + 1vw)' }}  // Responsive font size for h4
          >
            "Keep It Safe. Keep It Private. Your Notes, Your Way."
          </h4>
          <p 
            className="lead mb-5" 
            style={{ fontSize: 'calc(0.8rem + 0.5vw)', padding: '0 1rem' }}  // Smaller text and padding for narrow screens
          >
            Discover a secure haven for your thoughts—where organization meets complete confidentiality.
          </p>
          <div className="d-flex justify-content-center">
            <Link 
              className="btn btn-outline-light btn-lg me-3" 
              to="/login"
              style={{ padding: '0.6rem 1.2rem', fontSize: 'calc(0.8rem + 0.3vw)' }} // Adjust button size
            >
              Login
            </Link>
            <Link 
              className="btn btn-outline-light btn-lg" 
              to="/register"
              style={{ padding: '0.6rem 1.2rem', fontSize: 'calc(0.8rem + 0.3vw)' }} // Adjust button size
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div 
        className="container mt-5" 
        style={{ marginBottom: '4rem', padding: '0 1rem' }}  // Padding for smaller screens
      >
        <h2 
          className="text-center fw-bold" 
          style={{ color: '#fff', marginBottom: '4rem', fontSize: 'calc(1.2rem + 1vw)' }}  // Responsive font size for h2
        >
          Key Features
        </h2>
        <div className="row">
          {/* Feature Card 1 */}
          <div className="col-md-4 text-center mb-4">
            <div 
              className="card bg-dark text-light border-light" 
              style={{ 
                borderRadius: '15px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
                height: '100%', 
                padding: '1rem'  // Added padding inside card for better spacing on small screens
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaLock className="display-4 mb-3" style={{ color: '#FFD700', fontSize: 'calc(2rem + 2vw)' }} />
                <h5 className="card-title" style={{ fontSize: 'calc(1rem + 0.5vw)' }}>Top-notch Security</h5>
                <p className="card-text" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                  Your thoughts are encrypted and stored securely.
                </p>
              </div>
            </div>
          </div>
          {/* Feature Card 2 */}
          <div className="col-md-4 text-center mb-4">
            <div 
              className="card bg-dark text-light border-light" 
              style={{ 
                borderRadius: '15px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
                height: '100%', 
                padding: '1rem'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaUserShield className="display-4 mb-3" style={{ color: '#FFD700', fontSize: 'calc(2rem + 2vw)' }} />
                <h5 className="card-title" style={{ fontSize: 'calc(1rem + 0.5vw)' }}>Anonymity</h5>
                <p className="card-text" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                  No personal information required, stay completely anonymous.
                </p>
              </div>
            </div>
          </div>
          {/* Feature Card 3 */}
          <div className="col-md-4 text-center mb-4">
            <div 
              className="card bg-dark text-light border-light" 
              style={{ 
                borderRadius: '15px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
                height: '100%', 
                padding: '1rem'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaBolt className="display-4 mb-3" style={{ color: '#FFD700', fontSize: 'calc(2rem + 2vw)' }} />
                <h5 className="card-title" style={{ fontSize: 'calc(1rem + 0.5vw)' }}>Lightning Fast</h5>
                <p className="card-text" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                  Access your ideas and thoughts instantly with zero delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-center text-light py-3">
        <p 
          style={{
            marginTop: "2rem",
            fontSize: "calc(0.8rem + 0.3vw)",  // Responsive font size for footer
            color: "#fff",
          }}
        >
          Designed with <span style={{ color: "#ffd700" }}> &hearts; </span> by Janhvi Pandey
        </p>
      </footer>
    </div>
  );
}

export default Landpage;
