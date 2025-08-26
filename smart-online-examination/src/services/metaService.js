// services/metaService.js
import axios from "axios";
import { API_BASE_URL } from "@/config/useWebSocket";

export async function fetchMetaData() {
  const [maj, sem, yr, sh, bt, sub, lc] = await Promise.all([
    axios.get(API_BASE_URL + "/api/majors/all", { withCredentials: true }),
    axios.get(API_BASE_URL + "/api/semesters", { withCredentials: true }),
    axios.get(API_BASE_URL + "/api/academic-years", { withCredentials: true }),
    axios.get(API_BASE_URL + "/api/shifts", { withCredentials: true }),
    axios.get(API_BASE_URL + "/api/batchs", { withCredentials: true }),
    axios.get(API_BASE_URL + "/api/subjects", { withCredentials: true }),
    axios.get(API_BASE_URL+ "/api/locations", { withCredentials: true}),
  ]);



  return {
    majors: maj.data?.data || [],
    semesters: sem.data?.data || [],
    years: yr.data?.data || [],
    shifts: sh.data?.data || [],
    batches: bt.data?.data || [],
    subjects: sub.data?.data || [],
    locations: lc.data?.data || []
  };
  
}
