import {useState} from 'react'
import firebase from 'firebase/app'
import 'firebase/functions'

export const useRedirectToStripeDashboard = () => {
	const [redirecting, setRedirecting] = useState(false)
	
	const redirectToStripe = async () => {
		setRedirecting(true)
		try {
			const {data: stripeDashboardUrl} = await firebase.functions().httpsCallable('createStripeDashboardUrl')()
			if (stripeDashboardUrl) {
				window.location.href = stripeDashboardUrl
			} else {
				setRedirecting(false)
			}
		} catch (error) {
			setRedirecting(false)
		}
	}
	
	return [redirectToStripe, redirecting]
}