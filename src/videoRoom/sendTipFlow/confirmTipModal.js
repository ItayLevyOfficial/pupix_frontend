import React, {useEffect, useState} from 'react'
import {
	InputExplanationText,
	ModalHeader,
	ModalTitle,
	PositionedDollarIcon,
	PositionedErrorText,
	PositionedRow,
	SizedBox
} from './tipCreatorModalComponents'
import {PaddedSecondaryButton, PrimarySmallButton} from './sendTipLevel'
import {useStripe} from '@stripe/react-stripe-js'
import {calculateStripeFee} from '../../newCheckoutFlow/checkoutScreen/checkoutScreenHelpers'

export const ConfirmTipLevel = (
	{stripeClientSecret, handleLevelCompletion, handleHide, tipAmount, createNewPaymentIntent}) => {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [confirmingPayment, setConfirmingPayment] = useState(false)
	const stripe = useStripe()
	
	useEffect(() => {
		const handlePaymentError = () => {
			setLoading(false)
			setError('Payment failed.')
			setConfirmingPayment(false)
			createNewPaymentIntent()
		}
		const confirmPayment = async () => {
			setConfirmingPayment(true)
			try {
				const result = await stripe.confirmCardPayment(stripeClientSecret)
				if (result.error) {
					handlePaymentError()
				} else {
					handleLevelCompletion()
				}
			} catch (error) {
				handlePaymentError()
			}
		}
		if (loading && stripeClientSecret && !confirmingPayment) {
			confirmPayment()
		}
	}, [confirmingPayment, createNewPaymentIntent, handleLevelCompletion, loading, stripe, stripeClientSecret])
	
	const handleConfirmClick = () => setLoading(true)
	
	return (
		<>
			<ModalHeader closeButton>
				<ModalTitle>
					Send ${tipAmount}
				</ModalTitle>
			</ModalHeader>
			<PositionedDollarIcon/>
			{error ? <PositionedErrorText>Payment failed.</PositionedErrorText> : null}
			<SizedBox height={20}/>
			<InputExplanationText style={{alignSelf: 'center'}}>*process fee: ${calculateStripeFee(
				parseInt(tipAmount))}</InputExplanationText>
			<SizedBox height={30}/>
			<PositionedRow>
				<PaddedSecondaryButton onClick={handleHide} disabled={loading}>
					Cancel
				</PaddedSecondaryButton>
				<PrimarySmallButton disabled={loading} onClick={handleConfirmClick}>
					Confirm
				</PrimarySmallButton>
			</PositionedRow>
		</>
	)
}