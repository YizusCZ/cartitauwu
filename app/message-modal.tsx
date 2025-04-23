"use client"

import { X } from "lucide-react"
import styles from "./olivia.module.css"

interface MessageModalProps {
  onClose: () => void
}

export default function MessageModal({ onClose }: MessageModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.modalMessage}>
          <p className={styles.spanishMessage}>
            Tal vez no sea la gran cosa, pero aquí tienes, quiero que sepas que soy una persona muy complicada pero a
            pesar de todo me amas y yo también, adoro todo lo que eres.
          </p>

          <div className={styles.lyricsContainer}>
            <p className={styles.lyrics}>
              "I think I'm in love
              <br />
              And he laughs at all my jokes
              <br />
              And he says I'm so American
              <br />
              Oh, God, it's just not fair of him
              <br />
              To make me feel this much
              <br />
              I'd go anywhere he goes"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
