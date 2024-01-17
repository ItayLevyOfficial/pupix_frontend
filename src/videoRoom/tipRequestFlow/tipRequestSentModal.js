import React from 'react'
import {
	ModalHeader,
	ModalTitle,
	PositionedGreenSuccessIcon,
	PositionedRow,
	SizedBox
} from '../sendTipFlow/tipCreatorModalComponents'
import {PrimarySmallButton} from '../sendTipFlow/sendTipLevel'

export const TipRequestSentModal = ({tipAmount, handleHide}) => {
	return (
		<>
			<ModalHeader closeButton>
				<ModalTitle>
					${tipAmount} Been requested from the client
				</ModalTitle>
			</ModalHeader>
			<PositionedGreenSuccessIcon/>
			<SizedBox height={30}/>
			<PositionedRow>
				<PrimarySmallButton onClick={handleHide}>
					Close
				</PrimarySmallButton>
			</PositionedRow>
		</>
	)
}