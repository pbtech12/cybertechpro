'use client'
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerInterface {
  src: string
  thumbnail?: string
  active: boolean
}

export const VideoPlayer = forwardRef(({ src, thumbnail, active }: VideoPlayerInterface, ref) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerRef = useRef<any>(null)
  const [isDomReady, setIsDomReady] = useState(false)

  const options = {
    fluid: true,
    sources: [{ src, type: 'video/mp4' }],
    poster: thumbnail,
  }

  useEffect(() => {
    setIsDomReady(true)
  }, [])

  useEffect(() => {
    if (isDomReady && videoRef.current && active) {
      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, options)
      }
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [isDomReady, src, active])

  // 👇 expose a function to parent
  useImperativeHandle(ref, () => ({
    disposePlayer() {
      if (playerRef.current) {
        playerRef.current.pause()
        playerRef.current.dispose()
        playerRef.current = null
      }
    },
  }))

  return (
    <div data-vjs-player className="video-container">
      {isDomReady && (
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
        />
      )}
    </div>
  )
})
VideoPlayer.displayName = 'VideoPlayer'
