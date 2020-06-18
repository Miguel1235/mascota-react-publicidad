import React, { useState} from "react"
import { RouteComponentProps } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import ErrorLabel from "../common/components/ErrorLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import ImageUpload from "../common/components/ImageUpload"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome} from "../common/utils/Tools"

import {addAd,getPictureUrl,uploadPicture} from "../ads/AdsAdminServices"


export default function AdsAdmin(props: RouteComponentProps) {
    const [picture, setPicture] = useState("")
    const [picture64,setPicture64] = useState("")
    const [url, setUrl] = useState("")

    const errorHandler = useErrorHandler()

    const uploadAd = async () => {
        errorHandler.cleanRestValidations()
        if (!url) {
            errorHandler.addError("Link", "No puede estar vacío")
        }
        if (!picture){
            errorHandler.addError("Link", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }
        try {
            await addAd(picture64,url)
            goHome(props)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }
    const uploadImage=async (image:string)=>{
        try {
            const result = await uploadPicture({image,})
            setPicture(result.id)
            setPicture64(image)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Crear publicidad</FormTitle>

            <Form>

                <FormInput
                    label="Link completo (con https://www.....)"
                    name="name"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    errorHandler={errorHandler} />

                <div className="form-group">
                    <label>Imagen</label>
                    <ImageUpload src={getPictureUrl(picture)}
                        onChange={uploadImage} />
                    <ErrorLabel message={errorHandler.getErrorText("name")} />
                </div>

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Crear publicidad" onClick={uploadAd} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}
