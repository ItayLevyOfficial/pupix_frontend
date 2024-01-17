import React, {useEffect, useRef} from 'react'
import {attachTrack} from './videoRoomVideo'

export const VideoRoomAudio = ({audioTrack}) => {
	const audioRef = useRef()
	
	/**
	 * Attach the audio track to the DOM.
	 */
	useEffect(() => {
		return attachTrack({track: audioTrack, trackRef: audioRef})
	}, [audioTrack])
	
	return <audio ref={audioRef}/>
}