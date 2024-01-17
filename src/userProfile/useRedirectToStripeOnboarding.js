import {useState} from 'react'
import firebase from 'firebase/app'
import 'firebase/functions'

export const useRedirectToStripeOnboarding = () => {
	const [redirecting, setRedirecting] = useState(false)
	
	const redirectToStripe = async () => {
		try {
			setRedirecting(true)
			const {data: stripeExistOnboardingUrl} = await firebase.functions()
				.httpsCallable('createStripeOnboardingUrl')()
			if (stripeExistOnboardingUrl) {
				window.location.href = stripeExistOnboardingUrl
			} else {
				setRedirecting(false)
			}
		} catch (error) {
			setRedirecting(false)
		}
	}
	
	return [redirectToStripe, redirecting]
}