import {useEffect, useState} from 'react'

export const useRemoteParticipant = (room) => {
	const [remoteParticipant, setRemoteParticipant] = useState(room?.participants?.values()?.next()?.value)
	const [reconnectionTime, setReconnectionTime] = useState(null)
	
	/**
	 * Sets the remote participant in the first connection to the room.
	 */
	useEffect(() => {
		// Need to make sure there is no remote participant already to not update it after a new connection to the
		// room, because this will change the remote participant state to connected.
		if (room && !remoteParticipant) {
			const newRemoteParticipant = room?.participants?.values()?.next()?.value
			if (newRemoteParticipant) {
				setRemoteParticipant(newRemoteParticipant)
			}
		}
	}, [remoteParticipant, room])
	
	/**
	 * Add a listener for when the remote participant gets connected to the room.
	 */
	useEffect(() => {
		if (room) {
			const handleParticipantConnected = newParticipant => {
				setRemoteParticipant(newParticipant)
				setReconnectionTime(null)
			}
			room.on('participantConnected', handleParticipantConnected)
			return () => room.removeListener('participantConnected', handleParticipantConnected)
		}
	}, [room])
	
	/**
	 * Add listeners for the reconnecting and reconnected events of the video room.
	 */
	useEffect(() => {
		if (remoteParticipant) {
			const reconnectingListener = () => setReconnectionTime(Date.now())
			const reconnectedListener = () => setReconnectionTime(null)
			remoteParticipant.on('reconnecting', reconnectingListener)
			remoteParticipant.on('reconnected', reconnectedListener)
			return () => {
				remoteParticipant.removeListener('reconnecting', reconnectingListener)
				remoteParticipant.removeListener('reconnected', reconnectedListener)
			}
		}
	}, [remoteParticipant])
	
	
	return [remoteParticipant, reconnectionTime]
}