import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { isIos } from '../generalHelpers/constants'
import TwilioVideo from 'twilio-video'
import { IOSBrowserNotSupported } from '../errorPages/IOSBrowserNotSupported'
import { AndroidBrowserNotSupported } from '../errorPages/androidBrowserNotSupported'
import { LogoLoadingScreen } from '../generalComponents/logoLoadingScreen'
import { IOSPermissionDenied } from '../errorPages/iOSCreatorPermissionDenied'
import { AndroidPermissionDenied } from '../errorPages/androidCreatorPermisssionDenied'
import { HangUpValidationScreen } from '../videoRoomScreens/hangUpValidation'
import { OtherParticipantLostInternet } from '../videoRoomScreens/otherParticipantLostInternet'
import { YourConnectionLost } from '../videoRoomScreens/YourConnectionLost'
import { useVideoCallDoc } from './hooks/useVideoCallDoc'
import { useVideoRoomEvents } from './hooks/useVideoRoomEvents'
import { leaveRoom, VideoRoom } from './videoRoom'
import { useTwilioToken } from './hooks/useTwilioToken'
import { useTwilioRoom } from './hooks/useTwilioRoom'
import { useRemoteParticipant } from './hooks/useRemoteParticipant'
import { useLocalParticipant } from './hooks/useLocalParticipant'
import { useLocalVideoTrack } from './hooks/useLocalVideoTrack'
import { usePageGonnaDisappear } from './hooks/usePageGonnaDisappear'
import { OutgoingCall } from '../videoRoomScreens/outgoingCall'
import { useFirestoreDocument } from '../generalHelpers/useFirestoreDocument'
import { userDocRef } from '../generalHelpers/firestorePaths'

export const VideoManager = ({ isCreator }) => {
  const [requestingPermissions, setRequestingPermissions] = useState(false)
  const router = useRouter()
  const { roomId, creatorUsername } = router.query
  const videoCallDoc = useVideoCallDoc(roomId)
  const callData = videoCallDoc?.data()
  const twilioToken = useTwilioToken(roomId)
  const handlePermissionsDenied = useCallback(
    () => setRequestingPermissions(true),
    [],
  )
  const [room, setRoom] = useTwilioRoom({
    roomId,
    twilioToken,
    handlePermissionsDenied,
    connectWithoutVideo: !isCreator,
  })
  const [creatorDoc] = useFirestoreDocument(userDocRef(callData?.addresseeUid))
  const [validatingHangUp, setValidatingHangUp] = useState(false)
  const [
    remoteParticipant,
    remoteParticipantReconnectionTime,
  ] = useRemoteParticipant(room)
  const [localParticipant, localParticipantState] = useLocalParticipant(room)
  const [
    localVideoTrack,
    flipCamera,
    enableLocalVideo,
    disableLocalVideo,
  ] = useLocalVideoTrack(localParticipant)
  const handleCallEnd = useCallback(() => leaveRoom(room), [room])
  useVideoRoomEvents({
    roomId,
    isCreator,
    callData,
    creatorUsername,
    handleCallEnd,
  })

  // Need it because some time the browser stuck when trying to redirect away from video screen.
  const pageGonnaDisappear = usePageGonnaDisappear()

  const handleHangUp = () => {
    leaveRoom(room)
    if (isCreator) {
      router.replace('/creator-you-left-call')
    } else {
      router.replace({
        pathname: '/rate-your-experience',
        query: { creatorUsername, roomId },
      })
    }
  }

  const handleCreatorMissedCall = () => {
    leaveRoom(room)
    router.replace({
      pathname: '/creator-hung-up',
      query: { message: 'The creator missed the call.', creatorUsername },
    })
  }

  const handleTimerEnd = () => {
    if (isCreator) {
      leaveRoom(room)
      let callTotalPrice = callData?.callPrice + (callData?.totalTips ?? 0)
      router.replace({
        pathname: '/congratulations',
        query: { earningsAmount: callTotalPrice },
      })
    }
  }

  if (!TwilioVideo.isSupported) {
    return isIos() ? <IOSBrowserNotSupported /> : <AndroidBrowserNotSupported />
  } else if (pageGonnaDisappear) {
    return <LogoLoadingScreen />
  } else if (requestingPermissions && isCreator) {
    return isIos() ? <IOSPermissionDenied /> : <AndroidPermissionDenied />
  } else if (validatingHangUp) {
    return (
      <HangUpValidationScreen
        handleCancel={() => setValidatingHangUp(false)}
        isCreator={isCreator}
        handleHangUp={handleHangUp}
      />
    )
  } else if (room) {
    if (localParticipantState === 'reconnecting') {
      return <YourConnectionLost isCreator={isCreator} />
    } else if (remoteParticipant) {
      if (remoteParticipant.state === 'reconnecting') {
        return (
          <OtherParticipantLostInternet
            handleHangUp={() => setValidatingHangUp(true)}
            isCreator={isCreator}
            lostConnectionTime={remoteParticipantReconnectionTime}
          />
        )
      } else if (remoteParticipant.state === 'connected') {
        return (
          <VideoRoom
            isCreator={isCreator}
            room={room}
            handleHangUpClick={() => setValidatingHangUp(true)}
            handleTimerEnd={handleTimerEnd}
            remoteParticipant={remoteParticipant}
            addressee={localParticipant}
            roomId={roomId}
            callData={callData}
            disableLocalVideo={disableLocalVideo}
            localVideoTrack={localVideoTrack}
            flipCamera={flipCamera}
            enableLocalVideo={enableLocalVideo}
          />
        )
      } else {
        return <LogoLoadingScreen />
      }
    } else {
      if (isCreator) {
        return (
          <OtherParticipantLostInternet
            lostConnectionTime={remoteParticipantReconnectionTime}
            isCreator={isCreator}
            handleHangUp={() => {
              setValidatingHangUp(true)
            }}
          />
        )
      } else {
        return (
          <OutgoingCall
            handleHangUp={() => setValidatingHangUp(true)}
            displayName={creatorDoc?.data()?.displayName}
            photoUrl={creatorDoc?.data().photoURL}
            clientConnectionTime={callData?.clientConnectionTime}
            handleAddresseeMissedCall={handleCreatorMissedCall}
          />
        )
      }
    }
  } else {
    return <LogoLoadingScreen loadingText="Connecting..." />
  }
}

export const CreatorVideoManager = () => <VideoManager isCreator={true} />
export const ClientVideoManager = () => <VideoManager isCreator={false} />
