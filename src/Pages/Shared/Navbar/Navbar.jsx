
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../../../Hook/useAdmin";
import useModarator from "../../../Hook/useModerator";




const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user);
    const [isAdmin] = useAdmin()
    const [isModarator] = useModarator()
    console.log(isModarator);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    }

    const NavSection = <>
        <NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-lg text-black hover:text-white bg-[#66c6f3] font-medium py-2 px-4 lg:px-6 rounded-lg" : ""
            }
        >
            Home
        </NavLink>
        <NavLink
            to="/product"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-lg text-black hover:text-white bg-[#66c6f3] font-medium py-2 px-4 lg:px-6 rounded-lg" : ""
            }
        >
            Product
        </NavLink>



        {
            user ? '' : <li><NavLink to="/login">Login</NavLink></li>
        }
    </>

    return (
        <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white  max-w-screen-xl mx-auto top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-opacity-30 bg-black rounded-box w-52">
                        {NavSection}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl hidden md:block"><img className="w-44 h-7" src="https://i.ibb.co/0hB0Dc2/Tech-Verse-3-1-e1692190492434.png" alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex items-center gap-10">
                    {NavSection}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>



                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">
                                <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
                            </div>
                            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                <li>
                                    <p className="text-center"> {user?.displayName}</p>
                                </li>
                                <li>
                                    {
                                        isAdmin && user && !isModarator ? <Link to="/dashboard/statisticsPage">
                                            <button >Dashboard</button>

                                        </Link>
                                            :
                                            ''
                                    }
                                    {
                                        !isAdmin && user && !isModarator ?
                                            <Link to="/dashboard/myProfile">
                                                <button >Dashboard</button>
                                            </Link>
                                            :
                                            ''

                                    }
                                    {
                                        !isAdmin && user && isModarator ?
                                            <Link to="/dashboard/productReview">
                                                <button >Dashboard</button>
                                            </Link>
                                            :
                                            ''

                                    }
                                </li>
                                <li>
                                    <button onClick={handleLogOut} >Logout</button>
                                </li>
                            </ul>
                        </div>

                    </>
                        :
                        ''
                }
            </div>
        </div>
    );
};

export default Navbar;