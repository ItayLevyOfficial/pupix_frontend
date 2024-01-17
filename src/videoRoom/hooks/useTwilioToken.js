import {useCurrentFirebaseUser} from '../../generalHelpers/firebaseUserHook'
import {useEffect, useState} from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const useTwilioToken = (videoRoomId) => {
	const currentUser = useCurrentFirebaseUser()
	const [twilioToken, setTwilioToken] = useState()
	
	useEffect(() => {
		if (currentUser && videoRoomId) {
			return firebase.firestore().collection('twilioTokens')
				.where('uid', '==', currentUser.uid)
				.where('videoRoomId', '==', videoRoomId)
				.onSnapshot(snapshot => {
					const newTwilioToken = snapshot.docs[0]?.data()?.twilioToken
					if (newTwilioToken) {
						setTwilioToken(newTwilioToken)
					}
				})
		}
	}, [currentUser, videoRoomId])
	
	return twilioToken
}