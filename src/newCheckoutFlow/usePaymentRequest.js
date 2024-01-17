import {useEffect, useState} from 'react'
import {useStripe} from '@stripe/react-stripe-js'

/**
 * @param callPrice: The call price, in cents.
 * @param creatorTwitterUsername
 */
export const usePaymentRequest = (callPrice, creatorTwitterUsername, clientSecret) => {
	const [paymentRequest, setPaymentRequest] = useState()
	const [PRCurrentCallPrice, setPRCurrentCallPrice] = useState(callPrice)
	const [loadingActualPayment, setLoadingActualPayment] = useState(false)
	const [enabledPaymentMethods, setEnabledPaymentMethods] = useState()
	const [paymentFailed, setPaymentFailed] = useState(false)
	const [callPriceUpdateable, setCallPriceUpdateable] = useState(false)
	const stripe = useStripe()
	
	// Creates the first payment request.
	useEffect(() => {
		if (callPrice && creatorTwitterUsername && stripe && !paymentRequest) {
			setPaymentRequest(stripe.paymentRequest({
				country: 'US',
				currency: 'usd',
				total: {
					label: `Video chat with ${creatorTwitterUsername}`,
					amount: callPrice,
				}
			}))
		}
	}, [callPrice, creatorTwitterUsername, paymentRequest, stripe])
	
	// Sets the enabled payment methods on the first payment request creation.
	useEffect(() => {
		if (paymentRequest && !enabledPaymentMethods) {
			paymentRequest.canMakePayment().then((result => {
				setEnabledPaymentMethods(result ?? {})
				setCallPriceUpdateable(true)
			}))
		}
	}, [enabledPaymentMethods, paymentRequest])
	
	// Updates the payment requests on call price changes.
	useEffect(() => {
		if (PRCurrentCallPrice === 0) {
			setPRCurrentCallPrice(callPrice)
		} else if (paymentRequest && callPrice !== PRCurrentCallPrice && callPriceUpdateable) {
			paymentRequest.update({
				total: {
					label: `Video chat with ${creatorTwitterUsername}`,
					amount: callPrice,
				}
			})
			setPRCurrentCallPrice(callPrice)
		}
	}, [PRCurrentCallPrice, callPrice, callPriceUpdateable, creatorTwitterUsername, paymentRequest])
	
	// Confirm the payment on new payment method.
	useEffect(() => {
			const handlePaymentError = (event) => {
				event.complete('fail')
				setLoadingActualPayment(false)
				setPaymentFailed(true)
			}
			const confirmPayment = async event => {
				setLoadingActualPayment(true)
				const result = await stripe.confirmCardPayment(clientSecret,
					{payment_method: event.paymentMethod.id, setup_future_usage: 'on_session'},
					{handleActions: false})
				if (result.error) {
					handlePaymentError(event)
				} else {
					event.complete('success')
					if (result.paymentIntent?.status === 'requires_action') {
						stripe.confirmCardPayment(clientSecret).then(function (result) {
							if (result.error) {
								handlePaymentError(event)
							}
						})
					}
				}
			}
			
			if (paymentRequest && clientSecret) {
				paymentRequest.on('paymentmethod', confirmPayment)
				return () => paymentRequest.off('paymentmethod', confirmPayment)
			}
		}, [paymentRequest, clientSecret, stripe]
	)
	
	return [paymentRequest, enabledPaymentMethods, loadingActualPayment, paymentFailed]
}