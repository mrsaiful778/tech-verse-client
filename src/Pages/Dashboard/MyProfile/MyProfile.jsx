import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";


const MyProfile = () => {

    const { user } = useContext(AuthContext)
   
  
    return (
        <div>
            
            <div className="container mx-auto p-4 bg-gray-400">
                <div className="flex justify-start gap-5">
                    <img
                        src={user?.photoURL}

                        className="rounded-full h-20 w-20 object-cover mb-4"/>
                    <p className="py-8">{user?.displayName}</p>
                 
                </div>
                <div>
                  <p className="">{user?.email}</p>
                  </div>

            </div>
            <Link to="/dashboard/payment">
              <button className=" text-white flex justify-between items-center w-3/12 btn btn-accent">Membership Subscribe<p> $50</p> </button>
            </Link>
      
        </div>
    );
};

export default MyProfile;