import React from 'react'
import ThreeDotsIcon from '../icons/threeDotsIcon.svg'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import AndroidSettingsIcon from '../icons/settingsIcon.svg'
import MicrophoneIcon from '../icons/MicrophoneIcon.svg'
import DoneIcon from '../icons/DoneIcon.svg'
import {BoldText, GridOrder, OrdersGrid, TwentyPixelTitle} from './iOSCreatorPermissionDenied'
import {ButtonWithLoading} from '../registrationFlow/stripeExplanation'

export const AndroidPermissionDenied = () => {
	
	return (
		<FullDisplayCenteredColumn>
			<TwentyPixelTitle style={{margin: '30px 20px 50px'}}>
				Enable camera & microphone permissions to accept calls.
			</TwentyPixelTitle>
			<OrdersGrid style={{margin: '0 20px 30px'}}>
				<ThreeDotsIcon/>
				<GridOrder>
					1. Click the top right three dots icon.
				</GridOrder>
				<AndroidSettingsIcon/>
				<GridOrder>
					2. Click <BoldText>Settings > Site settings</BoldText>.
				</GridOrder>
				<MicrophoneIcon/>
				<GridOrder>
					3. Ensure your camera & mic are set to <BoldText>Allowed</BoldText>.
				</GridOrder>
				<DoneIcon/>
				<GridOrder>
					4. Go back to <BoldText>Pupix</BoldText> and refresh the page.
				</GridOrder>
			</OrdersGrid>
			<ButtonWithLoading onClick={() => window.location.reload()}>
				Refresh
			</ButtonWithLoading>
		</FullDisplayCenteredColumn>
	)
}