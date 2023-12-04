import useAxiosPublic from "../../Hook/useAxiosPublic";


const AddHomeProduct = () => {
    const myAxios = useAxiosPublic()
    const handleFeature = e => {
        e.preventDefault();
        const form = e.target;
        const image = form?.image.value;
        const name = form?.name.value;
        const tags = form?.tags.value;
        const upVoteSTring = form?.upVote.value;
        const upVote = parseFloat(upVoteSTring)
        const externallinks = form?.externallinks.value;
        const description = form?.description.value;
        const product = { image, name, tags, upVote, externallinks, description }
        console.log(product);
        myAxios.post('/features', product)
        .then(res => {
            console.log(res.data);
        })
    }


    return (
        <div className="mt-32 space-y-2">
            <form onSubmit={handleFeature} className="bg-slate-300 max-w-screen-md mx-auto p-10">

                <input className="p-3 mt-2 py-3 border-2 border-black w-full" placeholder="image" type="text" name="image" /> <br />


                <input className="p-3 mt-2 py-3 border-2 border-black w-full" placeholder="name" type="text" name="name" /> <br />


                <input className="p-3 mt-2 py-3 border-2 border-black w-full" placeholder="tags" type="text" name="tags" />


                <input className="p-3 mt-2 py-3 border-2 border-black w-full" defaultValue={0} type="number" name="upVote"  />

                <input  className="p-3 mt-2 py-3 border-2 border-black w-full" type="text" name="externallinks" placeholder="external links" />

                <textarea className="p-3 mt-2 py-3 border-2 border-black w-full" name="description" id="" cols="30" placeholder="description" ></textarea>

                <input className="btn btn-accent w-full space-y-2" type="submit" value="Submit" />
            </form>

        </div>
    );

};

export default AddHomeProduct;