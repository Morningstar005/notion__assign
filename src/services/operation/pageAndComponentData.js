import React from 'react'
import {catalogData} from "../api"
import { toast } from 'react-hot-toast'
import {apiConnector} from "../apiconnector"

export const getCatalogPageData = async(catalogId) => {
    const toastId = toast.loading("loading...");
    let result =[];
    try{
        // console.log("try section se jaari hu mai guys", catalogId)
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
        {categoryId:catalogId})
        // console.log("response",response)
        // if(!response?.data?.data?.message){

        //     throw new Error("could not fetch category page data")
        // }

        result = response?.data
        // console.log("result hai bhai",result)
        // toast.success("")
    }catch(error){
        // console.log("error in fetching catalog data error of",error);
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastId)
    return result

}