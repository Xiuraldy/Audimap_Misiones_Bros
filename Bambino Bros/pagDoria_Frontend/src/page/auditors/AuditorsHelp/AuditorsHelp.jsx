import './AuditorsHelp.css'; 
import silvia from "../../../assets/icon/helpers/silvia.png";
import dayana from "../../../assets/icon/helpers/dayana.png";

export const AuditorsHelp = () => {

    const redirectChatSilvia = () => {
        window.open("https://wa.link/3golpo")
    }

    const redirectChatDayana = () => {
        window.open("https://wa.link/wz22i3")
    }

    return (
        <div className="content-mission">
            <div className="content-help">
                <h4>Haz click para contactar a un instructor</h4>
                <div className="content-helpers">
                    <div className="helper">
                        <div className="inf-helper" onClick={() => redirectChatSilvia()}>
                            <h1>Silvia<br/>Molina<img src={ silvia } alt="Audimap" className="logo-footer"/></h1>
                            <h3>✆ +57 310 6132223</h3>       
                        </div>
                    </div>
                    <div className="helper">
                        <div className="inf-helper" onClick={() => redirectChatDayana()}>
                            <h1>Dayana<br/>Blanco<img src={ dayana } alt="Audimap" className="logo-footer"/></h1>
                            <h3>✆ +57 313 4145039</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}