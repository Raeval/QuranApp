import { useEffect, useState } from 'react';
import './css/ReadScreen.css';
import { BsCheckCircle, BsBookmark, BsBookmarkFill, BsCheckCircleFill } from "react-icons/bs";
import axios from 'axios';

export default function ReadScreen() {
    // Save and checkpoint button
    const [saved, setSaved] = useState(false);
    const [hoveredSaved, setHoveredSaved] = useState(false);

    const [checkpoint, setCheckpoint] = useState(false);
    const [hoveredCheckpoint, setHoveredCheckpoint] = useState(false);

    // Data initialisation
    const [surah, setSurah] = useState(1);
    const [surahName, setSurahName] = useState("");
    const [ayahs, setAyahs] = useState([]);
    const [translations, setTranslations] = useState([]);

    // Get data from API
    useEffect(() => {
        fetchSurah();
      }, [surah]);

    const fetchSurah = async () => {
        const res = await axios.get("http://localhost:3000/quran/arabic/114")
        setSurahName(res.data.name)
        setAyahs(res.data.ayahs);
    };

    console.log(surahName);
    console.log(ayahs);

    return (
        <div className="readScreenContainer">
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
                <h2>{surahName}</h2>
                {ayahs.map((ayah, idx) => (
                    <div key={idx} className="ayahContainer"> 
                        <div className="ayah">
                            <span className="ayahNumber">{idx + 1}</span>
                            {ayah}
                        </div>
                        <div className="translation">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut porttitor est. Nunc maximus eget nisl at suscipit. Nunc venenatis nisl mauris, ut ultrices risus porttitor et.
                        </div>
                        <div className="ayahFooter">
                            <div
                                className="bookmark"
                                onClick={() => setSaved(!saved)}
                                onMouseEnter={() => setHoveredSaved(true)}
                                onMouseLeave={() => setHoveredSaved(false)}
                                style={{ cursor: "pointer" }}
                                >
                                {/* Priority: hover > saved */}
                                {hoveredSaved || saved ? <BsBookmarkFill /> : <BsBookmark />}
                            </div>
                            <div className="checkCircle"
                            onClick={() => setCheckpoint(!checkpoint)}
                            onMouseEnter={() => setHoveredCheckpoint(true)}
                            onMouseLeave={() => setHoveredCheckpoint(false)}
                            style={{ cursor: "pointer" }}
                            >
                                {hoveredCheckpoint || checkpoint ? <BsCheckCircleFill /> : <BsCheckCircle />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}