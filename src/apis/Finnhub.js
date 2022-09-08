import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params:{
        token:API_KEY,
    }
})