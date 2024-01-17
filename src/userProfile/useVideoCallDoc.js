import firebase from 'firebase/app'
import 'firebase/firestore'

/**
 * @param clientUid {string}: The client uid. Keep null when using the hook as the creator.
 * @param creatorUid {string}: The creator uid. Keep null when using the hook as the client.
 * @param callStatuses {Array<string>}: An array of the statuses you want the call to have one of.
 *
 * @return The video call document if one exists, null otherwise.
 */
import {useEffect, useState} from 'react'

export const useVideoCallDoc = ({clientUid, creatorUid, callStatuses}) => {
	const [videoCallDoc, setVideoCallDoc] = useState()
	
	useEffect(() => {
		if (callStatuses && (creatorUid || clientUid)) {
			return firebase.firestore().collection('videoCalls')
				.where(clientUid ? 'clientUid' : 'addresseeUid', '==', clientUid ?? creatorUid)
				.where('status', 'in', callStatuses)
				.where('roomCreationTime', '>', Date.now() - (60_000 * 30))
				.onSnapshot(snapshot => {
					const newVideoCallDoc = snapshot?.docs[0]
					if (newVideoCallDoc) {
						setVideoCallDoc(newVideoCallDoc)
					} else {
						setVideoCallDoc(null)
					}
				})
		}
	}, [clientUid, creatorUid, callStatuses])
	
	return videoCallDoc
}