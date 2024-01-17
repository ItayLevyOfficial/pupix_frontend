import React, {useCallback, useEffect, useRef, useState} from 'react'
import EditIcon from '../icons/editIcon.svg'
import firebase from 'firebase/app'
import 'firebase/storage'
import {userDocRef} from '../generalHelpers/firestorePaths'
import styled from 'styled-components'
import {ProfilePhotoWithBorder} from '../newCheckoutFlow/TopPupikBar'
import {userProfilePhotoDiameter} from '../userProfile/userProfile'
import Skeleton from '@material-ui/lab/Skeleton'
import {ProfileImageContainer} from '../generalComponents/profilePhotoWithLoading'

export const FloatingCircleButton = styled.button`
  padding: ${props => props.padding};
  border-radius: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background-color: var(--new-main-color);
  z-index: 5;
`

/**
 * A hook used to enable easy upload of the user cover & profile photo.
 *
 * @param uid: The user firebase uid.
 * @param storageCollectionName: The collection where to store the photo in firebase storage.
 * @param userDocFieldName: The field name in the user document of the image url.
 * @return {(JSX.Element|(function(): *)|boolean)[]}: The hidden input component that should be included in the
 * document, the upload image function and the isLoading variable.
 */
export const useUploadImage = (uid, storageCollectionName, userDocFieldName) => {
	const [loadingUploadImage, setLoadingUploadImage] = useState(false)
	const inputImageRef = useRef()
	
	const uploadImage = useCallback(async (event) => {
		setLoadingUploadImage(true)
		let firstFile = event.target.files[0]
		const profilePhotoRef = firebase.storage().ref(`${storageCollectionName}/${uid}`)
		await profilePhotoRef.put(firstFile)
		await userDocRef(uid).set(
			{
				[userDocFieldName]: await profilePhotoRef.getDownloadURL()
			}, {
				merge: true
			}
		)
		setLoadingUploadImage(false)
	}, [storageCollectionName, userDocFieldName, uid])
	
	useEffect(() => {
		const currentImageRef = inputImageRef?.current
		if (currentImageRef) {
			currentImageRef.addEventListener('change', uploadImage)
			return () => currentImageRef.removeEventListener('change', uploadImage)
		}
	})
	
	return [
		<input type={'file'} accept={'image/*'} hidden={true} multiple={false} ref={inputImageRef} key='photoInput'/>,
		() => inputImageRef?.current?.click(),
		loadingUploadImage
	]
}

const ForwardedSkeleton = styled(Skeleton)`
  z-index: 5;
`

export const EditablePhoto = ({photoUrl, addresseeUid, style = {}, ...props}) => {
	const [inputComponent, uploadImageFn, loadingUpload] = useUploadImage(addresseeUid, 'profilePhotos', 'photoURL')
	
	return (
		<>
			{loadingUpload ? <ForwardedSkeleton variant='circle' style={style}><ProfileImageContainer
					diameter={`${userProfilePhotoDiameter}px`}/></ForwardedSkeleton> :
				<ProfilePhotoWithBorder diameter={`${userProfilePhotoDiameter}px`} photoUrl={photoUrl}
				                        style={style} {...props} loadingSrc={false}/>}
			{inputComponent}
			<FloatingCircleButton
				padding='15px'
				style={{
					marginTop: `calc((${userProfilePhotoDiameter / 2}px - 10px) * -1)`,
					marginLeft: `${userProfilePhotoDiameter / 2 + 10}px`
				}} onClick={uploadImageFn}>
				<EditIcon/>
			</FloatingCircleButton>
		</>
	)
}