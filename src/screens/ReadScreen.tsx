import { useEffect, useState } from 'react';
import './css/ReadScreen.css';
import { BsCheckCircle, BsBookmark, BsBookmarkFill, BsCheckCircleFill } from "react-icons/bs";
import axios from 'axios';
import { surahs } from '../utils/surahs';
import CircularProgress from '@mui/material/CircularProgress';
import { scrollToTop } from '../utils/scroll';

export default function ReadScreen() {
    // Save and checkpoint button
    const [savedSet, setSavedSet] = useState<Set<number>>(new Set());
    const [checkpointSet, setCheckpointSet] = useState<Set<number>>(new Set());

    // Adds or delete to a set
    const toggleSaved = (i: number) =>
        setSavedSet(prev => {
            const s = new Set(prev);
            s.has(i) ? s.delete(i) : s.add(i);
            return s;
    });

    const toggleCheckpoint = (i: number) =>
        setCheckpointSet(prev => {
            const s = new Set(prev);
            s.has(i) ? s.delete(i) : s.add(i);
            return s;
    });

    // Data initialisation
    const [surah, setSurah] = useState(4);
    const [surahName, setSurahName] = useState("");
    const [ayahs, setAyahs] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const surahList = surahs;

    // Get data from API
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await fetchSurah();
                await fetchTranslation();
            } catch (e) {
                console.error(e);
            } finally {
                scrollToTop(".content");
                setLoading(false);
            }
          })();
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
        <div className={`readScreenContainer ${loading === false ? "" : "is-loading"}`}>
            <div className={`loadingContainer`}>
                <CircularProgress 
                    color="success"
                    size="70px"
                />
                <p className="loadingSubtitle">Loading...</p>
            </div>
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
                        onClick={() => {
                            setSurah(idx+1)
                        }}
                    >
                        {idx + 1}. {surahName}
                    </div>
                ))}
            </div>
            <div className="content">
                <div className="surahNameContainer">
                    <h2 className="surahName">{surahName}</h2>
                </div>
                {ayahs.map((ayah, idx) => {
                    const isSaved = savedSet.has(idx);
                    const isChecked = checkpointSet.has(idx);
                
                return (
                    <div key={idx} className={`ayahContainer` }> 
                        <div className="ayah">
                            <span className="ayahNumber">{idx + 1}</span>
                            {ayah}
                        </div>
                        <div className="translation">
                            {translations[idx]}
                        </div>
                        <div className="ayahFooter">
                            <div
                                className={`iconBtn bookmark ${isSaved ? "is-active" : ""}`}
                                onClick={() => toggleSaved(idx)}
                                style={{ cursor: "pointer" }}
                            >
                                <BsBookmark className="icon-outline" />
                                <BsBookmarkFill className="icon-fill" />
                            </div>
                            <div 
                                className={`iconBtn checkCircle ${isChecked ? "is-active" : ""}`}
                                onClick={() => toggleCheckpoint(idx)}
                                style={{ cursor: "pointer" }}
                            >
                                <BsCheckCircle className="icon-outline" />
                                <BsCheckCircleFill className="icon-fill" />
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}