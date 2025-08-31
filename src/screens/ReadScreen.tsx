import { useEffect, useState } from 'react';
import './css/ReadScreen.css';
import { BsCheckCircle, BsBookmark, BsBookmarkFill, BsCheckCircleFill } from "react-icons/bs";
import axios from 'axios';
import { surahs } from '../utils/surahs';

export default function ReadScreen() {
    // Save and checkpoint button
    const [saved, setSaved] = useState(false);
    const [hoveredSaved, setHoveredSaved] = useState(false);

    const [checkpoint, setCheckpoint] = useState(false);
    const [hoveredCheckpoint, setHoveredCheckpoint] = useState(false);

    // Data initialisation
    const [surah, setSurah] = useState(4);
    const [surahName, setSurahName] = useState("");
    const [ayahs, setAyahs] = useState([]);
    const [translations, setTranslations] = useState([]);
    
    const surahList = surahs;

    // Get data from API
    useEffect(() => {
        fetchSurah();
        fetchTranslation();
      }, [surah]);

    const fetchSurah = async () => {
        const res = await axios.get(`http://localhost:3000/quran/arabic/${surah}`)
        setSurahName(res.data.name)
        setAyahs(res.data.ayahs);
    };

    const fetchTranslation = async () => {
        const res = await axios.get(`http://localhost:3000/quran/indonesian/${surah}`);
        setTranslations(res.data);
    }

    return (
        <div className="readScreenContainer">
            <div className="sidebar">
                <div className="sidebarHeader">
                    <div className="sidebarTitle">
                        Surah
                    </div>
                    <div className="back">
                        Home
                    </div>
                </div>
                {surahList.map((surahName, idx) => (
                    <div 
                        key={idx} 
                        className={`sidebarSurah 
                                    ${idx + 1 === Number(surah) ? "selectedSurah" : ""} 
                                    ${idx === 0 ? "firstSurah" : ""}`
                                }
                        onClick={() => setSurah(idx+1)}
                    >
                        {idx + 1}. {surahName}
                    </div>
                ))}
            </div>
            <div className="content">
                <h2 className="surahName">{surahName}</h2>
                {ayahs.map((ayah, idx) => (
                    <div key={idx} className={`ayahContainer ${idx === 0 ? "firstContainer" : ""}` }> 
                        <div className="ayah">
                            <span className="ayahNumber">{idx + 1}</span>
                            {ayah}
                        </div>
                        <div className="translation">
                            {translations[idx]}
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