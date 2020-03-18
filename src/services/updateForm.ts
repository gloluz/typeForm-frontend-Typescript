import axios from "axios";
import { Form } from "../types/Form";

export const updateForm = async (form: Form) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URI}/form`, form);
  } catch (error) {
    console.log(error);
  }
};
