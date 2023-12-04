
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { GiVote } from "react-icons/gi";



const Featured = () => {
    const {user} = useContext(AuthContext)
    const [count, setCount] = useState(0)
    const [featured, setFeatured] = useState([]);
    const myAxios = useAxiosPublic()
    useEffect(() => {
        myAxios.get('/features')
            .then(res => {
                setFeatured(res.data)
            })
    }, [myAxios])







    

    const handlePollUp = (item) => {
        
        const upVote = {email: user?.email, voterName: user?.displayName}
        myAxios.post('/upvotes', upVote)
        .then(res => {
            // console.log(res.data);
            if(res?.data?.insertedId){
                const findItem = featured.find(items => items?._id == item?._id)
                const upVote = findItem?.upVote;
                myAxios.put(`/features/${item?._id}`, {upVote: upVote})
                .then(res => {
                    console.log(res.data);
                   if(res?.data?.modifiedCount > 0 ){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "thanks for vote",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      window.location.reload()
                   }
                })
            }
        })
       
    }
    return (
        <div>
            <h3 className="text-5xl text-center py-5 border-b-2 border-gray-400 max-w-md mx-auto">Featured Item</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-5
                          py-5 ">

                {
                    featured?.map(item => <div key={item._id}

                    >
                        <div className=" shadow-lg rounded-lg">
                            <div className="px-4">
                                <img className="w-full h-48  rounded-lg" src={item?.image} alt="" />
                            </div>
                            <div className="space-y-5 py-4">

                                <div className=" px-4">
                                    <Link to={`/productDetails/${item?._id}`}> <h2 className="text-xl font-semibold text-blue-500">{item.name}</h2></Link>
                                </div>
                                <div className="px-4 flex justify-between items-center">

                                    <p>{item?.tags}</p>
                                    
                                </div>
                                <div className="flex justify-between py-2 px-4">
                                    <button className="btn btn-outline btn-success btn-xs" onClick={() => handlePollUp(item)}>
                                    <GiVote></GiVote> up vote <p>{item.upVote} </p>
                                    </button>
                                    

                                </div>
                            </div>
                        </div>


                    </div>)
                }

            </div>


        </div>
    );
};

export default Featured;