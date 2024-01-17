import React, {useState} from 'react'
import {
	InputExplanationText,
	ModalHeader,
	ModalTitle,
	PositionedRow,
	SizedBox,
	SizedInputGroup
} from '../sendTipFlow/tipCreatorModalComponents'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {ErrorText, isValidTipAmount, PaddedSecondaryButton, PrimarySmallButton} from '../sendTipFlow/sendTipLevel'
import {CenteredContainer} from '../../generalComponents/containers'
import {videoCallDocRef} from '../../generalHelpers/firestorePaths'

export const RequestTipAmountModal = ({handleCancelClick, videoRoomId, handleCompletion, tipAmount, setTipAmount}) => {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	
	const handleTipInputChange = (newValue) => {
		if (isValidTipAmount(newValue)) {
			setTipAmount(newValue)
		}
	}
	
	const saveTipRequest = async () => {
		setLoading(true)
		try {
			await videoCallDocRef(videoRoomId).update({tipRequest: parseInt(tipAmount)})
			setLoading(false)
			handleCompletion()
		} catch (error) {
			setError('Failed to send tip request.')
			console.log({error: error.message, videoRoomId})
			setLoading(false)
		}
	}
	
	return <>
		<ModalHeader closeButton>
			<ModalTitle>
				Ask for a tip
			</ModalTitle>
		</ModalHeader>
		<SizedInputGroup style={{marginBottom: '10px'}}>
			<InputGroup.Prepend>
				<InputGroup.Text>$</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl value={tipAmount.toString()} type='num'
				             onChange={event => handleTipInputChange(event.target.value)}/>
			</SizedInputGroup>
			<InputExplanationText style={{marginLeft: '40px'}}>
				Minimum $5 USD
			</InputExplanationText>
			<SizedBox height={15}/>
			<ErrorText style={{marginLeft: '40px'}}>
				{error}
			</ErrorText>
			<SizedBox height={20}/>
			<PositionedRow>
				<PaddedSecondaryButton onClick={handleCancelClick}>
					Cancel
				</PaddedSecondaryButton>
				<PrimarySmallButton disabled={loading || tipAmount < 5} onClick={saveTipRequest}>
					<CenteredContainer>
						{error ? 'Try again' : 'Request'}
					</CenteredContainer>
				</PrimarySmallButton>
			</PositionedRow>
		</>
}