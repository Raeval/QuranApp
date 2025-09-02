import type React from "react";

interface CheckpointModalProp {
    setShowModal: Function,
    confirmReplace: Function,
    verseReplace: number
};

export default function CheckpointModal({
        setShowModal,
        confirmReplace,
        verseReplace
    } : CheckpointModalProp){
    return (
        <div style={styles.overlay} role="dialog" aria-modal="true">
            <div style={styles.box}>
                <h3 style={styles.title}>Set new checkpoint?</h3>
                <p style={styles.text}>
                    You’re about to move your checkpoint to verse {verseReplace}. 
                    This will replace your current checkpoint.
                </p>
                <div style={styles.actions}>
                    <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
                    <button style={styles.confirmBtn} onClick={() => confirmReplace(verseReplace)}>Replace</button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      },
      box: {
        background: "#fff",
        borderRadius: "12px",
        padding: "20px 22px",
        width: "min(420px, 92vw)",
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      },
      title: {
        margin: "0 0 8px 0",
        fontSize: "18px",
        color: "#1a1a1a",
      },
      text: {
        margin: "0 0 16px 0",
        fontSize: "14px",
        color: "#555",
      },
      actions: {
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
      },
      cancelBtn: {
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid transparent",
        cursor: "pointer",
        fontWeight: 600,
        background: "#f3f4f6",
        color: "#111827",
      },
      confirmBtn: {
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid transparent",
        cursor: "pointer",
        fontWeight: 600,
        background: "#16a34a",
        color: "white",
      },  
};