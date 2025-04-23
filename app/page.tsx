"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, MessageCircleHeart } from "lucide-react"
import Image from "next/image"
import styles from "./olivia.module.css"
import { createConfetti } from "./confetti"
import MessageModal from "./message-modal"

export default function HeartPage() {
  const [showMessage, setShowMessage] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const images = ["/collage-1.jpg", "/collage-2.jpg", "/collage-3.jpg", "/collage-4.jpg", "/nils-image.jpg"]

  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [showMessage, images.length])

  const toggleMessage = () => {
    if (!showMessage && confettiCanvasRef.current) {
      createConfetti(confettiCanvasRef.current, {
        particleCount: 200,
        spread: 120,
        startVelocity: 45,
        colors: ["#9d4edd", "#c77dff", "#e0aaff", "#7b2cbf", "#5a189a"],
        gravity: 0.8,
        decay: 0.94,
      })
    }
    setShowMessage(!showMessage)
    setActiveImageIndex(0)
  }

  const toggleModal = () => {
    if (!showModal && buttonRef.current && confettiCanvasRef.current) {
      // Get button position for centered confetti
      const rect = buttonRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      createConfetti(confettiCanvasRef.current, {
        particleCount: 80,
        spread: 60,
        startVelocity: 30,
        colors: ["#9d4edd", "#c77dff", "#e0aaff", "#7b2cbf", "#5a189a"],
        gravity: 0.8,
        decay: 0.94,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      })
    }
    setShowModal(!showModal)
  }

  // Organized background elements with specific positions for a more aesthetic layout
  const backgroundElements = [
    // Top section
    { src: "/yellow-star.png", alt: "Yellow Star", width: 60, height: 60, top: "5%", left: "10%", delay: "0s" },
    {
      src: "/blue-butterfly.png",
      alt: "Blue Butterfly",
      width: 80,
      height: 64,
      top: "8%",
      right: "15%",
      delay: "1.2s",
    },
    { src: "/red-glitter.png", alt: "Red Glitter", width: 50, height: 50, top: "15%", left: "25%", delay: "2.5s" },
    { src: "/blue-globe.png", alt: "Blue Globe", width: 55, height: 55, top: "12%", right: "30%", delay: "0.7s" },

    // Middle left section
    { src: "/purple-heart.png", alt: "Purple Heart", width: 65, height: 65, top: "30%", left: "7%", delay: "1.8s" },
    { src: "/yellow-sun.png", alt: "Yellow Sun", width: 75, height: 75, top: "35%", left: "22%", delay: "3.2s" },

    // Middle right section
    { src: "/red-heart.png", alt: "Red Heart", width: 60, height: 60, top: "32%", right: "8%", delay: "2.1s" },
    { src: "/sad-flower.png", alt: "Sad Flower", width: 70, height: 70, top: "40%", right: "25%", delay: "0.5s" },

    // Bottom left section
    {
      src: "/blue-butterfly.png",
      alt: "Blue Butterfly",
      width: 70,
      height: 56,
      bottom: "20%",
      left: "12%",
      delay: "1.5s",
    },
    { src: "/yellow-star.png", alt: "Yellow Star", width: 50, height: 50, bottom: "10%", left: "28%", delay: "2.8s" },

    // Bottom right section
    { src: "/red-glitter.png", alt: "Red Glitter", width: 45, height: 45, bottom: "25%", right: "15%", delay: "0.9s" },
    {
      src: "/purple-heart.png",
      alt: "Purple Heart",
      width: 55,
      height: 55,
      bottom: "12%",
      right: "28%",
      delay: "3.5s",
    },

    // Center-ish elements (avoiding direct center where the heart is)
    { src: "/blue-globe.png", alt: "Blue Globe", width: 40, height: 40, top: "25%", left: "40%", delay: "1.1s" },
    { src: "/yellow-sun.png", alt: "Yellow Sun", width: 60, height: 60, bottom: "30%", right: "40%", delay: "2.3s" },
    { src: "/red-heart.png", alt: "Red Heart", width: 45, height: 45, bottom: "22%", left: "45%", delay: "3.1s" },
    { src: "/sad-flower.png", alt: "Sad Flower", width: 55, height: 55, top: "20%", right: "45%", delay: "0.3s" },
  ]

  return (
    <div className={styles.container}>
      <canvas ref={confettiCanvasRef} className={styles.confettiCanvas}></canvas>
      <div className={styles.grainOverlay}></div>

      <div className={styles.backgroundImages}>
        {backgroundElements.map((element, index) => (
          <div
            key={index}
            className={styles.bgImage}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              bottom: element.bottom,
              animationDelay: element.delay,
            }}
          >
            <Image
              src={element.src || "/placeholder.svg"}
              alt={element.alt}
              width={element.width}
              height={element.height}
              className={styles.floatingImage}
            />
          </div>
        ))}
      </div>

      {!showMessage ? (
        <div className={styles.albumCover}>
          <div className={`${styles.heartContainer} cursor-pointer`} onClick={toggleMessage}>
            <Heart size={150} fill="#9d4edd" color="#9d4edd" className={styles.heartBeat} />
          </div>

          <div className={styles.advisoryLogo}>
            <Image
              src="/romantic-advisory.png"
              alt="Romantic Content"
              width={120}
              height={80}
              className={styles.advisoryImage}
            />
          </div>
        </div>
      ) : (
        <div className={styles.messageContainer}>
          <button className={styles.closeButton} onClick={toggleMessage}>
            ×
          </button>

          <div className={styles.messageHeader}>
            <h2 className={styles.messageTitle}>Te amo mucho Nils tontito</h2>
            <div className={styles.messageTape}></div>
          </div>

          <div className={styles.polaroidContainer}>
            {images.map((src, index) => (
              <div
                key={index}
                className={`${styles.polaroid} ${index === activeImageIndex ? styles.activePolaroid : ""}`}
                style={{
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              >
                <div className={styles.polaroidInner}>
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Collage image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={styles.polaroidCaption}>
                  {index === 0 && "nosotros ♡"}
                  {index === 1 && "para siempre"}
                  {index === 2 && "juntos"}
                  {index === 3 && "mi amor"}
                  {index === 4 && "te amo"}
                </div>
              </div>
            ))}
          </div>

          <button ref={buttonRef} className={styles.specialButton} onClick={toggleModal}>
            <MessageCircleHeart className={styles.buttonIcon} />
            <span>Mensaje especial</span>
          </button>
        </div>
      )}

      {showModal && <MessageModal onClose={toggleModal} />}
    </div>
  )
}
