import axios from "axios";
import { Form } from "../types/Form";

export const fetchForms = async () => {
  try {
    const response = await axios.get<Form[]>(
      `${process.env.REACT_APP_API_URI}/form`
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
