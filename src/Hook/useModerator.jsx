import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";




const useModarator = () => {
    const [isModarator, setIsModarator] = useState({})
    const { user, loading } = useContext(AuthContext);
    const myAxios = useAxiosPublic()
    useEffect(() => {
        // myAxios.get(`/allUsers/${user?.email}`)
        myAxios.get('/users')
        .then(res => {
            const allData = res.data
            const isExist = allData.find(item => item?.userEmail == user?.email && item?.role === 'moderator')
            setIsModarator(isExist)
        })
    }, [myAxios, user?.email])
    return [isModarator]

};

export default useModarator;