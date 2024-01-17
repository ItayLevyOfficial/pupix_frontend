import React, {useState} from 'react'
import {SizedModal} from '../sendTipFlow/tipCreatorModalComponents'
import {Column} from '../../generalComponents/containers'
import {RequestTipAmountModal} from './requestTipAmountModal'
import {TipRequestSentModal} from './tipRequestSentModal'
import {environment} from '../../generalHelpers/constants'

export const CreatorRequestTipFlow = ({videoRoomId, show, handleHide}) => {
	const [tipLevel, setTipLevel] = useState(0)
	const [tipAmount, setTipAmount] = useState(10)
	
	if (environment === 'testing' && !videoRoomId) {
		videoRoomId = 'sH1eHy752yCkZcvFD66l'
	}
	
	const handleHideAndResetState = () => {
		setTipLevel(0)
		handleHide()
	}
	
	const modalBody = {
		0: <RequestTipAmountModal
			videoRoomId={videoRoomId} handleCancelClick={handleHideAndResetState}
			handleCompletion={() => setTipLevel(1)} tipAmount={tipAmount} setTipAmount={setTipAmount}/>,
		1: <TipRequestSentModal tipAmount={tipAmount} handleHide={handleHideAndResetState}/>
	}
	
	return (
		<SizedModal show={show} onHide={handleHideAndResetState} centered>
			<Column>
				{modalBody[tipLevel]}
			</Column>
		</SizedModal>
	)
}