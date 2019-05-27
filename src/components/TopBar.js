import React from 'react';


function TopBar() {
    return(
        <>
            <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
                Golden Koala
            </Link>
            <input className="form-control form-control-dark w-100" 
                    type="text" placeholder="Search" aria-label="Search"></input>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap">
                <a className="nav-link" href="#">Sign out</a>
              </li>
            </ul>
        </>
    )
}

export default TopBar;