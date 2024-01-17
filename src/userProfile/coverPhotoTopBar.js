import React, {useState} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import {CenteredContainer, Column} from '../generalComponents/containers'
import {PupixIcon} from '../icons/pupixIcon'
import Skeleton from '@material-ui/lab/Skeleton'
import {useUploadImage} from '../editProfile/editablePhoto'
import {environment} from '../generalHelpers/constants'
import {PositionedPupikIcon} from '../generalComponents/logoLoadingScreen'
import CameraIcon from '../icons/cameraIcon.svg'

const ImageContainer = styled.div`
  width: 100vw;
  height: calc(100vw / 3);
  position: relative;
`

const BackgroundBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
`

const CameraContainer = styled(CenteredContainer)`
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 10px;
`

const PositionedLoadingText = styled.h3`
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  position: absolute;
  color: white;
  font-size: 14px;
  letter-spacing: 0.2px;
  z-index: 10;
`

const ShadowedImageContainer = ({coverPhotoUrl, loadingUpload, children, ...props}) => {
	const [errorLoadingPhoto, setErrorLoadingPhoto] = useState(false)
	
	return <ImageContainer {...props}>
		{loadingUpload ? <>
			<Skeleton variant='rect' width='100vw' height='calc(100vw / 3)'/>
			<PositionedLoadingText>Uploading...</PositionedLoadingText>
		</> : <>
			<Image
				src={errorLoadingPhoto ? '/emptyCoverPhoto.png' :
					coverPhotoUrl ? coverPhotoUrl : '/emptyCoverPhoto.png'} layout='fill'
				objectFit='cover' onError={() => setErrorLoadingPhoto(true)}/>
		</>}
		<BackgroundBlur/>
		{children}
	</ImageContainer>
}

const PositionedLeftColumn = styled(Column)`
  position: absolute;
  z-index: 5;
  left: 20px;
  top: 20px;
`

export const CheckoutFlowTopBar = ({...props}) => (
	<ShadowedImageContainer {...props}>
		<PositionedLeftColumn>
			<PupixIcon width={60} onClick={() => window.location.href = '/'}/>
		</PositionedLeftColumn>
	</ShadowedImageContainer>
)

export const UserProfileTopBar = ({coverPhotoUrl, uid, showEditPhotoIcon, withoutHref}) => {
	if (environment === 'testing' && !uid) {
		uid = 'BXRbTVbqiURj29tGLf0d6Peq31Tn'
	}
	const [inputComponent, uploadImageFn, loadingUpload] = useUploadImage(uid, 'coverPhotos', 'coverPhotoUrl')
	
	return <ShadowedImageContainer coverPhotoUrl={coverPhotoUrl} loadingUpload={loadingUpload}>
		{inputComponent}
		<PositionedPupikIcon withoutHref={withoutHref}/>
		{showEditPhotoIcon ? <CameraContainer onClick={uploadImageFn}>
			<CameraIcon/>
		</CameraContainer> : null}
	</ShadowedImageContainer>
	
}