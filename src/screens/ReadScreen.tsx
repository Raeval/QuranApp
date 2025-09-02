import { useEffect, useState } from 'react';
import './css/ReadScreen.css';
import { BsCheckCircle, BsBookmark, BsBookmarkFill, BsCheckCircleFill } from "react-icons/bs";
import axios from 'axios';
import { surahs } from '../utils/surahs';
import CircularProgress from '@mui/material/CircularProgress';
import { scrollToTop } from '../utils/scroll';
import { addCheckpoint, addSaved, getCheckpoint, getSaved, removeCheckpoint, removeSaved, replaceCheckpoint, replaceSaved } from '../services/supabaseServices';
import CheckpointModal from '../components/CheckpointModal';

export default function ReadScreen() {
    // Save and checkpoint button
    const [saved, setSaved] = useState<number>(0);
    const [checkpoint, setCheckpoint] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [verseReplace, setVerseReplace] = useState(0);

    // Adds or delete to a set and update database
    // TODO: Fix database error
    const toggleSaved = (i: number) => {
        const verseNumber = i + 1;
        if (saved == 0) {
            setSaved(verseNumber);
            addSaved(surah, verseNumber);
        }
        else if (verseNumber < saved) {
            setShowModal(true);
            // TODO: Remember to include warning in html
        } else if (verseNumber === saved) {
            setSaved(0);
            removeSaved(surah, verseNumber);
        } else {
            setSaved(verseNumber);
            replaceSaved(surah, verseNumber);
        }
    };

    const toggleCheckpoint = (i: number) => {
        const verseNumber = i + 1;
        // No checkpoint saved
        if (checkpoint == 0) {
            setCheckpoint(verseNumber);
            addCheckpoint(surah, verseNumber);
        }
        else if (verseNumber < checkpoint) {
            setShowModal(true);
            // TODO: Remember to include warning in html
        } else if (verseNumber === checkpoint) {
            setCheckpoint(0);
            removeCheckpoint(surah, verseNumber);
        } else {
            setCheckpoint(verseNumber);
            replaceCheckpoint(surah, verseNumber);
        }
    };

    const confirmReplace = (i: number) => {
        setCheckpoint(i);
        replaceCheckpoint(surah, i);
        setShowModal(false);
    }

    // Data initialisation
    const [surah, setSurah] = useState(4);
    const [surahName, setSurahName] = useState("");
    const [verses, setVerses] = useState([]);
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
                setCheckpoint(await getCheckpoint(surah));
                setSaved(await getSaved(surah));
            } catch (e) {
                console.error(e);
            } finally {
                scrollToTop(".content");
                setLoading(false);
            }
          })();
      }, [surah]);

    const fetchSurah = async () => {
        const res = await axios.get(`http://localhost:3000/quran/arabic/${surah}`);
        setSurahName(res.data.name);
        setVerses(res.data.verses);
    };

    const fetchTranslation = async () => {
        const res = await axios.get(`http://localhost:3000/quran/indonesian/${surah}`);
        setTranslations(res.data);
    }

    
    return (
        <div className={`readScreenContainer ${loading === false ? "" : "is-loading"} ${showModal === true ? "show-modal" : ""}`}>
            {showModal && <CheckpointModal setShowModal={setShowModal} confirmReplace={confirmReplace} verseReplace={verseReplace}/>}
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
                {/* List all the surah names */}
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
                    <div className={`surahNameContainer ${checkpoint != 0 ? "is-read" : ""}`}>
                    <h2 className="surahName">{surahName}</h2>
                </div>

                {/* List all the verses in the surah */}
                {verses.map((verse, idx) => {
                    const verseNumber = idx + 1;
                    const isSaved = saved === verseNumber;
                    const isChecked = checkpoint === verseNumber;
                
                return (
                    <div key={idx} 
                        className={`
                            verseContainer
                            ${verseNumber <= checkpoint ? "is-read" : ""}
                        `}
                    > 
                        <div className="verse">
                            <span className="verseNumber">{idx + 1}</span>
                            {verse}
                        </div>
                        <div className="translation">
                            {translations[idx]}
                        </div>
                        <div className="verseFooter">
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
                                onClick={() => {
                                    toggleCheckpoint(idx);
                                    setVerseReplace(idx + 1);
                                }}
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