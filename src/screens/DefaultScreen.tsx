import './css/DefaultScreen.css';

export default function DefaultScreen() {
    // TODO: IMPLEMENT GET SESSION HERE TO MAKE SURE USER IS LOGGED IN

    return (
        <div className="screenContainer">
            <div className="arab-quote">Random Quoteeeeeeee</div>
            <div className="contentContainer">
                <div className="app-name"><span className="learn">Learn</span><span className="quran">Qur'an</span></div>
                <div className="login">Login</div>
                <div className="register">Register</div>
            </div>
        </div>
    )
}