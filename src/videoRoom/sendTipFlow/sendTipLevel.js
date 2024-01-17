import React, {useEffect} from 'react'
import {
	InputExplanationText,
	ModalHeader,
	ModalTitle,
	PositionedRow,
	SizedBox,
	SizedInputGroup,
	SmallButton
} from './tipCreatorModalComponents'
import {CenteredContainer} from '../../generalComponents/containers'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'

export const PaddedSecondaryButton = styled(SmallButton).attrs({variant: 'secondary'})`
  margin-right: 15px;
`

// Must have the "``" at the end, it throws an error otherwise.
export const PrimarySmallButton = styled(SmallButton).attrs({variant: 'pupik'})``

export const ErrorText = styled(InputExplanationText)`
  color: red;
  font-weight: 500;
`

export const isValidTipAmount = newTipAmount => /^[0-9]*$/.test(newTipAmount) && newTipAmount.length < 5

export const SendTipLevel = (
	{handleLevelCompletion, handleCancelClick, tipAmount, setTipAmount, isSendPressed, setIsSendPressed}) => {
	
	const handleTipInputChange = (newValue) => {
		if (isValidTipAmount(newValue)) {
			setTipAmount(parseInt(newValue))
		}
	}
	
	useEffect(() => {
		if (isSendPressed) {
			setTimeout(handleLevelCompletion, 2_000)
		}
	}, [handleLevelCompletion, isSendPressed])
	
	const handleSendClick = () => {
		setIsSendPressed(true)
	}
	
	return (
		<>
			<ModalHeader closeButton>
				<ModalTitle>Send tip</ModalTitle>
			</ModalHeader>
			<SizedInputGroup style={{marginBottom: '10px'}}>
				<InputGroup.Prepend>
					<InputGroup.Text>$</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl value={tipAmount ? tipAmount.toString() : ''} type='num'
				             onChange={event => handleTipInputChange(event.target.value)}/>
			</SizedInputGroup>
			<InputExplanationText style={{marginLeft: '40px'}}>
				Minimum $5 USD
			</InputExplanationText>
			<SizedBox height={30}/>
			<PositionedRow>
				<PaddedSecondaryButton onClick={handleCancelClick}>
					Cancel
				</PaddedSecondaryButton>
				<PrimarySmallButton
					
					// Needed this weired condition for the case the tip amount is NaN
					disabled={isSendPressed || !tipAmount || tipAmount < 5}
					onClick={handleSendClick}>
					<CenteredContainer>
						Next
					</CenteredContainer>
				</PrimarySmallButton>
			</PositionedRow>
		</>
	
	)
}