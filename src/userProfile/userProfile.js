import styled from 'styled-components'
import {useRedirectToLoginIfNeeded} from './useRedirectToLoginIfNeeded'
import React, {useEffect, useState} from 'react'
import {useCurrentFirebaseUser} from '../generalHelpers/firebaseUserHook'
import {useFirestoreDocument} from '../generalHelpers/useFirestoreDocument'
import {userDocRef, userPIDocRef} from '../generalHelpers/firestorePaths'
import {useDocument} from 'react-firebase-hooks/firestore'
import {useVideoCallDoc} from './useVideoCallDoc'
import {useRedirectToStripeOnboarding} from './useRedirectToStripeOnboarding'
import {useRouter} from 'next/router'
import copy from 'copy-to-clipboard'
import firebase from 'firebase/app'
import TwilioVideo, {isSupported} from 'twilio-video'
import {IncomingCall} from '../videoRoomScreens/IncomingCall'
import {LogoLoadingScreen} from '../generalComponents/logoLoadingScreen'
import {CenteredContainer, FullDisplayCenteredColumn} from '../generalComponents/containers'
import {StripeAccountAlert} from './stripeAccountAlert'
import {BrowserNotSupportedAlert} from './browserNotSupportedAlert'
import {SmallExplanationText} from '../generalHelpers/fonts'
import Switch from 'react-ios-switch'
import {CopiedTooltip} from './copiedTooltip'
import {HistoryCallsTable} from './callsHistoryTable'
import {FloatingCircleButton} from '../editProfile/editablePhoto'
import EditIcon from '../icons/editIcon.svg'
import {NextSeo} from 'next-seo'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {BigTitle, NewBootstrapActionButton} from '../pages'
import {handleTooLongText} from '../videoRoomScreens/creatorHungUp'
import {UserProfileTopBar} from './coverPhotoTopBar'
import {ProfilePhotoWithBorder} from '../newCheckoutFlow/TopPupikBar'


export const DisplayNameTitle = styled(BigTitle)`
  text-align: center;
  ${handleTooLongText};
`

export const BorderedCircle = styled(CenteredContainer)`
  border: 3px solid var(--new-main-color);
  padding: 3px;
  border-radius: 100%;
`

export const userProfilePhotoDiameter = 120

const TopUserProfileAlert = ({stripeAccountStatus, redirectToStripe, finishedLoadingData}) => {
	const [showAlert, setShowAlert] = useState(true)
	
	return showAlert ? (
		isSupported || ['disabled', 'onboarding', 'pending', 'repair'].includes(stripeAccountStatus)) ? (
		<StripeAccountAlert
			onClose={() => setShowAlert(false)} finishedLoading={finishedLoadingData}
			redirectToStripe={redirectToStripe} stripeAccountStatus={stripeAccountStatus}/>
	) : <BrowserNotSupportedAlert onClose={() => setShowAlert(false)}/> : null
}


export const UserProfile = () => {
	useRedirectToLoginIfNeeded()
	const [isCopied, setIsCopied] = useState(false)
	const currentUser = useCurrentFirebaseUser()
	const [userDoc] = useFirestoreDocument(userDocRef(currentUser?.uid))
	const [userPIDoc] = useDocument(userPIDocRef(currentUser?.uid))
	const {stripeAccountStatus} = userPIDoc?.data() ?? {}
	const {isAvailable} = userDoc?.data() ?? {}
	const userDocData = userDoc?.data()
	const pendingCallDoc = useVideoCallDoc({creatorUid: currentUser?.uid, callStatuses: ['pending']})
	const inProgressCall = useVideoCallDoc({creatorUid: currentUser?.uid, callStatuses: ['in-progress']})
	const {callLength: pendingCallLength} = pendingCallDoc?.data() ?? {}
	const [redirectToStripe, redirecting] = useRedirectToStripeOnboarding()
	const router = useRouter()
	
	const copyProfileLink = async (event) => {
		setIsCopied(true)
		copy(`${window.location.protocol}//${window.location.host}/${userDocData?.twitterUsername}`)
		event.stopPropagation()
	}
	
	useEffect(() => {
		if (inProgressCall?.exists) {
			const videoCallDocId = inProgressCall.ref.id
			// This check is here to prevent redirects to the video call after the addressee hung up and before the
			// call status changed in the database.
			if (!localStorage.getItem(videoCallDocId)) {
				router.push(`/video-room/${videoCallDocId}`)
			}
		}
	}, [inProgressCall, router])
	
	const toggleAvailability = async () => await firebase.firestore()
		.collection('users').doc(currentUser.uid).update({isAvailable: !userDocData.isAvailable})
	
	const getComponent = () => {
		if (pendingCallDoc?.exists && isAvailable && TwilioVideo.isSupported) {
			return <IncomingCall callPrice={pendingCallLength * userDocData?.minuteWage}
			                     photoUrl={userDocData?.photoURL} twilioRoomId={pendingCallDoc.ref.id}
			                     callLength={pendingCallLength}/>
		} else if (redirecting) {
			return <LogoLoadingScreen loadingText='Redirecting...'/>
		} else {
			return userDocData ? (
				<FullDisplayCenteredColumn onClick={() => setIsCopied(false)}>
					<TopUserProfileAlert
						redirectToStripe={redirectToStripe} stripeAccountStatus={stripeAccountStatus}
						finishedLoadingData={userPIDoc?.exists}/>
					<UserProfileTopBar
						uid={currentUser?.uid} coverPhotoUrl={userDocData?.coverPhotoUrl}
						showEditPhotoIcon={!userDocData?.coverPhotoUrl}/>
					<ProfilePhotoWithBorder diameter={`${userProfilePhotoDiameter}px`} photoUrl={userDocData?.photoURL}
					                        style={{marginTop: -(userProfilePhotoDiameter / 2)}} loadingSrc={false}/>
					<SizedBox height={20}/>
					<DisplayNameTitle style={{marginBottom: '15px'}}>{userDocData.displayName}</DisplayNameTitle>
					{['disabled', 'onboarding', 'repair'].includes(stripeAccountStatus) ? (
						<SmallExplanationText>
							Disabled
						</SmallExplanationText>
					) : (
						<>
							<Switch onChange={toggleAvailability} style={{marginBottom: '7px'}} offColor='#E3E3E3'
							        checked={userDocData.isAvailable}/>
							<SmallExplanationText>
								{userDocData.isAvailable ? 'Available' : 'Not Available'}
							</SmallExplanationText>
						</>
					)
					}
					<SizedBox height={20}/>
					<NewBootstrapActionButton onClick={copyProfileLink}>Copy Profile Link</NewBootstrapActionButton>
					<CopiedTooltip hidden={!isCopied}>Copied!</CopiedTooltip>
					<HistoryCallsTable uid={currentUser?.uid} style={{marginBottom: '100px'}}/>
					<FloatingCircleButton style={{position: 'fixed', bottom: '30px', right: '20px'}}
					                      onClick={() => router.push('/edit-profile')} padding='20px'>
						<EditIcon/>
					</FloatingCircleButton>
				</FullDisplayCenteredColumn>
			) : <LogoLoadingScreen/>
		}
	}
	
	return (
		<>
			<NextSeo title='Pupix' description='Video sessions are made simple.'/>
			{getComponent()}
		</>
	)
}
