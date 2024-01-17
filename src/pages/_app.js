import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-phone-input-2/lib/bootstrap.css'
import 'typeface-roboto'
import '../index.css'
import React, {useEffect, useState} from 'react'
import {environment, firebaseProjectId, stripePublicKey} from '../generalHelpers/constants'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'
import * as MobileDetect from 'mobile-detect'
import {OnlyMobileBrowsersSupported} from '../errorPages/onlyMobileBrowsersSupported'
import {Router} from 'next/router'
import {LogoLoadingScreen} from '../generalComponents/logoLoadingScreen'
import Head from 'next/head'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js/pure'

if (!firebase.apps.length) {
	const firebaseConfig = {
		apiKey: environment === 'live' ? 'AIzaSyBHHTXVR_6npFP8asnf5WrkDFt8II6KU1k' :
			'AIzaSyAyL1I-M9DYFH_CwOc1GtWKQs9m2n8w0AM',
		authDomain: `${firebaseProjectId}.firebaseapp.com`,
		projectId: firebaseProjectId,
		storageBucket: `${firebaseProjectId}.appspot.com`,
		appId: environment === 'live' ? '1:564176693174:web:eebbc97476fb64b1564317' :
			'1:963909314549:web:90887254020ef71ac0a2bc'
	}
	
	firebase.initializeApp(firebaseConfig)
	
	if (environment === 'testing') {
		firebase.functions().useEmulator('localhost', 5001)
		firebase.auth().useEmulator('http://localhost:9099/')
		firebase.firestore().useEmulator('localhost', 8080)
		firebase.storage().useEmulator('localhost', 9199)
	}
}

const stripePromise = loadStripe(stripePublicKey)

function MyApp({Component, pageProps}) {
	const [loading, setLoading] = useState()
	const [isMobile, setIsMobile] = useState(true)
	
	useEffect(() => {
		const md = new MobileDetect(window.navigator.userAgent)
		if (!md.mobile()) {
			setIsMobile(false)
		}
	}, [])
	
	useEffect(() => {
		const start = () => setLoading(true)
		const end = () => setLoading(false)
		
		Router.events.on('routeChangeStart', start)
		Router.events.on('routeChangeComplete', end)
		Router.events.on('routeChangeError', end)
		
		return () => {
			Router.events.off('routeChangeStart', start)
			Router.events.off('routeChangeComplete', end)
			Router.events.off('routeChangeError', end)
		}
	}, [])
	
	const getComponent = () => {
		if (isMobile) {
			if (loading) {
				return <LogoLoadingScreen/>
			} else {
				return <Component {...pageProps}/>
			}
		} else {
			return <OnlyMobileBrowsersSupported/>
		}
	}
	
	return (
		<Elements stripe={stripePromise}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
				<title>
					Pupik
				</title>
			</Head>
			{getComponent()}
		</Elements>
	)
}

export default MyApp