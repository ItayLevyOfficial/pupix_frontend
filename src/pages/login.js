import {PupixIcon} from '../icons/pupixIcon.js'
import TwitterIcon from '../icons/twitter_icon.svg'
import React, {useEffect, useState} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {LogoLoadingScreen} from '../generalComponents/logoLoadingScreen'
import styled from 'styled-components'
import * as constants from '../generalHelpers/constants'
import {FullDisplayCenteredColumn, FullWidthColumn} from '../generalComponents/containers'
import {LinkWithUnderLine} from '../generalComponents/linkWithUnderline'
import {documentRef, userDocRef, userPIDocRef} from '../generalHelpers/firestorePaths'
import {isFinishedRegistration} from '../userProfile/useRedirectToLoginIfNeeded'
import {useRouter} from 'next/router'
import {NextSeo} from 'next-seo'
import {PupikFooter} from '../generalComponents/pupikFooter'

export const TermsParagraph = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
`

export const LoginButton = styled.button`
  height: 50px;
  border-radius: 25px;
  padding-right: 30px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
  border: none;
  outline: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  color: ${constants.mainTextColor};
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
`

const LoginPageContainer = styled(FullDisplayCenteredColumn)`
  background-color: var(--new-main-color);
`

// The list of the Pupik marketing agents twitter usernames.
export const pupikMarketingAgents = []

export const LoginPage = () => {
	const [loadingLogin, setLoadingLogin] = useState(false)
	const router = useRouter()
	
	useEffect(() => {
		firebase.auth().getRedirectResult().then(async results => {
			if (results?.user) {
				setLoadingLogin(true)
				const userPIDoc = await userPIDocRef(results.user.uid).get()
				const userDoc = await userDocRef(results.user.uid).get()
				if (isFinishedRegistration(userPIDoc?.data(), userDoc?.data())) {
					router.replace('/user-profile')
				} else {
					const registeredByTwitterUsername = sessionStorage.getItem('registeredBy')
					if (registeredByTwitterUsername) {
						documentRef(results.user.uid, 'registeredBy').set({
							registeredBy: registeredByTwitterUsername
						}).catch(() => {})
					}
					router.push('/registration')
				}
			} else {
				setLoadingLogin(false)
			}
		})
	}, [router])
	
	useEffect(() => {
		return firebase.auth().onAuthStateChanged(async user => {
			if (user?.providerData[0]) {
				const userPIDoc = await userPIDocRef(user.uid).get()
				const userDoc = await userDocRef(user.uid).get()
				if (isFinishedRegistration(userPIDoc?.data(), userDoc?.data()) && window.location.pathname ===
					'/login') {
					router.replace('/user-profile')
				}
			}
		})
	}, [router])
	
	const loginWithTwitter = async () => {
		setLoadingLogin(true)
		const provider = new firebase.auth.TwitterAuthProvider()
		await firebase.auth().signInWithRedirect(provider)
	}
	
	return (
		<>
			<NextSeo
				title='Login - Pupix'
				description='Join Pupix for FREE, sell live, private & secure video sessions & start earning money today!'
			/>
			{
				(
					loadingLogin ? <LogoLoadingScreen/> : (
						<FullWidthColumn>
							<LoginPageContainer>
								<PupixIcon style={{marginTop: '20vh', marginBottom: '40px'}} width='230px'
								           onClick={() => router.push('/')}/>
								<TermsParagraph style={{marginBottom: '10px'}}>
									Video sessions are made simple.
								</TermsParagraph>
								<TermsParagraph style={{marginBottom: '30px'}}>
									<LinkWithUnderLine href='/how-it-works'>
										Learn how it works
									</LinkWithUnderLine>
								</TermsParagraph>
								<TermsParagraph style={{margin: 'auto 30px 20px'}}>
									{'By clicking login, you agree with our '}
									<LinkWithUnderLine style={{color: 'white'}} href='/terms'>
										Terms
									</LinkWithUnderLine>
									{'. '}
									{'Learn how we process your data in our '}
									<LinkWithUnderLine style={{color: 'white'}} href='./privacy-policy'>
										Privacy Policy
									</LinkWithUnderLine>
									.
								</TermsParagraph>
								<LoginButton
									style={{marginBottom: '30px'}}
									onClick={loginWithTwitter}>
									<TwitterIcon style={{marginRight: '20px'}}/>
									LOG IN WITH TWITTER
								</LoginButton>
							</LoginPageContainer>
							<PupikFooter/>
						</FullWidthColumn>
					)
				)
			}
		</>
	)
}

export default LoginPage