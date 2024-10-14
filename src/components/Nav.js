import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        window.location.href = '/'
    }
    const user = JSON.parse(localStorage.getItem('user'));
    

    return (
        <div>
            <div className="navbar bg-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/creategrp">Create Grp</Link></li>
                            <li><Link to="#">Dashboard</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl bg-base-100">GrpBuy</a>
                </div>
                    {
                        user!=null ? 
                        <div className="navbar-center hidden lg:flex">
                         <ul className="menu menu-horizontal px-1 base-100 text-white">
                             <li><Link to="/home">Home</Link></li>
                             <li><Link to="/mygrps">My Groups/Bids</Link></li>
                             {
                                 user.role == "admin" ? <li><Link to="/creategrp">Create Grp</Link></li> : ""
                             }
                             {
                                 user.role == "admin" ? <li><Link to="">Dashboard</Link></li> : ""
                             }
                         </ul>
                     </div>
                        : <div></div>
                    }

                    {
                        user!=null ?
                        <div className="avatar navbar-end relative">
                <div className="mask mask-hexagon w-24 btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img src={user.imageUrl} alt="Profile" />
                </div>

                {dropdownOpen && (
                    <ul className="absolute right-0 mt-20 w-48 bg-white shadow-lg rounded-lg py-2 z-[1]">
                    <li><p className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-10">{user.name}</p>
                    <div className="badge badge-primary ml-5">{user.role.toUpperCase()}...</div>
                    </li>    
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Update Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><button onClick={() => logout()}>Logout</button></li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer btn btn-ghost"><button onClick={() => setDropdownOpen(false)}>X</button></li>
                    </ul>
                )}
                </div>
                        : <div></div>
                    }
                </div>
        </div>
    )
}
