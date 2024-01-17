import {useEffect} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import {userDocRef, userPIDocRef} from '../generalHelpers/firestorePaths'
import {useRouter} from 'next/router'

export const isFinishedRegistration = (userPIDocData, userDocData) => {
	return userDocData?.minuteWage && userPIDocData?.phoneNumber
}

/**
 * Redirect the user to the login page if the user not exist or if the user is anonymous. (a.k.a has no user document).
 */
export const useRedirectToLoginIfNeeded = () => {
	const router = useRouter()
	
	useEffect(() => {
		return firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				if (user?.isAnonymous) {
					router.replace('/login')
				} else {
					const userPIDoc = await userPIDocRef(user.uid).get()
					const userDoc = await userDocRef(user.uid).get()
					if (!isFinishedRegistration(userPIDoc?.data(), userDoc?.data())) {
						router.replace('/login',)
					}
				}
			} else {
				router.replace('/login',)
			}
		})
	}, [router])
}