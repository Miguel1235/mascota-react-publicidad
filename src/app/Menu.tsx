/* eslint-disable no-console */
import React from "react"
import LoginMenu from "./LoginMenu"
import MainMenu from "./MainMenu"
import AdminMenu from "./Ads/AdminMenu"
import "./Menu.css"
import { useSessionUser } from "../store/userStore"

export default function Menu() {
  const user = useSessionUser()

  const menu = () => {
    if (user !== undefined && user.permissions !== undefined) {
      if (user.permissions.length > 1) {
        if (user.permissions[1] === "admin") {
          return <AdminMenu />
        }
      }
      else return <MainMenu />
    }
    return <LoginMenu />
  }


  return (
    <div className="menu_div navbar-nav bg-light shadow">
      {menu()}
    </div>
  )
}
