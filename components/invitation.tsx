'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Heart, Sparkles, Volume2, VolumeX, BookOpen, Music } from 'lucide-react'

export function Invitation() {
  const [step, setStep] = useState<'creation' | 'reveal' | 'celebrate'>('creation')
  const [hasOpened, setHasOpened] = useState(false) 
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  
  const handleStartExperience = () => {
    setHasOpened(true)
    if (audioRef.current && soundEnabled) {
      audioRef.current.play().catch(() => {})
    }
  }

  useEffect(() => {
    if (audioRef.current && hasOpened) {
      if (soundEnabled) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }, [soundEnabled, hasOpened])

  const handleOpenReveal = () => {
    setStep('reveal')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [accepted, setAccepted] = useState(false)

  const handleYes = () => {
    setSaveError('')
    setShowModal(true)
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = guestName.trim()
    if (!name) {
      setSaveError('Please tell me your name 🤍')
      return
    }
    setSaving(true)
    setSaveError('')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong.')
      }
      setAccepted(true)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (accepted) {
      setStep('celebrate')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleReadAgain = () => {
    setStep('creation')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="storybook-universe">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="music/theblessing.mp3"
        loop
        preload="auto"
      />

      {/* COVER / WELCOME OVERLAY  */}
      {!hasOpened && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md text-white p-6 text-center">
          <div className="max-w-md w-full bg-slate-800/80 border border-amber-200/30 p-8 rounded-2xl shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-100/10 flex items-center justify-center mb-4 text-amber-300 animate-pulse">
              <BookOpen size={32} />
            </div>
            <h2 className="text-2xl font-serif text-amber-100 mb-2">
              You’re Invited to a Story of God’s Wonderful Creation
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              A special message for someone special is inside.
            </p>
            <button
              type="button"
              onClick={handleStartExperience}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-200 to-amber-400 text-slate-950 font-semibold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Music size={18} />
              <span>Open</span>
            </button>
          </div>
        </div>
      )}

      {/* Sound Mute/Unmute button */}
      <button
        type="button"
        className={`sound-toggle-btn ${!soundEnabled ? 'muted' : ''}`}
        onClick={() => setSoundEnabled((prev) => !prev)}
        title={soundEnabled ? 'Music is on' : 'Music is muted'}
        aria-label={soundEnabled ? 'Mute music' : 'Unmute music'}
      >
        {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>{soundEnabled ? 'Music On' : 'Muted'}</span>
      </button>

      {/* Floating stars in celestial background */}
      <div className="floating-star star-one" aria-hidden="true">✦</div>
      <div className="floating-star star-two" aria-hidden="true">✧</div>
      <div className="floating-star star-three" aria-hidden="true">⋆</div>
      <div className="floating-star star-four" aria-hidden="true">✦</div>

      {/* Storybook Outer Frame */}
      <div className="storybook-wrapper">
        <div className="book-spine-accent" aria-hidden="true" />
        <div className="book-ribbon" aria-hidden="true">
          <span className="ribbon-tail" />
        </div>

        <div className="storybook-frame">
          <div className="book-gold-corners" aria-hidden="true" />

          {/* PAGE 1 — GOD’S WONDERFUL CREATION */}
          {step === 'creation' && (
            <article className="storybook-page page-creation" aria-labelledby="creation-title">
              <header className="page-chapter-header">
                <div className="chapter-badge">
                  <BookOpen size={13} />
                  <span>Chapter I</span>
                </div>
                <p className="story-eyebrow">A Little Story for Someone Special</p>
                <h1 id="creation-title" className="story-title">
                  God’s Wonderful<br /><em>Creation</em> 🌎☀️
                </h1>
              </header>

              <blockquote className="scripture-quote">
                “In the beginning, God created the heavens and the earth…”
              </blockquote>

              <div className="creation-animated-showcase" aria-label="Animated illustration of God's Creation">
                <div className="creation-sky">
                  <div className="sun-pulse-orb" />
                  <div className="creation-cloud c-1" />
                  <div className="creation-cloud c-2" />
                  <div className="twinkling-stars-row">
                    <span className="star-sparkle s1">✦</span>
                    <span className="star-sparkle s2">✧</span>
                    <span className="star-sparkle s3">⋆</span>
                    <span className="star-sparkle s4">✦</span>
                  </div>
                </div>

                <div className="creation-ocean">
                  <div className="wave wave-back" />
                  <div className="wave wave-front" />
                  <div className="swimming-fish f-1">🐟</div>
                  <div className="swimming-fish f-2">🐠</div>
                </div>

                <div className="creation-garden">
                  <div className="flower-item fl-1">
                    <span className="fl-stem" />
                    <span className="fl-bloom">🌸</span>
                  </div>
                  <div className="flower-item fl-2">
                    <span className="fl-stem" />
                    <span className="fl-bloom">🌼</span>
                  </div>
                  <div className="flower-item fl-3">
                    <span className="fl-stem" />
                    <span className="fl-bloom">🌷</span>
                  </div>
                  <div className="floating-petal p-1">🌸</div>
                  <div className="floating-petal p-2">🍃</div>
                </div>
              </div>

              <p className="story-text">
                He painted the skies with beautiful colors, made the flowers bloom, filled the oceans with life, and placed the stars in the night sky.
              </p>

              <p className="story-text highlight-lead">
                And among all the wonderful things He created, He gave Mommy and Daddy their most precious gift…
              </p>

              <div className="maki-gift-showcase">
                <div className="arrow-pointer-box" aria-hidden="true">
                  <div className="pointer-bubble">
                    <Sparkles size={13} />
                    <span>Yes, it&apos;s ME!</span>
                  </div>
                  <svg className="curved-bouncy-arrow" viewBox="0 0 100 80" fill="none">
                    <path
                      d="M20,15 C45,8 75,25 65,62"
                      stroke="#f1cf98"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="4 3"
                    />
                    <polygon points="56,56 66,72 74,56" fill="#f1cf98" />
                  </svg>
                </div>

                <div className="maki-portrait-card">
                  <div className="photo-halo-glow" aria-hidden="true" />
                  <div className="maki-photo-frame">
                    <img
                      src="/images/baby-photo.png"
                      alt="Baby Makarius smiling happily"
                    />
                  </div>
                  <div className="maki-nameplate">
                    <span className="nameplate-tag">ME! 🧸🤍</span>
                    <span className="nameplate-name">Baby Makarius Kleon</span>
                  </div>
                </div>
              </div>

              <p className="story-text">
                I’m just a little one discovering this big, beautiful world that God made. And as I grow, I know He has so many wonderful things planned for me.
              </p>

              <p className="story-text">
                But today, I have a little something prepared for someone who holds a special place in my story…
              </p>

              <div className="surprise-teaser-card">
                <p className="surprise-lead">Are you ready for a little surprise? ✨</p>
                <p className="surprise-sub">There’s something I’d really love to ask you!</p>
              </div>

              <button
                type="button"
                className="action-button surprise-button"
                onClick={handleOpenReveal}
              >
                A Little Surprise Awaits <ArrowRight data-icon="inline-end" />
              </button>
            </article>
          )}

          {/* PAGE 2 — THE BIG REVEAL */}
          {step === 'reveal' && (
            <article className="storybook-page page-reveal" aria-labelledby="reveal-title">
              <header className="page-chapter-header">
                <div className="chapter-badge">
                  <Sparkles size={13} />
                  <span>Chapter II</span>
                </div>
                <p className="story-eyebrow">A Special Question</p>
                <h1 id="reveal-title" className="reveal-title">
                  I Have a Special<br /><em>Question for You</em> 🤍
                </h1>
              </header>

              <p className="story-text">
                God has blessed me with the gift of life, a loving family, and a beautiful world to grow up in. And I believe that one of His sweetest blessings is the people He places in my life to love me, pray for me, and guide me closer to Him.
              </p>

              <p className="story-text">
                Mommy and Daddy have someone very special in mind… someone they would love to be part of my journey as I grow in faith and discover God’s wonderful plans for me.
              </p>

              <div className="someone-badge-glow" aria-label="And that someone is YOU!">
                <span className="glow-star">✨</span>
                <span>And that someone is YOU!</span>
                <span className="glow-star">✨</span>
              </div>

              <div className="proposal-plaque">
                <div className="plaque-baby-avatar">
                  <img src="/images/baby-photo.png" alt="Baby Maki" />
                </div>

                <div className="question-block">
                  <p className="question-kicker">With all my tiny heart...</p>
                  <h2 className="question-headline">
                    Will You Be My<br />
                    <em className="ninong-text">Ninang/Ninong?</em> 
                  </h2>
                  <p className="question-description">
                    Will you be one of the special people who will pray for me, cheer for my little milestones, guide me in God’s ways, and remind me of His unfailing love throughout my life?
                  </p>
                </div>

                <blockquote className="verse-ribbon">
                  <p className="verse-quote">“Every good and perfect gift is from above.”</p>
                  <cite className="verse-ref">— James 1:17</cite>
                </blockquote>
              </div>

              <button
                type="button"
                className="action-button yes-button bounce-subtle"
                onClick={handleYes}
              >
                <Sparkles data-icon="inline-start" /> YES! I’D LOVE TO! 🤍 <Sparkles data-icon="inline-end" />
              </button>
            </article>
          )}

          {/* PAGE 3 — THANK YOU MESSAGE */}
          {step === 'celebrate' && (
            <article className="storybook-page page-celebrate" aria-labelledby="thanks-title">
              <div className="celebration-badge-sun" aria-hidden="true">
                <Heart className="celebration-heart-svg" />
              </div>

              <header className="page-chapter-header">
                <p className="story-eyebrow">My Heart Is Overflowing</p>
                <h1 id="thanks-title" className="thanks-title">
                  Thank you, <br />
                  <em>Ninang/Ninong</em>
                </h1>
              </header>

              <div className="thanks-parchment-box">
                <p className="thanks-main-text">
                  Yaaay! I can’t wait to make beautiful memories with you! Thank you for being part of God’s wonderful story for me. 🌎
                </p>

                <div className="heart-row" aria-hidden="true">
                  <Heart />
                  <Heart />
                  <Heart />
                </div>

                <div className="thanks-signature-block">
                  <span className="signature-salutation">With all my love,</span>
                  <strong className="signature-name">Baby Maki ♡</strong>
                </div>
              </div>

              <button
                type="button"
                className="replay-book-button"
                onClick={handleReadAgain}
              >
                <BookOpen size={14} />
                <span>Read Our Story Again</span>
              </button>
            </article>
          )}

          {showModal && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182824]/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
              role="dialog"
              aria-modal="true"
              aria-labelledby="rsvp-title"
            >
              <div className="relative w-full max-w-md rounded-3xl border border-[#e2c48f] bg-gradient-to-b from-[#fffdf9] to-[#f6f1e9] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
                {!accepted ? (
                  <form onSubmit={handleConfirm} className="flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e2c48f]/30 text-[#ad7658]">
                      <Heart className="h-8 w-8" fill="currentColor" />
                    </div>
                    <h2 id="rsvp-title" className="font-serif text-2xl text-[#263936]">
                      Yay! One last thing…
                    </h2>
                    <p className="text-sm text-[#65716c]">
                      Please write your name so Baby Maki knows who said yes. 🤍
                    </p>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      maxLength={100}
                      autoFocus
                      placeholder="Your name"
                      className="w-full rounded-xl border border-[#d8d8ca] bg-white px-4 py-3 text-center text-[#263936] outline-none focus:ring-2 focus:ring-[#c2a777]"
                    />
                    {saveError && <p className="text-sm text-[#ad7658]">{saveError}</p>}
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full rounded-full bg-[#e2c48f] px-6 py-3 font-bold text-[#273d39] shadow-md transition hover:bg-[#f0d8ae] disabled:opacity-60"
                    >
                      {saving ? 'Saving…' : 'Confirm my YES 💖'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      disabled={saving}
                      className="text-xs text-[#65716c] underline"
                    >
                      Not yet
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e2c48f]/30 text-[#ad7658] animate-pulse">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h2 id="rsvp-title" className="font-serif text-2xl text-[#263936]">
                      Thank you, {guestName.trim()}!
                    </h2>
                    <p className="text-[#65716c]">
                      Your YES has made my little heart so happy. Thank you for being part of God’s wonderful story for me. I can’t wait to make beautiful memories with you! 🌎
                    </p>
                    <div className="flex gap-2 text-[#ad7658]" aria-hidden="true">
                      <Heart fill="currentColor" /><Heart fill="currentColor" /><Heart fill="currentColor" />
                    </div>
                    <p className="font-serif text-[#263936]">With all my love, Baby Maki ♡</p>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full rounded-full bg-[#e2c48f] px-6 py-3 font-bold text-[#273d39] shadow-md transition hover:bg-[#f0d8ae]"
                    >
                      Continue 🤍
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <footer className="book-page-footer">
            <span className="page-dot">❦</span>
            <span className="page-footer-note">Makarius’ Story of God's Wonderful Creation</span>
            <span className="page-dot">❦</span>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Invitation


 /* =========================================================================
   * WEB AUDIO SYNTHESIS EFFECTS
   * =========================================================================
  
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Soft page flip sound with Web Audio
  const playPageTurn = useCallback(() => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx()
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const now = ctx.currentTime
      const bufferSize = Math.floor(ctx.sampleRate * 0.22)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.06))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, now)
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.2)
      filter.Q.value = 1.2

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      noise.start(now)
      noise.stop(now + 0.23)
    } catch {
      // Graceful audio fallback
    }
  }, [soundEnabled])

  // Synthesize realistic drumroll + cymbal / celebration fanfare with Web Audio API
  const playDrumroll = useCallback(() => {
    if (!soundEnabled) return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const now = ctx.currentTime
      const duration = 2.4 // 2.4 seconds drumroll
      const totalHits = 44

      for (let i = 0; i < totalHits; i++) {
        const progress = i / totalHits
        const time = now + Math.pow(progress, 1.1) * duration
        const hitGain = 0.08 + Math.pow(progress, 1.8) * 0.42

        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(140 + progress * 35, time)
        osc.frequency.exponentialRampToValueAtTime(70, time + 0.045)

        oscGain.gain.setValueAtTime(hitGain, time)
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

        osc.connect(oscGain)
        oscGain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.055)

        const bufferSize = Math.floor(ctx.sampleRate * 0.035)
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        for (let s = 0; s < bufferSize; s++) {
          output[s] = Math.random() * 2 - 1
        }
        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = noiseBuffer

        const filter = ctx.createBiquadFilter()
        filter.type = 'highpass'
        filter.frequency.value = 1000

        const noiseGain = ctx.createGain()
        noiseGain.gain.setValueAtTime(hitGain * 0.7, time)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.035)

        whiteNoise.connect(filter)
        filter.connect(noiseGain)
        noiseGain.connect(ctx.destination)

        whiteNoise.start(time)
        whiteNoise.stop(time + 0.04)
      }

      const crashTime = now + duration
      const kickOsc = ctx.createOscillator()
      const kickGain = ctx.createGain()
      kickOsc.type = 'sine'
      kickOsc.frequency.setValueAtTime(160, crashTime)
      kickOsc.frequency.exponentialRampToValueAtTime(45, crashTime + 0.35)
      kickGain.gain.setValueAtTime(0.7, crashTime)
      kickGain.gain.exponentialRampToValueAtTime(0.001, crashTime + 0.38)
      kickOsc.connect(kickGain)
      kickGain.connect(ctx.destination)
      kickOsc.start(crashTime)
      kickOsc.stop(crashTime + 0.4)

      const cymbalSize = Math.floor(ctx.sampleRate * 1.2)
      const cymbalBuffer = ctx.createBuffer(1, cymbalSize, ctx.sampleRate)
      const cymbalData = cymbalBuffer.getChannelData(0)
      for (let s = 0; s < cymbalSize; s++) {
        cymbalData[s] = Math.random() * 2 - 1
      }
      const cymbalSource = ctx.createBufferSource()
      cymbalSource.buffer = cymbalBuffer

      const cymbalFilter = ctx.createBiquadFilter()
      cymbalFilter.type = 'highpass'
      cymbalFilter.frequency.value = 4500

      const cymbalGain = ctx.createGain()
      cymbalGain.gain.setValueAtTime(0.45, crashTime)
      cymbalGain.gain.exponentialRampToValueAtTime(0.001, crashTime + 1.1)

      cymbalSource.connect(cymbalFilter)
      cymbalFilter.connect(cymbalGain)
      cymbalGain.connect(ctx.destination)

      cymbalSource.start(crashTime)
      cymbalSource.stop(crashTime + 1.2)
    } catch {
      // Audio autoplay gracefully handled
    }
  }, [soundEnabled])

  // Soft celebration chime when clicking YES
  const playCelebration = useCallback(() => {
    if (!soundEnabled) return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const notes = [523.25, 659.25, 783.99, 1046.5]
      const now = ctx.currentTime
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.12
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, time)

        gain.gain.setValueAtTime(0.28, time)
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.95)
      })
    } catch {
      // Graceful fallback
    }
  }, [soundEnabled])
  ========================================================================= */
