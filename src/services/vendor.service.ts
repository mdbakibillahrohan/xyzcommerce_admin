/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../config/http.config";       


export const getVendors = async (searchText:string|null, offset:number, limit:number) => {
    const urlParams = new URLSearchParams();
    if(searchText){
        urlParams.append("searchText",searchText)
    }
    urlParams.append("offset", offset.toString())
    urlParams.append("limit", limit.toString())
    return await http.get("/master/vendor", {params: urlParams});
}       

export const createVendor = async (vendorData: any) => {
    return await http.post("/master/vendor", vendorData);
}

export const updateVendor = async(vendorId: number | null, _payload: { vendor_name: any; vendor_address: any; description: any; }, )=>{
    return http.put("/master/vendor/"+vendorId, );
}       
export const deleteVendorService = async(vendorId:number)=>{
    return http.delete("/master/vendor/"+vendorId);
}