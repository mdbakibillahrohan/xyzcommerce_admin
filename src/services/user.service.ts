import http from "../config/http.config";

export interface UserData{
    user_id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    created_at: string,
    created_by: number,
    updated_at: string | null,
    updated_by: number | null,
    user_role_id: number
}

export const getCurrentUserInfo = async():Promise<UserData | null>=>{
    const response = await http.get<UserData>("/user");
    return response.data;
}