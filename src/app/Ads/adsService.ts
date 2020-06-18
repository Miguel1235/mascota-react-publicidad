import axios from "axios"
import { environment } from "../environment/environment"

export interface IAd{
    id:string;
    image: string;
    url: string;
}

export async function getAds(): Promise<IAd[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/ads")).data as IAd[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const getAdPicture=(id:string)=>{
        return environment.backendUrl + "/v1/image/" + id
}

export const deleteAd=async (ad:IAd)=>{
    try {
        await axios.delete(environment.backendUrl + `/v1/ads/${ad.id}`)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}