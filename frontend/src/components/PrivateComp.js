import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateComp() {
    const auth = localStorage.getItem("academic");
  return (auth? <Outlet/>:<Navigate to="/login"/>)
}