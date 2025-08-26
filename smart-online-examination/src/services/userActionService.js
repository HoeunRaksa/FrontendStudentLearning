import axios from "axios";
import { API_BASE_URL } from "@/config/useWebSocket";

export async function fetchActionMeta() {
    const [ac] = await Promise.all([
        axios.get(API_BASE_URL+ "/api/actions/all", { withCredentials: true})
    ]);

    return{
        actions: ac.data?.data || []
    };
}