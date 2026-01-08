import http from "../config/http.config"
import type { ICategory } from "../pages/category/CategoryListPage";

export const getCategories = async (searchText:string|null, offset:number, limit:number) => {
    const urlParams = new URLSearchParams();
    if(searchText){
        urlParams.append("searchText",searchText)
    }
    urlParams.append("offset", offset.toString())
    urlParams.append("limit", limit.toString())
    return await http.get("/master/category", {params: urlParams});
}

export const createCategory = async (categoryData: ICategory) => {
    return await http.post("/master/category", categoryData);
}

export const updateCategory = async(categoryId:number|null, categoryData:ICategory)=>{
    return http.put("/master/category/"+categoryId, categoryData);
}

export const deleteCategoryService = async(categoryId:number)=>{
    return http.delete("/master/category/"+categoryId);
}