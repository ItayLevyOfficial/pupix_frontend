import {useEffect, useState} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

export function useCurrentFirebaseUser() {
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		return firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setUser(user)
			}
		})
	}, [])
	
	return user
}