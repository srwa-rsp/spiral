import axiosInstance from "./axiosConfig";
 
export const useGetStages = async() => {
    try {
        const response = await axiosInstance.get("/stages");
        return response.data;
    } catch (error) {
        console.log("Error getting Stages")
    }
}