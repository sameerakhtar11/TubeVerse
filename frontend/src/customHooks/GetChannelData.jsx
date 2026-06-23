import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverURL } from "../App";
import { setChannelData } from "../redux/userSlice";

export default function GetChannelData() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchChannel = async () => {
            try {

                const result = await axios.get(serverURL + "/api/user/getchannel", { withCredentials: true })
                dispatch(setChannelData(result.data.channel))
                console.log(result.data)
            }
            catch (e) {
                console.log(e)
                dispatch(setChannelData(null))
            }
        }
        fetchChannel()
    }, [])
}   