import http from "../config/http.config";       
import type { IVendor } from "../pages/vendor/vendorListPage";

export const getVendors = async (searchText:string|null, offset:number, limit:number) => {
    const urlParams = new URLSearchParams();
    if(searchText){
        urlParams.append("searchText",searchText)
    }
    urlParams.append("offset", offset.toString())
    urlParams.append("limit", limit.toString())
    return await http.get("/master/vendor", {params: urlParams});
}       

export const createVendor = async (vendorData: IVendor) => {
    return await http.post("/master/vendor", vendorData);
}

export const updateVendor = async(vendorId:number|null, vendorData:IVendor)=>{
    return http.put("/master/vendor/"+vendorId, vendorData);
}       
export const deleteVendorService = async(vendorId:number)=>{
    return http.delete("/master/vendor/"+vendorId);
}