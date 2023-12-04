import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Reviews from "./Reviews";







const ProductDetails = () => {
    const [allProduct, setAllProduct] = useState([])

    const { user } = useContext(AuthContext)
    const myAxios = useAxiosPublic();
    const { id } = useParams()
    const [details, setDetails] = useState({})
    useEffect(() => {
        myAxios.get('/features')
            .then(res => {
                const allData = res.data
                setAllProduct(allData)
                const findData = allData.find(item => item._id == id)
                setDetails(findData)
            })
    }, [myAxios, id])
    // console.log(details);


    const handleReview = e => {
        e.preventDefault();
        const form = e.target;
        const name = form?.name.value;
        const image = form?.image.value;
        const rating = form?.rating.value;
        const productName = details?.name;
        const productId = details?._id;
        const description = form?.description.value;

        const review = {
            name, image, rating, description, productName, productId
        }
        console.log(review);

        myAxios.post('/review', review)

            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for review.",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })

    }



    const handlePollUp = (details) => {

        const upVote = { email: user?.email, voterName: user?.displayName }
        myAxios.post('/upvotes', upVote)
            .then(res => {
                // console.log(res.data);
                if (res?.data?.insertedId) {
                    const findItem = allProduct.find(items => details?._id == details?._id)
                    const upVote = findItem?.upVote;
                    myAxios.put(`/features/${details?._id}`, { upVote: upVote })
                        .then(res => {
                            console.log(res.data);
                            if (res?.data?.modifiedCount > 0) {
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
        <div className=" mt-32">

            <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative w-2/6  text-gray-700 bg-white rounded-r-none shrink-0 rounded-xl bg-clip-border">
                    <img
                        src={details?.image}
                        alt="image"
                        className=" w-full mt-32"
                    />
                </div>
                <div className="p-6">
                    <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-pink-500 uppercase">
                        <span className="text-xl text-black">Name: </span> {details?.name}
                    </h6>
                    <p>{details?.productName}</p>
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        <span>tags:</span> {details?.tags}
                    </h4>
                    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                        <span className="text-xl font-medium">description:</span> {details.description}
                    </p>

                    <Link to={`${details?.externallinks}`} target="_blank">
                        <p
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-pink-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        > External Link

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"

                                stroke="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4"
                            >
                                <path

                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                ></path>
                            </svg>
                        </p>
                    </Link>
                    <div className="flex justify-between items-center py-2">
                        <button onClick={() => handlePollUp(details)} className="btn btn-outline btn-sm"> up vote {details?.upVote}</button>
                        <button className="btn btn-outline btn-sm"> Report</button>

                    </div>
                </div>
            </div>
            {/* review show section */}
            <Reviews></Reviews>
            {/* review form part  */}
            <h2 className="text-4xl font-semibold text-center italic mb-10 ">Review Form </h2>
            <div className="max-w-screen-lg  mx-auto  p-5 rounded-lg pb-5">
                <form onSubmit={handleReview} className="max-w-screen-md mx-auto">
                    <input className='border-2 py-2 w-full rounded-lg px-2 ' type="text" name="name" defaultValue={user?.displayName} /> <br />
                    <input className='border-2 py-2 w-full rounded-lg px-2 ' type="text" name="image" defaultValue={user?.photoURL} readOnly /> <br />
                    <input className='border-2 py-2 w-full rounded-lg px-2 ' type="text" name="rating" placeholder="Rating" /> <br />
                    <textarea className="border-2 py-2 w-full rounded-lg px-2" name="description" id="" cols="30"></textarea> <br />
                    <button type="submit" className="btn btn-outline btn-success">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default ProductDetails;