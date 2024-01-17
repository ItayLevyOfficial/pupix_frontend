import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {CustomClosePaddedAlert, PositionedCloseIcon} from './creatorTipsAlerts'
import {BoldAWithUnderLine} from '../../newCheckoutFlow/secureLoginPage'

const PositionedTipRequestAlert = styled(CustomClosePaddedAlert).attrs({variant: 'primary'})`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
`

/**
 * The new creator tip request alert.
 * Appear in the top of the client video room when the creator requests a new tip.
 */
export const TipRequestAlert = ({tipAmount, handleSendTipClick}) => {
	const [show, setShow] = useState(true)
	
	const handleCloseAlert = event => {
		event.stopPropagation()
		setShow(false)
	}
	
	// Need it to show the alert on tip request amount changes
	useEffect(() => {
		setShow(true)
	}, [tipAmount])
	
	return show && tipAmount ? (
		<PositionedTipRequestAlert>
			The creator just requested a ${tipAmount} tip. <BoldAWithUnderLine
			onClick={handleSendTipClick}>Send it
			now</BoldAWithUnderLine>
			<PositionedCloseIcon onClick={handleCloseAlert}/>
		</PositionedTipRequestAlert>
	) : null
}