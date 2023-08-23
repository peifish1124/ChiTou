import { useState } from "react";
import axiosFormData from "@/api/axiosFormData";

export default function useUploadPic(id) {
  const [picture, setPicture] = useState("");
  const uploadPic = async (formData) => {
    try {
      const result = await axiosFormData.put(`/trips/${id}/picture`, formData);
      console.log("upload pic result", result.data.data);
      setPicture(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { picture, uploadPic };
}
