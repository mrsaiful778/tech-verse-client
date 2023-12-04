import { useState } from "react";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const ManageUsers = () => {
    const myAxios = useAxiosPublic()
    // const [allUser, setAllUser] = useState([])
    // useEffect(() => {
    //     myAxios.get('/users')
    //         .then(res => {
    //             const allData = res.data
    //             setAllUser(allData)
    //         })
    // }, [myAxios])
    // console.log(allUser);
    const { data: allUser, refetch } = useQuery({
        queryKey: ['king'],
        queryFn: async () => {
            const res = await myAxios.get('/users')

            return res.data;


        }
    })

    const handleModaretor = (id) => {

        myAxios.patch(`/users/moderator/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Moderator Promotion Successfully ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }

    const handleAdmin = (id) => {
        myAxios.patch(`/users/admin/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Admin Promotion Successfully ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th><span className="text-3xl font-medium">User Name</span></th>
                            <th><span className="text-3xl font-medium">User Email</span></th>
                            <th><span className="text-3xl font-medium">Make Moderator</span></th>
                            <th><span className="text-3xl font-medium">Make Admin</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser?.map(user => <tr key={user._id}>


                                <td className="text-center">
                                    {user.userName}

                                </td>
                                <td className="text-center">{user.userEmail}</td>
                                <td className="text-center">
                                    {
                                        user.role == 'moderator' ? <button  className="btn btn-outline btn-success btn-md">Already Moderator</button>
                                        :
                                        <button onClick={() => handleModaretor(user._id)} className="btn btn-outline btn-success btn-md">Modaretor</button>
                                   }
                                </td>
                                <td>

                                    {
                                        user.role == 'admin' ? <button className="btn btn-outline btn-success btn-md">Already Admin</button>
                                            :
                                            <button onClick={() => handleAdmin(user._id)} className="btn btn-outline btn-success btn-md">Admin</button>
                                    }
                                </td>


                            </tr>)
                        }






                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default ManageUsers;