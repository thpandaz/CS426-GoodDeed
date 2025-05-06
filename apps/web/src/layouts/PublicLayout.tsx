// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom"
import NavBar from "@repo/ui-web/components/navbar"

export function PublicLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
