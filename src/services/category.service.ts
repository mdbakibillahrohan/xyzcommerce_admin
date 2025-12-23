import http from "../config/http.config"
import type { ICategory } from "../pages/category/CategoryListPage";

export const getCategories = async () => {
    return await http.get("/master/category");
}

export const createCategory = async (categoryData: ICategory) => {
    return await http.post("/master/category", categoryData);
}