import axios from "axios";
import { Form } from "../types/Form";

export const postForm = async (form: Form) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URI}/form`, form);
  } catch (error) {
    console.log("error", error);
  }
};
