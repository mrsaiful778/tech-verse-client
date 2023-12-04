import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";



const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState({})
    const { user, loading } = useContext(AuthContext);
    const myAxios = useAxiosPublic()
    useEffect(() => {
        // myAxios.get(`/allUsers/${user?.email}`)
        myAxios.get('/users')
        .then(res => {
            const allData = res.data
            const isExist = allData.find(item => item?.userEmail == user?.email && item?.role === 'admin')
            setIsAdmin(isExist)
        })
    }, [myAxios, user?.email])
    return [isAdmin]

};

export default useAdmin;