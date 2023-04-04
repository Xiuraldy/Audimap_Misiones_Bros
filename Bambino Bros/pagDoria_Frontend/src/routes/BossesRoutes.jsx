import { useEffect } from "react"
import './RoutesDoria/styleRoutesDoria.css' 
import { Routes, Route, useNavigate } from "react-router-dom"
import { BossesLinks } from "../page/bosses/links/BossesLinks"
import { BossesUsers } from "../page/bosses/users/BossesUsers"
//import { CommonsMissionFour } from "../page/commons/CommonsMissionFour/CommonsMissionFour"
import { CommonsMissionOne } from "../page/commons/CommonsMissionOne/CommonsMissionOne"
// import { CommonsMissionThree } from "../page/commons/CommonsMissionThree/CommonsMissionThree"
import { CommonsMissionTwo } from "../page/commons/CommonsMissionTwo/CommonsMissionTwo"
import { CommonsMissionThree } from "../page/commons/CommonsMissionThree/CommonsMissionThree"
import { CommonsMissionFour } from "../page/commons/CommonsMissionFour/CommonsMissionFour"
import { CommonsMissionFive } from "../page/commons/CommonsMissionFive/CommonsMissionFive"
import { CommonsMissionSix } from "../page/commons/CommonsMissionSix/CommonsMissionSix"
import { CommonsMissionSeven } from "../page/commons/CommonsMissionSeven/CommonsMissionSeven"
import { CommonsMissionEight } from "../page/commons/CommonsMissionEight/CommonsMissionEight"
import { CommonsMissionNine } from "../page/commons/CommonsMissionNIne/CommonsMissionNine"

export const BossesRoutes = () => {
    const navigate = useNavigate()
    useEffect(() => {
      const session = localStorage.getItem('SESSION')
      if(!session){
        navigate('/sign-up-login')
      }else{
        const sessionParse = JSON.parse(session)
        if(sessionParse.rol !== 'bosses'){
            navigate(`/${sessionParse.rol}`)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="full-page-content">
            <header>
            </header>
                <Routes>
                    <Route path='/users' element={<BossesUsers />} />
                    <Route path='/links' element={<BossesLinks />} />
                    <Route path='/1' element={<CommonsMissionOne />} />
                    <Route path='/2' element={<CommonsMissionTwo />} />
                    <Route path='/3' element={<CommonsMissionThree />} />
                    <Route path='/4' element={<CommonsMissionFour />} />
                    <Route path='/5' element={<CommonsMissionFive />} />
                    <Route path='/6' element={<CommonsMissionSix />} />
                    <Route path='/7' element={<CommonsMissionSeven />} />
                    <Route path='/8' element={<CommonsMissionEight />} />
                    <Route path='/9' element={<CommonsMissionNine />} />
                </Routes>
        </div>
    )
}