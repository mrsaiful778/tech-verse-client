import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const AddProductField = () => {
    const {user } = useContext(AuthContext);
    const addProduct = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const ownerName = form.ownerName.value;
        const ownerImage = form.ownerImage.value;
        const ownerEmail = form.ownerEmail.value;
        const productImage = form.productImage.value;
        const tags = form.tags.value;
        const addProducts = {productName, ownerName, ownerImage, ownerEmail, productImage, tags }
        console.log(addProducts);

    }


    return (
        <div className='max-w-screen-lg  mx-auto bg-slate-400 p-5 rounded-lg my-20 '>
            <h3 className="text-4xl text-center font-semibold">Add Product </h3>
        <form onSubmit={addProduct}>
            <div className="grid md:grid-cols-2 items-center gap-4">
            <div>
            <label> Product Name</label>
            <h3 className='text-3xl italic font-bold text-center '> </h3>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="text" name='productName' placeholder="Product name" required /> <br /> <br />
            </div>
            <div>
            <label> Owner Name</label>
            <h3 className='text-3xl italic font-bold text-center '> </h3>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="text" name='ownerName' defaultValue={user?.displayName} readOnly /> <br /> <br />
            </div>
            <div>
            <label> Product Image</label>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="text" name="productImage" placeholder="Add image URL" id="" required/> <br /> <br />
            </div>
            <div>
            <label> Owner Image</label>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="text" name="ownerImage" defaultValue={user?.photoURL} readOnly/> <br /> <br />
            </div>
            <div>
            <label> Owner Email</label>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="email" name="ownerEmail" defaultValue={user?.email} readOnly/> <br /> <br />
            </div>
            <div>
            <label> Teg </label>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="text" name="tags" placeholder="input teg" id="" required/> <br /> <br />
            </div>
           
           
            </div>
            <div>
            <label>External Links</label>
            <input className='bg-blue-200 py-2 w-full rounded-lg px-2 ' type="text" name="text" placeholder="External Links" id="" required/> <br /> <br />
            </div>
            
            <textarea className='bg-blue-200 py-2 w-full rounded-lg px-2 ' placeholder='Description' name="" id="" cols="20" ></textarea>
            <button type='submit' className='btn bg-[#78eaea] text-white hover:text-black w-full mt-5'>Add product</button>
        </form>
    </div>
    );
};

export default AddProductField;