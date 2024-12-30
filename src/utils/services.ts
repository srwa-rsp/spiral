import { UserRegister } from "@/types/interfaces/UserInterface.ts";
import axiosInstance from "./axiosConfig.ts";
 
export const useGetStages = async() => {
    try {
        const response = await axiosInstance.get("/stages");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const useGetQuestions = async() => {
    try {
        const response = await axiosInstance.get("/questions");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const usePostUserResults = async(params) => {
    try {
        const response = await axiosInstance.post("user/generate-result",params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const useGetResult= async() => {
    try {
        const response = await axiosInstance.get("/user/result");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const useRegisterUser = async(params: UserRegister) => {
    try {
        const response = await axiosInstance.post("/auth/register",params);
        return response.data;
    } catch (error) {
        throw error;
    }
}