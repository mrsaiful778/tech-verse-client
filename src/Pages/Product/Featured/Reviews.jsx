import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import '@smastrom/react-rating/style.css'
import { Rating } from "@smastrom/react-rating";


const Reviews = () => {
    const myAxios = useAxiosPublic()
    const { data = [] } = useQuery({
        queryKey: ['reviewShow'],
        queryFn: async () => {
            const res = await myAxios.get('/review')
            return res.data;
        }
    })
    console.log(data);

    return (
        <div className="my-10">
            <h2 className="text-4xl font-semibold text-center italic mb-10 ">Our all clients eview </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {
                    data?.map(item => <div key={item._id}>
                        <div className="card card-compact bg-base-100 shadow-xl">
                            <figure> <img className="w-24 h-24 rounded-full m-5 flex justify-center items-center" src={item.image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="text-xl text-center font-medium mb-3">{item.name}</h2>
                                <div className=" text-center ">
                                    <div className="flex text-5xl justify-center text-[#CD9003]" ><Rating
                                        style={{ maxWidth: 180 }}
                                        value={item?.rating}
                                        readOnly
                                    /></div>
                                    <p className="text-start p-5 mt-3 bg-slate-200">description: {item.description}</p>
                                </div>
                                <div className="card-actions justify-end">

                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Reviews;