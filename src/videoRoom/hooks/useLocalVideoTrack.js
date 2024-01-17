import {useCallback, useEffect, useState} from 'react'
import {createLocalVideoTrack} from 'twilio-video'
import {videoConstraints} from './useTwilioRoom'
import {getVideoTrack} from '../videoRoomVideo'

export const useLocalVideoTrack = (localParticipant) => {
	const [isFirstRun, setIsFirstRun] = useState(true)
	const [localVideoTrack, setLocalVideoTrack] = useState(null)
	const [facingMode, setFacingMode] = useState('user')
	
	const disableLocalVideoTrack = useCallback(async () => {
		if (localParticipant && localVideoTrack) {
			setLocalVideoTrack(null)
		}
	}, [localParticipant, localVideoTrack])
	
	const enableLocalVideoTrack = useCallback(async () => {
		if (localParticipant && !localVideoTrack) {
			const newLocalVideoTrack = await createLocalVideoTrack(videoConstraints)
			await localParticipant.publishTrack(newLocalVideoTrack)
			setLocalVideoTrack(newLocalVideoTrack)
		}
	}, [localParticipant, localVideoTrack])
	
	const unpublishLocalTrack = useCallback(async () => {
		const currentLocalTrack = getVideoTrack(localParticipant)
		if (currentLocalTrack) {
			if (currentLocalTrack) {
				await currentLocalTrack.stop()
				await localParticipant.unpublishTrack(currentLocalTrack)
			}
		}
	}, [localParticipant])
	
	const flipCamera = useCallback(async () => {
		setLocalVideoTrack(null)
		await unpublishLocalTrack()
		const newFacingMode = facingMode === 'user' ? 'environment' : 'user'
		const newVideoTrack = await createLocalVideoTrack({...videoConstraints, facingMode: newFacingMode})
		setFacingMode(newFacingMode)
		await localParticipant.publishTrack(newVideoTrack)
		setLocalVideoTrack(newVideoTrack)
	}, [facingMode, localParticipant, unpublishLocalTrack])
	
	/**
	 * Unpublish the local video track if the local video track changes.
	 */
	useEffect(() => {
		if (!localVideoTrack && !isFirstRun) {
			unpublishLocalTrack()
		}
	}, [isFirstRun, localParticipant, localVideoTrack, unpublishLocalTrack])
	
	
	useEffect(() => {
		if (localParticipant && !localVideoTrack && isFirstRun) {
			const newLocalVideoTrack = getVideoTrack(localParticipant)
			if (newLocalVideoTrack) {
				setLocalVideoTrack(newLocalVideoTrack)
			}
			setIsFirstRun(false)
		}
	}, [localParticipant, isFirstRun, localVideoTrack])
	
	useEffect(() => {
		const visibilityChangeListener = () => {
			if (document.visibilityState === 'hidden') {
				disableLocalVideoTrack()
			} else {
				enableLocalVideoTrack().catch(() => {})
			}
		}
		
		document.addEventListener('visibilitychange', visibilityChangeListener)
		return () => document.removeEventListener('visibilitychange', visibilityChangeListener)
	}, [disableLocalVideoTrack, enableLocalVideoTrack])
	
	return [localVideoTrack, flipCamera, enableLocalVideoTrack, disableLocalVideoTrack]
}