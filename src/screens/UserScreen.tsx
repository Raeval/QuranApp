import { Link } from 'react-router-dom';
import './css/UserScreen.css';

export default function UserScreen() {
    return (
        <div className="screenContainer">
            <div className="arab-quote">Random Quoteeeeeeee</div>
            <div className="contentContainer">
                <div className="app-name"><span className="learn">Learn</span><span className="quran">Qur'an</span></div>
                <div className="question">Hi [name]. What do you want to do?</div>
                <Link to="/readQuran" className="activity-container">Read Qur'an</Link>
                <div className="activity-container">Qur'an Quotes</div>
                <div className="activity-container">Salat Tracker</div>
                <div className="activity-container">Saved Ayat</div>
            </div>
        </div>
    )
}