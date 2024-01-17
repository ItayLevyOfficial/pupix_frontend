import React, {useCallback, useState} from 'react'
import {useFullScreen} from './hooks/useFullScreen'
import {VideoRoomVideo} from './videoRoomVideo'
import {BigVideoContainer} from './bigVideoContainer'
import {SmallVideoContainer} from './SmallVideoContainer'
import {VideoRoomAudio} from './videoRoomAudio'
import {useRemoteTrack} from './hooks/useRemoteTrack'
import {Column, VideoCallContainer} from '../generalComponents/containers'
import {backgroundBlurBoxHeight, backgroundBlurBoxMarginBottom, BottomBlur} from './controllers/bottomBlur'
import {CreatorTipsAlerts} from './tipRequestFlow/creatorTipsAlerts'
import {TopBlur} from './controllers/topBlur'
import {CreatorRequestTipFlow} from './tipRequestFlow/creatorRequestTipFlow'
import {TipCreatorModalFlow} from './sendTipFlow/tipCreatorModalFlow'
import {TipRequestAlert} from './tipRequestFlow/tipRequestAlert'
import {ClientDisabledVideoPopUp} from './clientDisabledVideoPopUp'
import styled from 'styled-components'
import * as constants from '../generalHelpers/constants'

export const BottomMovingColumn = styled(Column)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  transform: translateY(${props => props?.hide ? `${backgroundBlurBoxHeight + backgroundBlurBoxMarginBottom}px` : 0});
  transition: transform ${constants.showBottomButtonsAnimationDuration};
`
export const VideoRoom = (
	{
		callData, handleHangUpClick, handleTimerEnd, flipCamera, remoteParticipant, localVideoTrack,
		isCreator, roomId, disableLocalVideo, enableLocalVideo
	}) => {
	const [showButtons, setShowButtons] = useState(true)
	const [fullScreen, toggleFullScreen] = useFullScreen()
	const [remoteVideoTrack] = useRemoteTrack(remoteParticipant, 'video')
	const [remoteAudioTrack] = useRemoteTrack(remoteParticipant, 'audio')
	const [showTipModal, setShowTipModal] = useState(false)
	const [showVideoPermissionDeniedPopup, setShowVideoPermissionDeniedPopup] = useState(false)
	
	const handleDollarSignClick = event => {
		event.stopPropagation()
		setShowTipModal(true)
	}
	
	const handleCallContainerClick = () => {
		setShowButtons(oldShowButtons => !oldShowButtons)
		setShowVideoPermissionDeniedPopup(false)
		const audioElement = document.getElementsByTagName('audio')[0]
		if (audioElement?.paused) {
			audioElement.play()
		}
	}
	
	const toggleEnableVideo = useCallback(async event => {
		event.stopPropagation()
		if (localVideoTrack) {
			await disableLocalVideo()
		} else {
			try {
				await enableLocalVideo()
			} catch (error) {
				setShowVideoPermissionDeniedPopup(true)
			}
		}
	}, [disableLocalVideo, enableLocalVideo, localVideoTrack])
	
	return <>
		{isCreator ? <CreatorRequestTipFlow show={showTipModal} handleHide={() => setShowTipModal(false)}
		                                    videoRoomId={roomId}/> :
			<TipCreatorModalFlow
				videoRoomId={roomId} handleHide={() => setShowTipModal(false)} show={showTipModal}
				creatorUid={callData.addresseeUid} initialTipAmount={callData.tipRequest}/>}
		<VideoCallContainer onClick={handleCallContainerClick} style={{height: window.innerHeight}}>
			<VideoRoomAudio audioTrack={remoteAudioTrack}/>
			<BigVideoContainer>
				<VideoRoomVideo videoTrack={isCreator ? localVideoTrack : remoteVideoTrack}/>
			</BigVideoContainer>
			{isCreator ? <CreatorTipsAlerts videoRoomId={roomId}/> :
				<TipRequestAlert tipAmount={callData.tipRequest} handleSendTipClick={handleDollarSignClick}/>}
			<TopBlur
				creatorConnectionTime={callData.addresseeConnectionTime}
				callLength={callData.callLength} hide={!showButtons} handleTimerEnd={handleTimerEnd}
				callPrice={callData.callPrice + (callData.totalTips ?? 0)}/>
			<BottomMovingColumn hide={!showButtons}>
				<SmallVideoContainer buttonsUp={showButtons}>
					<VideoRoomVideo videoTrack={isCreator ? remoteVideoTrack : localVideoTrack}/>
				</SmallVideoContainer>
				<BottomBlur isCreator={isCreator} isFullScreen={fullScreen} handleFullScreenClick={toggleFullScreen}
				            handleDollarSignClick={handleDollarSignClick}
				            handleHangUpClick={handleHangUpClick} handleFlipCameraClick={flipCamera}
				            isShowingButtons={showButtons} isVideoEnabled={localVideoTrack}
				            handleVideoIconClick={toggleEnableVideo}/>
			</BottomMovingColumn>
			<ClientDisabledVideoPopUp isHidden={!showVideoPermissionDeniedPopup}/>
		</VideoCallContainer>
	</>
}

export const leaveRoom = (room) => {
	if (room) {
		room.localParticipant.tracks.forEach(track => {
			track.track.stop()
		})
		room.disconnect()
	}
}