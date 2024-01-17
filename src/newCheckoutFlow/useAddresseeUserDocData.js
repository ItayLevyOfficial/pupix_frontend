import firebase from 'firebase/app'
import 'firebase/firestore'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

/**
 * Returns the addressee user document for the given twitter username.
 */
export const useAddresseeData = (addresseeTwitterUsername) => {
	const [addresseeUserDocData, setAddresseeUserDocData] = useState()
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	
	useEffect(() => {
		if (addresseeTwitterUsername) {
			firebase.firestore().collection('users')
				.where('twitterUsername', '==', addresseeTwitterUsername)
				.onSnapshot(snapshot => {
					const newAddresseeUserDoc = snapshot.docs[0]
					if (newAddresseeUserDoc?.exists) {
						setAddresseeUserDocData({...newAddresseeUserDoc.data(), id: newAddresseeUserDoc.id})
					}
					setLoading(false)
				})
		}
	}, [addresseeTwitterUsername, router])
	
	return [addresseeUserDocData, loading]
}