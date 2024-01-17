import React, {useEffect} from 'react'
import {LogoLoadingScreen} from '../generalComponents/logoLoadingScreen'
import firebase from 'firebase/app'
import 'firebase/functions'
import {useRouter} from 'next/router'
import {NextSeo} from 'next-seo'

export const StripeRefreshUrl = (props) => {
	const router = useRouter()
	useEffect(() => {
		firebase.functions().httpsCallable('createStripeOnboardingUrl')()
			.then(({data: stripeOnboardingUrl}) => {
				if (stripeOnboardingUrl) {
					window.location.replace(stripeOnboardingUrl)
				} else {
					router.replace('/user-profile')
				}
			})
			.catch(() => {
				router.replace('/user-profile')
			})
	}, [router])
	
	return (
		<>
			<NextSeo noindex/>
			<LogoLoadingScreen loadingText='Redirecting...'/>
		</>
	)
}

export default StripeRefreshUrl