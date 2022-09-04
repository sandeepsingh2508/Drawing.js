import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import  { UserContext } from "../contexts/context"

export default function UserContextPages() {
    const [ user, setUser ] = useState();
  return (
    <div>
        <UserContext.provider value={{ user, setUser }}>
            <Outlet />
        </UserContext.provider>

    </div>
  )
}
