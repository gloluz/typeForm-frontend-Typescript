import axios from "axios";
import { Form } from "../types/Form";

export const fetchForm = async (id: string) => {
  try {
    const response = await axios.get<Form>(
      `${process.env.REACT_APP_API_URI}/form/${id}`
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
