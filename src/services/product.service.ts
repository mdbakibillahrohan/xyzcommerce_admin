/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../config/http.config";

export const createProduct = async (productData: any) => {
    return await http.post("/master/products", productData);
}

export const getProducts = async (status?: string) => {
    
    const url = status ? `/master/products?status=${status}` : "/master/products";
    return await http.get(url);
}