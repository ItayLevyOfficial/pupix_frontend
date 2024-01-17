import styled from 'styled-components'
import {useRedirectToLoginIfNeeded} from '../userProfile/useRedirectToLoginIfNeeded'
import {useRedirectToStripeDashboard} from '../userProfile/useRedirectToStripeDashboard'
import React, {useState} from 'react'
import {useCurrentFirebaseUser} from '../generalHelpers/firebaseUserHook'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import {useFirestoreDocumentData} from '../generalHelpers/firestoreDocData'
import {useRouter} from 'next/router'
import {isValidMinuteWage, isValidPhoneNumber, onlyDigits} from './formValidation'
import {userDocRef, userPIDocRef} from '../generalHelpers/firestorePaths'
import {NextSeo} from 'next-seo'
import {EditProfileInputAndTitle} from './editProfileInputAndTitle'
import {EditPhoneNumberInput} from './editPhoneNumberInput'
import {EditProfileButton} from './editProfileButton'
import BankIcon from '../icons/bankIcon.svg'
import LogoutIcon from '../icons/logoutIcon.svg'
import DeleteAccountIcon from '../icons/deleteAccount.svg'
import {NextButton} from '../newCheckoutFlow/videoCallLength'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {LogoLoadingScreen} from '../generalComponents/logoLoadingScreen'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import {UserProfileTopBar} from '../userProfile/coverPhotoTopBar'
import {EditablePhoto} from './editablePhoto'
import {userProfilePhotoDiameter} from '../userProfile/userProfile'

export const EditProfileContainer = styled(FullDisplayCenteredColumn)`
  background-color: #F0F0F0;
`
export const EditProfileTopBar = styled.div`
  width: 100vw;
  padding: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  z-index: 10;
`
export const EditProfile = (props) => {
	useRedirectToLoginIfNeeded()
	const [redirectToStripe, redirecting] = useRedirectToStripeDashboard()
	const [savingUserData, setSavingUserData] = useState(false)
	const [deletingAccount, setDeletingAccount] = useState(false)
	const currentUser = useCurrentFirebaseUser()
	const userDocPath = currentUser ? firebase.firestore().collection('users').doc(currentUser.uid) : ''
	const [userDocData, setUserDocData] = useFirestoreDocumentData(userDocPath)
	const [userPIDocData, setUserPIDocData] = useFirestoreDocumentData(currentUser ?
		firebase.firestore().collection('usersPrivateInfo').doc(currentUser.uid) : '')
	const router = useRouter()
	
	const isFormValid = () => {
		return isValidMinuteWage(userDocData?.minuteWage) && isValidPhoneNumber(userPIDocData?.phoneNumber) &&
			userDocData?.displayName
	}
	
	const saveUserData = async () => {
		setSavingUserData(true)
		try {
			const saveUserDoc = userDocRef(currentUser.uid).update(userDocData)
			const saveUserPIDoc = userPIDocRef(currentUser.uid).update(userPIDocData)
			await Promise.all([saveUserDoc, saveUserPIDoc])
		} catch (error) {
			setSavingUserData(false)
		}
		router.push('/user-profile')
	}
	
	const handleMinuteWageChange = event => {
		const newMinuteWage = event.target.value.replace('$ ', '')
		if (onlyDigits(newMinuteWage) && newMinuteWage.length < 5) {
			setUserDocData({...userDocData, minuteWage: newMinuteWage})
		}
	}
	
	const handleLogout = async () => {
		if (window.confirm('Sure you want to log out?')) {
			await firebase.auth().signOut()
			router.replace('/login')
		}
	}
	
	const handleDeleteAccount = async () => {
		if (window.confirm('Sure you want to delete your account?')) {
			setDeletingAccount(true)
			await firebase.functions().httpsCallable('deleteAccount')()
			router.replace('/login')
		}
	}
	
	if (userDocData && userPIDocData) {
		return (
			<>
				<NextSeo noindex/>
				<EditProfileContainer style={{minHeight: window.innerHeight}}>
					<UserProfileTopBar coverPhotoUrl={userDocData?.coverPhotoUrl} showEditPhotoIcon
					                   uid={currentUser?.uid} withoutHref/>
					<EditablePhoto addresseeUid={currentUser?.uid} photoUrl={userDocData?.photoURL}
					               style={{marginTop: -userProfilePhotoDiameter / 2}}/>
					<SizedBox height={20}/>
					<EditProfileInputAndTitle
						value={userDocData.displayName}
						title='Display Name'
						handleChange={event => {
							const newDisplayName = event.target.value
							setUserDocData({...userDocData, displayName: newDisplayName})
						}}
						validValue={userDocData.displayName}
					/>
					<EditPhoneNumberInput
						style={{marginBottom: '20px'}}
						phoneNumber={userPIDocData?.phoneNumber}
						handleChange={newPhoneNumber => setUserPIDocData(
							currentData => { return {...currentData, phoneNumber: newPhoneNumber}})}
					/>
					<EditProfileInputAndTitle
						value={`$ ${userDocData.minuteWage}`} title='Minute Wage' handleChange={handleMinuteWageChange}
						validValue={isValidMinuteWage(userDocData.minuteWage)}/>
					<EditProfileButton
						style={{marginBottom: '20px'}} text='Edit Bank Account' handleClick={redirectToStripe}
						Icon={BankIcon} loading={redirecting}/>
					<EditProfileButton
						style={{marginBottom: '20px'}} text='Log out' handleClick={handleLogout}
						Icon={LogoutIcon}/>
					<EditProfileButton style={{marginBottom: '30px'}} handleClick={handleDeleteAccount}
					                   text='Delete Account' Icon={DeleteAccountIcon} loading={deletingAccount}/>
					<NextButton disabled={!isFormValid() || savingUserData} onClick={saveUserData}
					            loading={savingUserData} arrow={false}>
						Save
					</NextButton>
					<SizedBox height={30}/>
				</EditProfileContainer>
			</>
		)
	} else {
		return <LogoLoadingScreen/>
	}
}
export default EditProfile