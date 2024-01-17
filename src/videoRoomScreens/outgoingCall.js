import React from 'react'
import DenyCallIcon from '../icons/denyCallIcon.svg'
import {VideoCallBottomButton} from '../videoRoom/controllers/videoCallBottomButton'
import * as constants from '../generalHelpers/constants'
import {environment} from '../generalHelpers/constants'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import {FormattedTimer} from '../videoRoom/controllers/topBlur'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {BorderedCircle} from '../userProfile/userProfile'
import {ProfilePhotoWithLoading} from '../generalComponents/profilePhotoWithLoading'
import {CenteredExplanationText, handleTooLongText} from './creatorHungUp'
import {PositionedBluePupikIcon} from '../generalComponents/logoLoadingScreen'

export const callFunctionIfExists = (theFunction) => {
	if (theFunction) {
		theFunction()
	}
}

const BigBlueTitle = styled.h1`
  color: var(--new-main-color);
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 1;
  margin-bottom: 0;
`

export const OneLineSmallTitle = styled.h1`
  margin-bottom: 0;
  font-size: 22px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: 0.3px;
  white-space: nowrap;
  ${handleTooLongText};
`

export const SpacedCenteredExplanationText = styled(CenteredExplanationText)`
  line-height: 1.5;
`

export const OutgoingCall = (
	{
		displayName,
		photoUrl,
		handleHangUp,
		clientConnectionTime,
		handleAddresseeMissedCall
	}) => {
	
	if (environment === 'testing' && !displayName) {
		displayName = 'Selena Gomez'
		photoUrl =
			'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/191125_Selena_Gomez_at_the_2019_American_Music_Awards_%28cropped%29.png/440px-191125_Selena_Gomez_at_the_2019_American_Music_Awards_%28cropped%29.png'
	}
	
	return (
		<FullDisplayCenteredColumn>
			<PositionedBluePupikIcon withoutHref/>
			<SizedBox height={30}/>
			<BorderedCircle>
				<ProfilePhotoWithLoading src={photoUrl} diameter='150px'/>
			</BorderedCircle>
			<SizedBox height={20}/>
			<OneLineSmallTitle style={{marginBottom: '20px'}}>Outgoing Call...</OneLineSmallTitle>
			<OneLineSmallTitle style={{marginBottom: '20px'}}>{displayName}</OneLineSmallTitle>
			<BigBlueTitle style={{marginBottom: '20px'}}>
				<FormattedTimer callLength={2} timerStartTime={clientConnectionTime}
				                handleTimerEnd={handleAddresseeMissedCall} errorTime={5_000}/>
			</BigBlueTitle>
			<SpacedCenteredExplanationText style={{margin: '0 20px 30px'}}>
				We will only charge you if the creator accepts the call.
			</SpacedCenteredExplanationText>
			<VideoCallBottomButton
				textColor={constants.bottomButtonTextColor} buttonColor={constants.hangUpButtonColor}
				icon={<DenyCallIcon/>} handleClick={handleHangUp} bottomText='End call' style={{margin: 'auto 0 20px'}}
			/>
		</FullDisplayCenteredColumn>
	)
}