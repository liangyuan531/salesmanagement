import React from 'react';
import { Link } from "react-router-dom";

class TopBar extends React.Component {
    signout = () => {
        console.log('sign out');   
    }
    render() {
        return(
            <>
                <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
                    Golden Koala
                </Link>
                <input className="form-control form-control-dark w-100" 
                        type="text" placeholder="Search" aria-label="Search"></input>
                <ul className="navbar-nav px-3">
                  <li className="nav-item text-nowrap">
                    <button id="signout" className="nav-link" onClick={this.signout}>Sign out</button>
                  </li>
                </ul>
            </>
        )
    }
}

export default TopBar;