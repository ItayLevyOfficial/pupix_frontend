import {useVideoCallDoc} from '../userProfile/useVideoCallDoc'
import {useEffect} from 'react'

/**
 * Redirects the user to the video room if in progress video call document exists.
 *
 * @param uid: The creator firebase uid.
 * @param twitterUsername: The creator twitter username.
 */
export const useRedirectToVideoRoomIfExist = (uid, twitterUsername) => {
	const clientVideoCallDocument = useVideoCallDoc(
		{clientUid: uid, callStatuses: ['ready', 'pending', 'in-progress']})
	
	useEffect(() => {
		if (clientVideoCallDocument?.exists && !(localStorage.getItem(clientVideoCallDocument.ref.id))) {
			window.location.href = `/client-video-room/${clientVideoCallDocument.ref.id}/${twitterUsername}`
		}
	}, [twitterUsername, clientVideoCallDocument])
}