import React from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
      <div className="navbar-light bg-light shadow">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                  <Link to= '/' className="navbar-brand">Scan Easy</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link to='/' className="nav-link active">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to='/about' className="nav-link">About Us</Link>
                      </li>
                      <li className="nav-item">
                        <Link to='/contact' className="nav-link">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Navbar;