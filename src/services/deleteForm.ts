import axios from "axios";

export const deleteForm = async (id: string) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URI}/form/${id}`
    );

    return response.status === 200;
  } catch (error) {
    console.log("error", error);
  }
};
