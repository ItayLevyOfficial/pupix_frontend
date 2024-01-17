import React, {useCallback, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {DisabledVideoScreen} from './disabledVideoScreen'

// noinspection CssInvalidPseudoSelector
const FillAvailableSpaceVideo = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  &::-webkit-media-controls {
    display: none !important;
  }
`

export const getVideoTrack = (participant) => {
	return participant?.videoTracks?.values()?.next()?.value?.track
}

export const isValidVideoTrack = videoTrack => videoTrack && !videoTrack.isSwitchedOff && !videoTrack.isStopped

export const attachTrack = ({track, trackRef}) => {
	if (track?.attach) {
		track.attach(trackRef.current)
	}
}

export const VideoRoomVideo = ({videoTrack}) => {
	const videoRef = useRef()
	
	const attachVideoTrackIfValid = useCallback(() => {
		if (isValidVideoTrack(videoTrack)) {
			attachTrack({track: videoTrack, trackRef: videoRef})
		}
	}, [videoTrack])
	
	useEffect(() => {
		attachVideoTrackIfValid()
		
		// Attaching the video again so the video will get attached for sure
		const timeoutId = setTimeout(attachVideoTrackIfValid, 2_000)
		return () => clearTimeout(timeoutId)
	}, [attachVideoTrackIfValid])
	
	try {
		return videoTrack && !videoTrack.isSwitchedOff && !videoTrack.isStopped ?
			<FillAvailableSpaceVideo ref={videoRef} muted/> : <DisabledVideoScreen/>
	} catch (e) {
		return <DisabledVideoScreen/>
	}
	
}