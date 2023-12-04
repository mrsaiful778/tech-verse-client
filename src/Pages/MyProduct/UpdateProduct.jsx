import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";


const UpdateProduct = () => {
    const { user } = useContext(AuthContext);
    const [details, setDetails] = useState({})
    const myAxios = useAxiosPublic()
    const { id } = useParams()
    useEffect(() => {
        myAxios.get('/tranding')
        .then(res => {
            const allData = res?.data;
            const findData = allData.find(item => item._id == id )
            setDetails(findData)
        })
    }, [myAxios, id])

    const updatedProducts = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productImage = form.productImage.value;
        const ownerName = form.ownerName.value;
        const ownerImage = form.ownerImage.value;
        const ownerEmail = form.ownerEmail.value;
        const tags = form.tags.value;
        const externallinks = form.externallinks.value;
        const description = form.description.value;
        const UpdateProductDetails = { productName, productImage, ownerName, ownerEmail, ownerImage, tags, externallinks, description }
        myAxios.patch(`/productUpdate/${details?._id}`, UpdateProductDetails)
        .then(res => {
            if(res.data.modifiedCount > 0 ){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "product  update successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }




    return (
        <div>
            <div className="mt-10 space-y-2">
                <h2 className="text-4xl font-semibold text-center py-2">Update Product</h2>
                <form onSubmit={updatedProducts} className="bg-slate-300 max-w-screen-md mx-auto p-10 rounded-md">

                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" defaultValue={details?.productName} type="text" name="productName" /> <br />


                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " type="text" name="productImage" defaultValue={details?.productImage} /> <br />

                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " defaultValue={user?.displayName} readOnly type="text" name="ownerName" /> <br />
                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " defaultValue={user?.photoURL} readOnly type="text" name="ownerImage" /> <br />
                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " defaultValue={user?.email} readOnly type="text" name="ownerEmail" /> <br />

                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" defaultValue={details?.tags} type="text" name="tags" />

                    <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" type="text" name="externallinks" defaultValue={details?.externallinks} />

                    <textarea className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" name="description" id="" cols="30" defaultValue={details?.description}></textarea>

                    <input className="btn btn-accent w-full rounded-md space-y-2" type="submit" value="Submit" />
                </form>

            </div>
        </div>
    );
};

export default UpdateProduct;