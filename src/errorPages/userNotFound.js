import React from 'react'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import SadFace from '../icons/sadFaceIcon.svg'
import {MediumTitle, PaddedNextButton} from '../videoRoomScreens/creatorHungUp'
import {PositionedBluePupikIcon} from '../generalComponents/logoLoadingScreen'

export const UserNotFound = () => {
	
	return (
		<FullDisplayCenteredColumn>
			<PositionedBluePupikIcon/>
			<MediumTitle style={{marginTop: '60px', marginBottom: '50px'}}>
				User Not Found.
			</MediumTitle>
			<SadFace style={{width: '230px', marginBottom: 'auto'}}/>
			<PaddedNextButton onClick={() => window.location.href = '/'}>
				Go Home
			</PaddedNextButton>
		</FullDisplayCenteredColumn>
	)
}
