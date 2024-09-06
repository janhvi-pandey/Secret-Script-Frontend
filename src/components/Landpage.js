import React from 'react';
import { Link } from 'react-router-dom';

function Landpage() {
  return (
    <div className="container-fluid bg-dark text-white" style={{ height: '100vh', paddingTop: '5vh' }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 text-center">
          
          <h1 className="display-3 fw-bold mb-4">Welcome to Secret Script</h1>
          <h4 className="lead mb-3" style={{ fontWeight: '400' }}>"Keep It Safe. Keep It Private. Your Notes, Your Way."</h4>
          <p className="lead mb-5">
            Discover a secure haven for your thoughts—where organization meets complete confidentiality.
          </p>

       
          <div className="d-flex justify-content-center ">
            <Link className="btn btn-outline-light btn-lg w-25 me-3" to="/login">Login</Link>
            <Link className="btn btn-outline-light btn-lg w-25 " to="/register">Register</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4" style={{color:"black"}}>Why Choose Secret Script?</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="card bg-transparent border-light mb-3">
              <div className="card-body">
                <i className="bi bi-shield-lock display-4 mb-3"></i>
                <h5 className="card-title">Top-notch Security</h5>
                <p className="card-text">Your thoughts are encrypted and stored securely.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="card bg-transparent border-light mb-3">
              <div className="card-body">
                <i className="bi bi-people display-4 mb-3"></i>
                <h5 className="card-title">Anonymity</h5>
                <p className="card-text">No personal information required, stay completely anonymous.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="card bg-transparent border-light mb-3">
              <div className="card-body">
                <i className="bi bi-lightning-charge display-4 mb-3"></i>
                <h5 className="card-title">Lightning Fast</h5>
                <p className="card-text">Access your ideas and thoughts instantly with zero delays.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landpage;
