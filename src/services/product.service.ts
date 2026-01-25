/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../config/http.config";

export const createProduct = async (productData: any) => {
    return await http.post("/master/products", productData);
}

export const getProducts = async () => {
    return await http.get("master/products?filter=unpublished");
}