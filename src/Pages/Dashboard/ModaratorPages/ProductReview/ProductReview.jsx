import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { Link } from "react-router-dom";


const ProductReview = () => {
    const [reviews, setReviews] = useState([])
    const myAxios = useAxiosPublic()
    useEffect(() => {
        myAxios.get('/review')
            .then(res => {
                setReviews(res?.data)
            })
    }, [myAxios])

    const handleAccepted = (id) => {
        console.log(id);
    }
    return (
        <div>
            {/* review part */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th><span className="text-3xl font-medium">Product Name</span></th>
                            <th><span className="text-3xl font-medium">View Details</span></th>
                            <th><span className="text-3xl font-medium">Make Featured</span></th>
                            <th><span className="text-3xl font-medium">Accepted</span></th>
                            <th><span className="text-3xl font-medium">Rejected</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews?.map(user => <tr key={user._id}>

                                <td className="text-center">
                                    <p className="text-xl">{user?.productName}</p>

                                </td>

                                <td className="text-center">
                                    <Link to={`/productDetails/${user?.productId}`}>
                                        <button className="btn btn-accent btn-outline btn-md">View Details</button>
                                    </Link>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-accent btn-outline btn-md">Featured</button>

                                </td>
                                <td className="text-center">
                                    <button onClick={() => handleAccepted(user._id)} className="btn btn-accent btn-outline btn-md"> Accepted</button>

                                </td>
                                <td className="text-center">
                                    <button className="btn btn-accent btn-outline btn-md"> Rejected</button>

                                </td>


                            </tr>)
                        }






                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default ProductReview;