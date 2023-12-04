import { FaHome, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { GiMilkCarton } from "react-icons/gi";
import { LiaOpencart } from "react-icons/lia";
import { GoCodeReview } from "react-icons/go";
import { MdAddHomeWork, MdProductionQuantityLimits, MdReportOff } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { FcManager } from "react-icons/fc";
import { FcStatistics } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useModarator from "../Hook/useModerator";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Dashboard = () => {
    const [isAdmin] = useAdmin()
    const [isModarator] = useModarator()
    const { user } = useContext(AuthContext);
    return (
        <div className="flex">
            <div className="w-64 min-h-screen  bg-[#00ABA9]">
                <ul className="menu p-4">


                    {
                        !isAdmin && !isModarator && user ? <>
                            <li>
                                <NavLink to="/dashboard/myProfile">
                                    <CgProfile></CgProfile>
                                    My Profile </NavLink>
                            </li>


                            <li className="">
                                <NavLink to="/dashboard/addProduct">
                                    <GiMilkCarton></GiMilkCarton>
                                    Add product</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myproducts">
                                    <MdProductionQuantityLimits  ></MdProductionQuantityLimits >
                                    My product</NavLink>
                            </li>

                        </>
                            :
                            ''


                    }









                    {/* admin dashboard */}
                    {
                        user && isAdmin && !isModarator ? <>
                            <li>
                                <NavLink to="/dashboard/statisticsPage">
                                    <FcStatistics ></FcStatistics>
                                    Statistics </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <FcManager ></FcManager>
                                    Manage Users </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageCoupons">
                                    <RiCoupon3Line ></RiCoupon3Line>
                                    Manage Coupons </NavLink>
                            </li>
                        </>
                            :
                            ''

                    }

                    {/* manager role */}

                    {
                         !isAdmin && isModarator ? <>

                            <li>
                                <NavLink to="/dashboard/productReview">
                                    <GoCodeReview ></GoCodeReview>
                                    Product Review </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reportedContents">
                                    <MdReportOff ></MdReportOff>
                                    Reported Contents</NavLink>
                            </li>



                        </>
                            :
                            ''
                    }










                    <li>
                        <NavLink to="/">
                            <MdAddHomeWork  ></MdAddHomeWork >
                            Home</NavLink>
                    </li>


                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;