import { create } from "zustand";
import axios from "axios";
import BaseUrl from "../api/BaseUrl";

interface todoStore {
  data: null;
  fetchData2: () => void;
}

const useStore = create<todoStore>((set) => ({
  data: null,
  fetchData2: async () => {
    try {
      const response = await axios.get(BaseUrl);
      set({ data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default useStore;
