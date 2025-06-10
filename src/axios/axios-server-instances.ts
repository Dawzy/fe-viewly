"use server";
import axios from "axios";

export const axiosAWSInstance = axios.create({
  baseURL: process.env.AWS_API_HOST_URL,
  timeout: 1000 * 30, // 30 seconds
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosTMDBInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000 * 30, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
  }
});