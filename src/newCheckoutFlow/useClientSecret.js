import {useEffect, useState} from 'react'
import firebase from 'firebase/app'
import 'firebase/functions'

/**
 * Generates the stripe client secret, according to the addressee data and the call length. Updates the client
 * secret whenever the video call length changes.
 */
export const useClientSecret = (checkoutLevel, currentUser, videoCallLength, addresseeData) => {
	const [clientSecret, setClientSecret] = useState()
	const [paymentCallLength, setPaymentCallLength] = useState(0)
	
	/**
	 * Create the payment intent after the video call length is chosen.
	 */
	useEffect(() => {
		if (checkoutLevel > 0 && currentUser && videoCallLength !== paymentCallLength && addresseeData?.id) {
			setPaymentCallLength(videoCallLength)
			firebase.app().functions()
				.httpsCallable('createPaymentIntent')(
					{addresseeUid: addresseeData.id, callLength: videoCallLength})
				.then(response => {
					if (response.data) {
						setClientSecret(response.data)
					} else {
						// Need it so the payment will fail when the creator try to call himself.
						setClientSecret('AAA')
					}
				})
		}
	}, [addresseeData?.id, checkoutLevel, currentUser, paymentCallLength, videoCallLength])
	
	return clientSecret
}