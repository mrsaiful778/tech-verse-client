import { useContext } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";



const DashboardAdd = () => {
    const myAxios = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const myProducts = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form?.productName?.value;
        const productImage = form?.productImage?.value;
        const externallinks = form?.externallinks?.value;
        const description = form?.description?.value;
        const tags = form?.tags.value;
        const ownerName = form.ownerName.value;
        const ownerEmail = form.ownerEmail.value;
        const ownerImage = form.ownerImage.value;
        const addProducts = {productName, productImage, externallinks, description, tags, ownerName, ownerEmail, ownerImage}
        console.log(addProducts);

        myAxios.post('/tranding', addProducts )
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your product successfully added",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 form.reset()
            }
        })
    }



    
    return (
        <div>
            <div className="mt-32 space-y-2">
                <h2 className="text-4xl font-semibold text-center py-2">Add Product</h2>
            <form onSubmit={myProducts} className="bg-slate-300 max-w-screen-md mx-auto p-10 rounded-md">

                <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" placeholder="Product name" type="text" name="productName" required /> <br />


                <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " placeholder="Product image" type="text" name="productImage" required/> <br />
                
                <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " defaultValue={user?.displayName} readOnly type="text" name="ownerName" /> <br />
                <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " defaultValue={user?.photoURL} readOnly type="text" name="ownerImage" /> <br />
                <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md " defaultValue={user?.email} readOnly type="text" name="ownerEmail" /> <br />

                <input className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" placeholder="tags" type="text" name="tags" />

                <input  className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" type="text" name="externallinks" placeholder="external links" />

                <textarea className="p-3 mt-2 py-3 border-2 border-black w-full rounded-md" name="description" id="" cols="30" placeholder="description" required ></textarea>

                <input className="btn btn-accent w-full rounded-md space-y-2" type="submit" value="Submit" />
            </form>

        </div>
        </div>
    );
};

export default DashboardAdd;