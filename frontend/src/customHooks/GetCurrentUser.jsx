import React, { useEffect } from "react";
import { serverURL } from "../App"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async () => {
            try {

                const result = await axios.get(serverURL + "/api/user/getuser", { withCredentials: true })
                dispatch(setUserData(result.data.user))
                console.log(result.data)
            }
            catch (e) {
                console.log(e)
                dispatch(setUserData(null))
            }
        }
        getUser()
    }, [])
}

export default GetCurrentUser;