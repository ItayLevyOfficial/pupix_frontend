import styled, {css} from 'styled-components'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Skeleton from '@material-ui/lab/Skeleton'

export const hiddenOverflow = css`
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
`

export const NextImageContainer = styled.div`
  flex: none;
  position: relative;
  height: ${props => props.height ?? 'auto'};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth ?? 'auto'};
`

export const ProfileImageContainer = styled.div`
  flex: none;
  position: relative;
  height: ${props => props.diameter};
  width: ${props => props.diameter};
  z-index: 1;
  ${hiddenOverflow};
  border-radius: 100%;
  background-color: white;
`

/**
 * @param diameter: The profile image diameter, in pixels.
 * @param imageID: Needed to check if the image is ready for cache, since onLoad not call in that case. Have to be a
 * unique identifier only to that image.
 */
export const ProfilePhotoWithLoading = ({src, imageID = 'imageID', loadingSrc, ...props}) => {
	const [loadingPhoto, setLoadingPhoto] = useState(true)
	const [error, setError] = useState(false)
	
	useEffect(() => {
		if (document.querySelector(`#${imageID}`)?.complete) {
			setLoadingPhoto(false)
		}
	}, [imageID])
	
	const photoSrc = error ? '/no_profile_photo.jpg' : src ? src : '/no_profile_photo.jpg'
	
	return (
		<>
			<ProfileImageContainer hidden={loadingPhoto || loadingSrc} {...props}>
				{src || !loadingSrc ? (
					<Image id={imageID}
					       priority layout='fill' objectFit='cover' quality={100}
					       src={photoSrc}
					       onError={() => setError(true)}
					       onLoad={() => setLoadingPhoto(false)}
					/>
				) : null}
			</ProfileImageContainer>
			{loadingPhoto || loadingSrc ?
				<Skeleton variant='circle'><ProfileImageContainer {...props}/></Skeleton> : null}
		</>
	)
}