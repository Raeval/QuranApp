import { useState } from 'react';
import './css/ReadScreen.css';
import { BsCheckCircle, BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function ReadScreen() {
    const [saved, setSaved] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <div className="screenContainer">
            <div className="sidebar">
                <div className="back">
                    Home
                </div>
                <div className="surah">
                    1. Al-Fatihah
                </div>
                <div className="surah">
                    2. Al-Baqarah
                </div>
            </div>
            <div className="content">
                <div className="ayatContainer">
                    <div className="ayat">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut porttitor est. Nunc maximus eget nisl at suscipit. Nunc venenatis nisl mauris, ut ultrices risus porttitor et.
                    </div>
                    <div className="translation">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut porttitor est. Nunc maximus eget nisl at suscipit. Nunc venenatis nisl mauris, ut ultrices risus porttitor et.
                    </div>
                    <div className="ayatFooter">
                    <div
                        className="bookmark"
                        onClick={() => setSaved(!saved)}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{ cursor: "pointer" }}
                        >
                        {/* Priority: hover > saved */}
                        {hovered || saved ? <BsBookmarkFill /> : <BsBookmark />}
                    </div>
                        <BsCheckCircle className="checkCircle" />
                    </div>
                </div>
            </div>
        </div>
    )
}