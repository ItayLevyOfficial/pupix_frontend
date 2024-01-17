import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {BootstrapAlert} from '../../userProfile/stripeAccountAlert'
import {FullWidthCenteredColumn} from '../../generalComponents/containers'
import CloseIcon from '../../icons/closeIcon.svg'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {environment} from '../../generalHelpers/constants'

/**
 * A bootstrap alert with bigger right padding, for custom close buttons.
 * Need it because the regular bootstrap alert close button not forward the event object, so you can not call
 * event.stopPropagation on it.
 */
export const CustomClosePaddedAlert = styled(BootstrapAlert)`
  padding-right: 40px;
`

const PaddedTipAlert = styled(CustomClosePaddedAlert).attrs({variant: 'success'})`
  margin-top: 20px;
`

const CreatorsTipAlertContainer = styled(FullWidthCenteredColumn)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

export const PositionedCloseIcon = styled(CloseIcon)`
  position: absolute;
  right: 15px;
  top: 15px;
`

/**
 * The in video chat creator new tips alerts component. Display a bootstrap alert for every tip, to a maximum amount
 * of three tips.
 */
export const CreatorTipsAlerts = ({videoRoomId}) => {
	
	if (environment === 'testing' && !videoRoomId) {
		videoRoomId = 'LoVx2gYszGG3Kzx5TCsW'
	}
	
	const [tips, setTips] = useState([])
	
	useEffect(() => {
		firebase.firestore().collection(`videoCalls/${videoRoomId}/tips`)
			.orderBy('time', 'desc')
			.limit(3)
			.onSnapshot(snapshot => {
				setTips(snapshot?.docs?.filter(tipDoc => !localStorage.getItem(`tip_${tipDoc.id}`))
					.map(doc => ({...doc.data(), id: doc.id})) ?? [])
			})
	}, [videoRoomId])
	
	const handleCloseTip = (tipId, event) => {
		event.stopPropagation()
		localStorage.setItem(`tip_${tipId}`, '1')
		setTips(prevState => prevState.filter(tip => tip.id !== tipId))
	}
	
	return <CreatorsTipAlertContainer>{tips.map(tip => (
		<PaddedTipAlert key={tip.id} onClose={() => handleCloseTip(tip.id)}>
			Congratulations! The client just sent you a ${tip.amount} tip.
			<PositionedCloseIcon onClick={event => handleCloseTip(tip.id, event)}/>
		</PaddedTipAlert>
	))}
	</CreatorsTipAlertContainer>
}