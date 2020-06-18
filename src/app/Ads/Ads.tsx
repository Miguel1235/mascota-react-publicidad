import React, { FunctionComponent, useState, useEffect } from "react"

import "./Ads.css"
import { getAds, getAdPicture, IAd } from "./adsService"
import { useErrorHandler } from "../../common/utils/ErrorHandler"

interface Props {
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
const Ads: FunctionComponent<Props> = ({ children }) => {
  const [ads, setAds] = useState<IAd>()

  const errorHandler = useErrorHandler()

  useEffect(() => {
    const obtainAds = async () => {
      try {
        const adds = await getAds()
        const randomElement: number = Math.floor(Math.random() * adds.length)
        setAds(adds[randomElement])
      }
      catch (e) {
        errorHandler.addError("Ads", "No puede obtener")
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(obtainAds, 3000)
    return () => clearInterval(interval)
  }, [errorHandler])
  return (
    <div className="container">
      {children}
      <a href={ads ? `${ads.url}` : "https://www.google.com"}>
        <img
          className="ad"
          src={ads ? getAdPicture(ads.image) : "/assets/publicityBanner.png"}
          alt="A publicity"
          width="200"
          height="400" />
      </a>
    </div>
  )
}

export default Ads