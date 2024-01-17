import React, {useEffect, useState} from 'react'
import {useHistoryState} from '../generalHelpers/useHistoryState'
import {TopPupikBar} from './TopPupikBar'
import {Column} from '../generalComponents/containers'
import styled from 'styled-components'
import {VideoCallLength} from './videoCallLength'
import {SecureLoginPage} from './secureLoginPage'
import {CheckoutPage} from './checkoutScreen/checkout'
import {useAddresseeData} from './useAddresseeUserDocData'
import 'firebase/functions'
import {useAnonymousUser} from './useAnonymousUser'
import {useElements, useStripe} from '@stripe/react-stripe-js'
import {NextSeo} from 'next-seo'
import {UserNotFound} from '../errorPages/userNotFound'
import {useRouter} from 'next/router'
import {PupikFooter} from '../generalComponents/pupikFooter'
import {useRedirectToVideoRoomIfExist} from './useRedirectToVideoRoom'
import {useClientSecret} from './useClientSecret'
import {calculateStripeFee} from './checkoutScreen/checkoutScreenHelpers'
import {usePaymentRequest} from './usePaymentRequest'

export const checkoutSlideAnimationDuration = '1.2s'

const AnimatedRow = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: hidden;
  transition: ${props => props.isBackMove ? 'none' : `transform ${checkoutSlideAnimationDuration}`};
  transform: translateX(-${props => props.level * 100}vw);
  align-self: flex-start;
`

export const NewCheckoutFlow = () => {
	const [checkoutLevel, setCheckoutLevel, isBackMove] = useHistoryState(0, true)
	const router = useRouter()
	const {addresseeTwitterUsername} = router.query
	const [addresseeData, loadingAddresseeData] = useAddresseeData(addresseeTwitterUsername)
	const [videoCallLength, setVideoCallLength] = useState(8)
	const currentUser = useAnonymousUser()
	const clientSecret = useClientSecret(checkoutLevel, currentUser, videoCallLength, addresseeData)
	const stripe = useStripe()
	const elements = useElements()
	const handleVideoCallLengthSelection = value => setVideoCallLength(value)
	const [loadingCardPayment, setLoadingCardPayment] = useState(false)
	const [cardPaymentError, setCardPaymentError] = useState(false)
	useRedirectToVideoRoomIfExist(currentUser?.uid, addresseeTwitterUsername)
	
	const originalCallPrice = addresseeData?.minuteWage ? addresseeData.minuteWage * videoCallLength : null
	const callPriceWithFee = originalCallPrice ? originalCallPrice + calculateStripeFee(originalCallPrice) : null
	const [paymentRequest, enabledPaymentMethods, loadingActualPayment, googlePaymentFailed] = usePaymentRequest(
		Math.ceil(callPriceWithFee * 100), addresseeTwitterUsername, clientSecret)
	const [selectedPaymentOption, setSelectedPaymentOption] = useState('card')
	
	const handleCardPaymentError = () => {
		setCardPaymentError(true)
		setLoadingCardPayment(false)
	}
	
	/**
	 * Submits the client payment after he finished the checkout flow.
	 */
	useEffect(() => {
		const authorizeCardPayment = async () => {
			try {
				const cardElement = elements.getElement('card')
				const paymentMethod = await stripe.createPaymentMethod({type: 'card', card: cardElement})
				if (paymentMethod?.paymentMethod?.card?.three_d_secure_usage?.supported) {
					const resp = await stripe.confirmCardPayment(clientSecret,
						{payment_method: {card: cardElement}, setup_future_usage: 'on_session'})
					if (resp.error) {
						handleCardPaymentError()
					}
				} else {
					handleCardPaymentError()
				}
			} catch (error) {
				handleCardPaymentError()
			}
		}
		if (clientSecret && loadingCardPayment) {
			authorizeCardPayment()
		}
	}, [clientSecret, elements, loadingCardPayment, stripe])
	
	/**
	 * Saves the creator twitter username to the session storage, so I will able to know later that the creator
	 * registered by that creator username.
	 */
	useEffect(() => {
		if (addresseeTwitterUsername) {
			window.sessionStorage.setItem(`registeredBy`, addresseeTwitterUsername.toString())
		}
	}, [addresseeTwitterUsername])
	
	const submitCardPayment = async () => {
		setCardPaymentError(false)
		setLoadingCardPayment(true)
	}
	
	const submitGooglePayment = () => {
		paymentRequest.show()
	}
	
	return (
		<>
			<NextSeo
				title={addresseeData ? `${addresseeData.displayName} - Pupix` : 'Pupix'}
				description={addresseeData ?
					`Call ${addresseeData.displayName} on Pupix!  |  Live, Private & Secure Video Session  |  Only ${addresseeData.minuteWage}$ per Minute!` :
					'Video sessions are made simple.'}
			/>
			{loadingAddresseeData || addresseeData ?
				<Column>
					<TopPupikBar checkoutLevel={checkoutLevel} isGoBack={isBackMove} addresseeData={addresseeData}/>
					<AnimatedRow level={checkoutLevel} isBackMove={isBackMove}>
						<VideoCallLength handleContinueClick={() => setCheckoutLevel(1)}
						                 videoCallLength={videoCallLength}
						                 setVideoCallLength={handleVideoCallLengthSelection}
						                 creatorMinuteWage={addresseeData?.minuteWage} checkoutLevel={checkoutLevel}/>
						<SecureLoginPage handleContinueClick={() => setCheckoutLevel(2)}/>
						<CheckoutPage creatorTwitterUsername={addresseeTwitterUsername}
						              addresseeData={addresseeData} videoCallLength={videoCallLength}
						              submitCardPayment={submitCardPayment} loadingCardPayment={loadingCardPayment}
						              cardPaymentError={cardPaymentError} selectedPaymentOption={selectedPaymentOption}
						              setSelectedPaymentOption={setSelectedPaymentOption}
						              handleGooglePayClick={submitGooglePayment}
						              loadingGooglePayment={loadingActualPayment}
						              enabledPaymentMethods={enabledPaymentMethods}
						              googlePaymentFailed={googlePaymentFailed}/>
					</AnimatedRow>
					<PupikFooter/>
				</Column> : <UserNotFound/>
			}
		</>
	)
}