/* eslint-disable no-console */
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import DangerLabel from "../../common/components/DangerLabel"
import ErrorLabel from "../../common/components/ErrorLabel"
import Form from "../../common/components/Form"
import FormDeleteButton from "../../common/components/FormDeleteButton"
import FormButton from "../../common/components/FormButton"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import { getAds, deleteAd, IAd } from "./adsService"
import "../../styles.css"


export default function Delete(props: RouteComponentProps) {
    const [ads, setAds] = useState<IAd[]>([])
    const [ad, setAd] = useState<number>(0)

    const errorHandler = useErrorHandler()


    const deleteMe = async () => {
        errorHandler.cleanRestValidations()

        try {
            await deleteAd(ads[ad])
            goHome(props)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const loadAds = async () => {
            try {
                const result = await getAds()
                setAds(result)
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
        void loadAds()
    }, [errorHandler])

    return (
        <GlobalContent>
            <FormTitle>Borrar publicidad</FormTitle>

            <Form>

                <div className="form-group">
                    <label>Publicidad</label>
                    <select
                        value={ad}
                        onChange={e => setAd(Number(e.target.value))}
                        className={errorHandler.getErrorClass("ad", "form-control")}>
                        {ads.map((p, i) => <option key={i} value={i}>{p.url}</option>)}
                    </select>
                    <ErrorLabel message={errorHandler.getErrorText("ad")} />
                </div>

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormDeleteButton label="Borrar publicidad" onClick={deleteMe} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}
