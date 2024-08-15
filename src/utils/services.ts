import axiosInstance from "./axiosConfig";
 
export const useGetStages = async() => {
    try {
        const response = await axiosInstance.get("/stages");
        return response.data;
    } catch (error) {
        console.log("Error getting Stages")
    }
}
export const useGetQuestions = async() => {
    try {
        const response = await axiosInstance.get("/questions");
        return response.data;
    } catch (error) {
        console.log("Error getting Stages")
    }
}
export const usePostUserResults = async(params) => {
    try {
        const response = await axiosInstance.post("user/generate-result",params);
        return response.data;
    } catch (error) {
        console.log("Error getting Stages")
    }
}

export const useGetResult= async() => {
    try {
        const response = await axiosInstance.get("/user/result");
        return response.data;
    } catch (error) {
        console.log("Error getting Stages")
    }
}