import React, {useCallback, useState} from 'react'
import AcceptCallIcon from '../icons/acceptCallIcon.svg'
import DenyCallIcon from '../icons/denyCallIcon.svg'
import {HangUpValidationScreen} from './hangUpValidation'
import {VideoCallBottomButton} from '../videoRoom/controllers/videoCallBottomButton'
import * as constants from '../generalHelpers/constants'
import {environment} from '../generalHelpers/constants'
import {LogoLoadingScreen, PositionedBluePupikIcon} from '../generalComponents/logoLoadingScreen'
import {videoCallDocRef} from '../generalHelpers/firestorePaths'
import {AlignedCenteredRow, FullDisplayCenteredColumn, JustifiedCenteredRow} from '../generalComponents/containers'
import {OneLineSmallTitle} from './outgoingCall'
import {useRouter} from 'next/router'
import {BorderedCircle} from '../userProfile/userProfile'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {ProfilePhotoWithLoading} from '../generalComponents/profilePhotoWithLoading'
import styled from 'styled-components'

export const selenaGomezPhotoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/191125_Selena_Gomez_at_the_2019_American_Music_Awards_%28cropped%29.png/440px-191125_Selena_Gomez_at_the_2019_American_Music_Awards_%28cropped%29.png'

const Separator = styled.div`
  width: 4px;
  border-radius: 2px;
  height: 25px;
  background-color: ${constants.mainTextColor};
`

export function IncomingCall({callLength, twilioRoomId, photoUrl, callPrice}) {
	const [validatingHangUp, setValidatingHangUp] = useState(false)
	const [loadingCallRejection, setLoadingCallRejection] = useState(false)
	const router = useRouter()
	
	if (!callLength && environment === 'testing') {
		callLength = 8
		photoUrl = selenaGomezPhotoUrl
		callPrice = 50
	}
	
	const acceptCall = useCallback(() => {
		router.push(`/video-room/${twilioRoomId}`)
	}, [router, twilioRoomId])
	
	const handleHangUp = useCallback(async () => {
		setLoadingCallRejection(true)
		try {
			await videoCallDocRef(twilioRoomId).update({status: 'denied'})
		} catch (e) {}
		
	}, [twilioRoomId])
	
	if (loadingCallRejection) {
		return <LogoLoadingScreen/>
	} else if (validatingHangUp) {
		return <HangUpValidationScreen
			handleHangUp={handleHangUp} isCreator={true} handleCancel={() => setValidatingHangUp(false)}/>
	} else {
		return (
			<FullDisplayCenteredColumn>
				<PositionedBluePupikIcon withoutHref/>
				<SizedBox height={40}/>
				<BorderedCircle>
					<ProfilePhotoWithLoading src={photoUrl} diameter='150px'/>
				</BorderedCircle>
				<SizedBox height={30}/>
				<OneLineSmallTitle>Incoming Call...</OneLineSmallTitle>
				<SizedBox height={30}/>
				<AlignedCenteredRow>
					<OneLineSmallTitle>{`${callLength} Minutes`}</OneLineSmallTitle>
					<SizedBox width={25}/>
					<Separator/>
					<SizedBox width={25}/>
					<OneLineSmallTitle>{`$${callPrice}`}</OneLineSmallTitle>
				</AlignedCenteredRow>
				<SizedBox height={30}/>
				<JustifiedCenteredRow style={{margin: 'auto 0 30px'}}>
					<VideoCallBottomButton
						handleClick={acceptCall} buttonColor={constants.acceptCallButtonColor}
						textColor='rgba(0, 0, 0, 0.5)' icon={<AcceptCallIcon/>} bottomText={`Accept`}
						style={{marginRight: '60px'}}/>
					<VideoCallBottomButton
						handleClick={() => setValidatingHangUp(true)} icon={<DenyCallIcon/>}
						bottomText='Decline' buttonColor={constants.hangUpButtonColor} textColor={'rgba(0,0,0,0.5)'}/>
				</JustifiedCenteredRow>
			</FullDisplayCenteredColumn>
		)
	}
}