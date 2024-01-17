import React from 'react'
import {ModalHeader, ModalTitle, PositionedGreenSuccessIcon, PositionedRow, SizedBox} from './tipCreatorModalComponents'
import {PaddedSecondaryButton, PrimarySmallButton} from './sendTipLevel'

export const TipCongratulationsModal = ({tipAmount, handleSendAnotherTip, handleHide}) => <>
	<ModalHeader closeButton>
		<ModalTitle>
			${tipAmount} Sent successfully
		</ModalTitle>
	</ModalHeader>
	<PositionedGreenSuccessIcon/>
	<SizedBox height={40}/>
	<PositionedRow>
		<PaddedSecondaryButton onClick={handleHide}>
			Close
		</PaddedSecondaryButton>
		<PrimarySmallButton onClick={handleSendAnotherTip}>
			Send another tip
		</PrimarySmallButton>
	</PositionedRow>
</>