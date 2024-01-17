import React from 'react'
import ErrorIcon from '../icons/errorIcon.svg'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import {NewBootstrapActionButton} from '../pages'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {SpacedCenteredExplanationText} from './outgoingCall'
import {MediumTitle} from './creatorHungUp'

export const YourConnectionLost = ({isCreator}) => {
	return (
		<FullDisplayCenteredColumn>
			<MediumTitle style={{margin: '30px 30px 30px'}}>
				Your internet connection was lost.
			</MediumTitle>
			<ErrorIcon style={{width: '200px', marginBottom: '30px'}}/>
			<SpacedCenteredExplanationText style={{margin: '0 30px auto'}}>
				{isCreator ? 'If it does not return soon, the call will end, and we will not pay you.' :
					'If it does not return soon, the call will end, and we will not refund you.'}
			</SpacedCenteredExplanationText>
			<NewBootstrapActionButton onClick={() => window.location.reload()}>
				Refresh
			</NewBootstrapActionButton>
			<SizedBox height={30}/>
		</FullDisplayCenteredColumn>
	)
}