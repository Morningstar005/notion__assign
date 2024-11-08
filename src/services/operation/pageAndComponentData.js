import React from 'react'
import {catalogData} from "../api"
import { toast } from 'react-hot-toast'
import {apiConnector} from "../apiconnector"

export const getCatalogPageData = async (catalogId) => {
    const toastId = toast.loading("loading...");
    let result = [];
    try {
      console.log("Fetching catalog page data for categoryId:", catalogId);
      const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, { categoryId: catalogId });
      
      console.log("Response from backend:", response);
      
      // Check if the response contains the expected data
      if (!response?.data?.data) {
        throw new Error("Could not fetch category page data. Invalid response format.");
      }
  
      result = response.data;  // Assuming you expect the entire `data` object from the response
      console.log("Fetched data:", result);
      
    } catch (error) {
      console.log("Error while fetching catalog page data:", error);
      // Check if error.response exists, otherwise fallback to error.message
      toast.error(error.response?.data?.message || error.message);
      result = error.response?.data || { message: error.message };
    }
  
    toast.dismiss(toastId);
    return result; // This should return the correct data
  };