import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SignUpLogin } from "../../page/sign-up-login/SignUpLogin"
import { AuditorsRoutes } from "../AuditorsRoutes"
import { BossesRoutes } from "../BossesRoutes"
import { Menu } from "../../components/menu/Menu"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../state/GlobalState"

export const RoutesDoria = () => {
    const {setUser} = useContext(GlobalContext)

    useEffect(() => {
        const session = localStorage.getItem('SESSION')
        if(session){
            setUser(JSON.parse(session))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const session = localStorage.getItem('SESSION')
    return (
        <div style={{display: "grid"}}>
            <Router basename="audimap">
                <div style={{gridColumnStart: 1, gridRowStart: 1}}>
                    <Menu />
                </div>
                <div style={{gridColumnStart: 1, gridRowStart: 1}}>
                    <Routes>
                        <Route path='/sign-up-login' element={<SignUpLogin />} />
                        <Route path='/auditors/*' element={<AuditorsRoutes />} />
                        <Route path='/bosses/*' element={<BossesRoutes />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}