import React from 'react'

import { Link } from 'react-router-dom'



const Navbar = () => {


    return (
        <>




            <nav class="navbar navbar-expand-lg navbar-dark  bg-nav">
                <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-2 ">
                            <li class="nav-item">
                                <Link to='/' style={{ textDecoration: "none" }}><span className="navbar-brand mb-0 fs-3" >Home</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/favourite' style={{ textDecoration: "none" }}><span className="navbar-brand mb-0 fs-3">Favourite</span></Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar