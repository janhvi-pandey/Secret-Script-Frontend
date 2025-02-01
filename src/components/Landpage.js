import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaUsers,
  FaChartLine,
  FaRegUser,
} from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { ImMobile } from "react-icons/im";
import { CiLock } from "react-icons/ci";
import { RiGoogleLine } from "react-icons/ri";
import { MdOutlineElectricBolt } from "react-icons/md";
import { LiaUserShieldSolid } from "react-icons/lia";
import { SiCloudinary } from "react-icons/si";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

function Landpage() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Welcome Section */}
      <div
        className="container-fluid"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div className="text-center">
          <h1
            className="display-3 fw-bold mb-4"
            style={{ fontSize: "calc(1.5rem + 2vw)" }}
          >
            Welcome to{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(45deg, #ffd700, #ff8c00)",
                textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6)",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              Secret Script
            </span>
          </h1>
          <h4
            className="lead mb-3"
            style={{ fontWeight: "400", fontSize: "calc(0.9rem + 1vw)" }}
          >
            "Keep It Safe. Keep It Private. Your Notes, Your Way."
          </h4>
          <p
            className="lead mb-5"
            style={{ fontSize: "calc(0.8rem + 0.5vw)", padding: "0 1rem" }}
          >
            Discover a secure haven for your thoughts—where organization meets
            complete confidentiality.
          </p>
          <div className="d-flex justify-content-center">
            <Link
              className="btn btn-outline-light btn-lg me-3"
              to="/login"
              style={{
                padding: "0.6rem 1.2rem",
                fontSize: "calc(0.8rem + 0.3vw)",
              }}
            >
              Login
            </Link>
            <Link
              className="btn btn-outline-light btn-lg"
              to="/register"
              style={{
                padding: "0.6rem 1.2rem",
                fontSize: "calc(0.8rem + 0.3vw)",
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
{/* About Section */}
<div
  className="container my-5 mx-auto"
  style={{
    padding: "2.5rem",
    backgroundColor: "#000",
    borderRadius: "15px",
  }}
>
  <h2
    className="text-center mb-5"
    style={{
      fontSize: "calc(1.73rem + 0.7vw)",  // Adjust the font size dynamically based on screen size
      backgroundImage: "linear-gradient(45deg, #ffd700, #ff8c00)",
      textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6)",
      color: "transparent",
      WebkitBackgroundClip: "text",
    }}
  >
    Why Secret Script?
  </h2>
  <p
    style={{
      fontSize: "calc(1rem + 0.4vw)", // Adjust the font size dynamically based on screen size
      textAlign: "center",
    }}
  >
    Ever worried about your personal notes being accessed by unauthorized
    parties? Many note-taking apps store data unencrypted, exposing your
    private thoughts to potential security threats.
  </p>
  <p
    style={{
      
      fontSize: "calc(1rem + 0.4vw)", // Adjust the font size dynamically based on screen size
      textAlign: "center",
    }}
  >
    <strong>SecretScript</strong> offers a revolutionary approach to note
    management with end-to-end encryption, ensuring that only you have
    access to your data. We prioritize complete anonymity—no personal
    details are required, and no one, not even us, can access your notes.
    With Google authentication, you can easily and securely log in while
    keeping your information safe. Whether it's work-related tasks, personal
    reflections, or confidential information, SecretScript gives you the
    power to organize your thoughts freely— <strong>privately, securely, and without limits</strong>.
  </p>
</div>


      {/* Key Features Section */}
      <div
        className="container"
        style={{ marginBottom: "8rem", marginTop: "5rem", padding: "0 3rem" }} // Increase padding here for larger screens
      >
        <h2
          className="text-center  mb-5"
          style={{
            fontSize: "calc(1.8rem + 0.7vw)",
            backgroundImage: "linear-gradient(45deg, #ffd700, #ff8c00)",
            textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          Key Features
        </h2>
        <div className="row">
          {[{
              icon: <CiLock />,
              title: "Top-notch Security",
              desc: "Your thoughts are encrypted and stored securely.",
            },
            {
              icon: <LiaUserShieldSolid />,
              title: "Anonymity",
              desc: "No personal information required, stay completely anonymous.",
            },
            {
              icon: <MdOutlineElectricBolt />,
              title: "Lightning Fast",
              desc: "Access your ideas and thoughts instantly with zero delays.",
            },
            {
              icon: <RiGoogleLine />,
              title: "Google Authentication",
              desc: "Seamless and secure login experience.",
            },
            {
              icon: <SiCloudinary />,
              title: "Cloud Storage",
              desc: "Securely store profile pictures via Cloudinary.",
            },
            {
              icon: <ImMobile />,
              title: "Multi-Device Access",
              desc: "Sync notes across all your devices effortlessly.",
            },
          ].map((feature, index) => (
            <div key={index} className="col-md-4 text-center mb-4">
              <div
                className="card text-light feature-card"
                style={{
                  background: "linear-gradient(to bottom, #121212, #262626)",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  height: "100%",
                  padding: "1rem",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="display-4 mb-3"
                    style={{
                      color: "#FFD700",
                      fontSize: "calc(2rem + 2vw)"
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h5
                    className="card-title"
                    style={{ fontSize: "calc(1rem + 0.5vw)" }}
                  >
                    {feature.title}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "calc(0.8rem + 0.3vw)" }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="container mt-5">
        <h2
          className="text-center"
          style={{
            fontSize: "calc(1.8rem + 0.7vw)",
            backgroundImage: "linear-gradient(45deg, #ffd700, #ff8c00)",
            textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            marginBottom: "1rem",
          }}
        >
          Getting Started
        </h2>
        <div className="row" style={{ marginBottom: "5rem", marginTop: "5rem", padding: "0 2rem" }}>
          {/* Visit Website */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center text-light get-started-card"
              style={{
                background: "linear-gradient(to bottom, #121212, #262626)",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "100%",
                padding: "1rem",
              }}
            >
              <div
                className="display-4 mb-3"
                style={{ color: "#FFD700",  fontSize: "calc(2.5rem + 2vw)"}}
              >
                <HiOutlineComputerDesktop />
              </div>
              <h5 className="card-title">Visit Website</h5>
              <p>
                Start exploring our services by visiting our website:{" "}
                <a
                  href="https://secret-script-io.vercel.app/"
                  style={{
                    color: "#FFD700",
                    textDecoration: "none",
                  }}
                >
                  SecretScript
                </a>
              </p>
            </div>
          </div>

          {/* Create Account */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center text-light get-started-card"
              style={{
                background: "linear-gradient(to bottom, #121212, #262626)",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "100%",
                padding: "1rem",
              }}
            >
              <div
                className="display-4 mb-3"
                style={{ color: "#FFD700", padding: "0.8rem",  fontSize: "calc(1.6rem + 2vw)" }}
              >
                <FaRegUser />
              </div>
              <h5 className="card-title">Create Your Account</h5>
              <p>You can sign up using Google Authentication or manually.</p>
            </div>
          </div>

          {/* Create Notes */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center text-light get-started-card"
              style={{
                background: "linear-gradient(to bottom, #121212, #262626)",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "100%",
                padding: "1rem",
              }}
            >
              <div
                className="display-4 mb-3"
                style={{ color: "#FFD700",  fontSize: "calc(2rem + 2vw)", padding: "1rem" }}
              >
                <CgNotes />
              </div>
              <h5 className="card-title">Create Notes</h5>
              <p>Start creating notes and access them securely from any device.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats Section */}
      <div className="container text-center my-5">
        <h2
          style={{
            fontSize: "calc(1.8rem + 0.7vw)",
            backgroundImage: "linear-gradient(45deg, #ffd700, #ff8c00)",
            textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            marginBottom: "3rem",

          }}
        >
          Live Stats
        </h2>
        <div className="row" style={{padding:"0 2rem"}}>
          {/* Users */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center text-light"
              style={{
                background: "linear-gradient(to bottom, #121212, #262626)",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "100%",
                padding: "1rem",
              }}
            >
              <div className="display-4 mb-3" style={{ color: "#FFD700", fontSize: "3rem" }}>
                <FaUsers />
              </div>
              <h5 className="card-title">Users</h5>
              <p>30+ Users</p>
            </div>
          </div>

          {/* Notes Secured */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center text-light"
              style={{
                background: "linear-gradient(to bottom, #121212, #262626)",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "100%",
                padding: "1rem",
              }}
            >
              <div className="display-4 mb-3" style={{ color: "#FFD700", fontSize: "3rem" }}>
                <FaChartLine />
              </div>
              <h5 className="card-title">Notes Added</h5>
              <p>50+ Notes Secured</p>
            </div>
          </div>

          {/* Uptime */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center text-light"
              style={{
                background: "linear-gradient(to bottom, #121212, #262626)",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "100%",
                padding: "1rem",
              }}
            >
              <div className="display-4 mb-3" style={{ color: "#FFD700", fontSize: "3rem" }}>
                <FaBolt />
              </div>
              <h5 className="card-title">Uptime</h5>
              <p>99% Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center text-light py-3">
        <p
          style={{
            marginTop: "2rem",
            fontSize: "calc(0.8rem + 0.3vw)",
            color: "#fff",
          }}
        >
          Designed with <span style={{ color: "#ffd700" }}>&hearts;</span> by Janhvi Pandey
        </p>
      </footer>
    </div>
  );
}

export default Landpage;

// CSS integrated

const style = `
  .feature-card, .get-started-card {
    transition: transform 0.3s ease-in-out;
  }

  .feature-card:hover, .get-started-card:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 576px) {
    .display-4 {
      font-size: calc(1rem + 2vw);
    }
  }
`;

export { style };
