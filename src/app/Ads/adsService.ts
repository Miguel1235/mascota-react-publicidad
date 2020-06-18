import axios from "axios"
import { environment } from "../environment/environment"

export interface IAd {
    id: string;
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

export const getAdPicture = (id: string) => {
    return environment.backendUrl + "/v1/image/" + id
}

export const deleteAd = async (ad: IAd) => {
    try {
        await axios.delete(environment.backendUrl + `/v1/ads/${ad.id}`)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

interface Ad {
    picture: string;
    url: string;
    updated?: Date;
    created?: Date;
    enabled?: boolean;
}

export async function addAd(image: string, url: string): Promise<Ad> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/ads", { image, url })).data as Ad
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

export const uploadPicture = async (image: UploadPicture): Promise<UploadPictureId> => {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/image", image)).data as UploadPictureId
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}