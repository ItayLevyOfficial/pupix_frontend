import {useCallback, useEffect, useState} from 'react'
import {getVideoTrack} from '../videoRoomVideo'

export const useRemoteTrack = (remoteParticipant, kind = 'video') => {
	const [remoteTrack, setRemoteTrack] = useState(null)
	const updateTrack = useCallback(newTrack => {
		if (newTrack?.kind === kind) {
			setRemoteTrack(newTrack)
		}
	}, [kind])
	
	const removeTrack = useCallback(trackPublication => {
		if (trackPublication.kind === kind) {
			setRemoteTrack(null)
		}
	}, [kind])
	
	useEffect(() => {
		if (remoteParticipant) {
			setRemoteTrack(getVideoTrack(remoteParticipant))
		}
	}, [remoteParticipant])
	
	useEffect(() => {
		if (remoteParticipant) {
			remoteParticipant.on('trackPublished', updateTrack)
			remoteParticipant.on('trackStarted', updateTrack)
			remoteParticipant.on('trackSubscribed', updateTrack)
			remoteParticipant.on('switchedOff', updateTrack)
			remoteParticipant.on('switchedOn', updateTrack)
			remoteParticipant.on('trackUnpublished', removeTrack)
			remoteParticipant.on('trackUnsubscribed', removeTrack)
			
			return () => {
				remoteParticipant.removeListener('trackPublished', updateTrack)
				remoteParticipant.removeListener('trackStarted', updateTrack)
				remoteParticipant.removeListener('trackSubscribed', updateTrack)
				remoteParticipant.removeListener('switchedOff', updateTrack)
				remoteParticipant.removeListener('switchedOn', updateTrack)
				remoteParticipant.removeListener('trackUnpublished', removeTrack)
				remoteParticipant.removeListener('trackUnsubscribed', removeTrack)
			}
		}
	}, [remoteParticipant, remoteTrack, removeTrack, updateTrack])
	
	return [remoteTrack, setRemoteTrack]
}

