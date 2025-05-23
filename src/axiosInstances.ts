import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_LISTS_API,
  timeout: 1000 * 60 // 1 minute
});