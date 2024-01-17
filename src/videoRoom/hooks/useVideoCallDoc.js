import {useDocument} from 'react-firebase-hooks/firestore'
import {videoCallDocRef} from '../../generalHelpers/firestorePaths'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

export const useVideoCallDoc = (roomId) => {
	const [videoCallDoc, loading, error] = useDocument(videoCallDocRef(roomId))
	const router = useRouter()
	
	useEffect(() => {
		if (error?.code === 'permission-denied') {
			// router.replace('/login')
		}
	}, [router, error])
	
	return videoCallDoc
}