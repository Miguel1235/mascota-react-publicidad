import axios from "axios"
import { environment } from "../app/environment/environment"


interface Ad{
    picture:string;
    url:string;
    updated?:Date;
    created?:Date;
    enabled?:boolean;
}

export async function addAd(image: string,url: string): Promise<Ad> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/ads", {image,url})).data as Ad
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export function getPictureUrl(id: string) {
    if (id && id.length > 0) {
        return environment.backendUrl + "/v1/image/" + id
    } else {
        return "/assets/publicityBanner.png"
    }
}

interface UploadPicture {
    image: string;
}
interface UploadPictureId {
    id: string;
}

export const uploadPicture=async (image: UploadPicture): Promise<UploadPictureId>=>{
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/image", image)).data as UploadPictureId
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}