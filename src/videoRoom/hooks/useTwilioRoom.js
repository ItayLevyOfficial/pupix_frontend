import {useEffect, useState} from 'react'
import {connect, createLocalTracks, isSupported} from 'twilio-video'
import {environment} from '../../generalHelpers/constants'

const audioConstraints = !(['testing', 'staging'].includes(environment))

export const videoConstraints = {
	width: {
		min: 320,
		ideal: 1280
	},
	height: {
		min: 240,
		ideal: 720
	}, facingMode: 'user', frameRate: {min: 10, ideal: 40}
}

export function useTwilioRoom({twilioToken, roomId, connectWithoutVideo = false, handlePermissionsDenied}) {
	const [room, setRoom] = useState(null)
	
	useEffect(() => {
		async function connectToRoom() {
			if (isSupported) {
				try {
					const tracks = await createLocalTracks({audio: audioConstraints, video: videoConstraints})
					const twilioRoom = await connect(twilioToken,
						{name: roomId, tracks: tracks, maxAudioBitrate: 16000})
					setRoom(twilioRoom)
				} catch (error) {
					if (error.name === 'NotAllowedError') {
						if (connectWithoutVideo) {
							const twilioRoom = await connect(twilioToken, {name: roomId, video: false, audio: false})
							setRoom(twilioRoom)
						} else {
							handlePermissionsDenied()
						}
					}
				}
			}
		}
		
		if (twilioToken && roomId) {
			connectToRoom()
		}
	}, [twilioToken, roomId, connectWithoutVideo, handlePermissionsDenied])
	
	return [room, setRoom]
}