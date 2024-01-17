import React, {useEffect, useState} from 'react'
import {Column} from '../../generalComponents/containers'
import 'firebase/functions'
import {SizedModal} from './tipCreatorModalComponents'
import {SendTipLevel} from './sendTipLevel'
import {ConfirmTipLevel} from './confirmTipModal'
import {TipCongratulationsModal} from './tipCongratulationsModal'
import {environment} from '../../generalHelpers/constants'
import firebase from 'firebase/app'

export const TipCreatorModalFlow = (
	{creatorUid, videoRoomId, show, handleHide, initialTipAmount = 10}) => {
	
	if (environment === 'testing' && !videoRoomId) {
		show = true
		creatorUid = 'BXRbTVbqiURj29tGLf0d6Peq31Tn'
		handleHide = () => {}
		videoRoomId = 'zpOzWdVNyp2il1igP5fq'
	}
	
	// Needed to update the tip amount when it changes by the tip creator tip request amount.
	useEffect(() => {
		setTipAmount(initialTipAmount)
	}, [initialTipAmount])
	
	const [tipAmount, setTipAmount] = useState(initialTipAmount)
	const [tipLevel, setTipLevel] = useState(0)
	const [stripeClientSecret, setStripeClientSecret] = useState()
	
	// Needed so we will can start create the stripe client secret function early.
	const [isSendPressed, setIsSendPressed] = useState(false)
	
	const resetTipFlowState = () => {
		setIsSendPressed(false)
		setTipLevel(0)
		setTipAmount(10)
		setStripeClientSecret(null)
	}
	
	const handleHideAndResetState = () => {
		resetTipFlowState()
		handleHide()
	}
	
	useEffect(() => {
		const createStripeClientSecret = () => {
			firebase.app().functions()
				.httpsCallable('createTipPaymentIntent')(
					{tipAmount: tipAmount, addresseeUid: creatorUid, videoRoomId})
				.then(response => {
					setStripeClientSecret(response.data)
				})
				.catch(() => {
					// Need it so it will throw an error when trying to capture the payment. 'AAAA' is random string, it
					// can whatever.
					setStripeClientSecret('AAAA')
				})
		}
		
		if (isSendPressed && !stripeClientSecret) {
			createStripeClientSecret()
		}
	}, [creatorUid, isSendPressed, stripeClientSecret, tipAmount, videoRoomId])
	
	const resetPaymentIntent = () => setStripeClientSecret(null)
	
	const modalBody = {
		0: <SendTipLevel
			videoRoomId={videoRoomId} handleCancelClick={handleHideAndResetState} tipAmount={tipAmount}
			setTipAmount={setTipAmount} creatorUid={creatorUid} isSendPressed={isSendPressed}
			setIsSendPressed={setIsSendPressed}
			handleLevelCompletion={() => setTipLevel(1)}/>,
		1: <ConfirmTipLevel
			tipAmount={tipAmount} stripeClientSecret={stripeClientSecret} createNewPaymentIntent={resetPaymentIntent}
			handleLevelCompletion={() => setTipLevel(2)} handleHide={handleHideAndResetState}/>,
		2: <TipCongratulationsModal tipAmount={tipAmount} handleHide={handleHideAndResetState}
		                            handleSendAnotherTip={resetTipFlowState}/>
	}
	
	return (
		<SizedModal show={show} onHide={handleHideAndResetState} centered>
			<Column>
				{modalBody[tipLevel]}
			</Column>
		</SizedModal>
	)
}