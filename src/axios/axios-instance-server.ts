"use server";
import axios from "axios";

export default axios.create({
  baseURL: process.env.AWS_API_HOST_URL,
  timeout: 1000 * 60, // 1 minute,
  headers: {
    "Content-Type": "application/json"
  }
});