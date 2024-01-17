import {useAuthState} from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import {useEffect} from 'react'

/**
 * Login anonymously to firebase if no current user is signed in.
 */
export const useAnonymousUser = () => {
	const [user, loading] = useAuthState(firebase.auth())
	
	useEffect(() => {
		if (!user && !loading) {
			firebase.auth().signInAnonymously()
		}
	}, [loading, user])
	
	return user
}