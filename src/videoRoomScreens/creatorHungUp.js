import {useRouter} from 'next/router'
import {environment} from '../generalHelpers/constants'
import React, {useEffect} from 'react'
import {NextSeo} from 'next-seo'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import SadFace from '../icons/sadFaceIcon.svg'
import styled, {css} from 'styled-components'
import {ExplanationText} from '../generalHelpers/fonts'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import {NextButton} from '../newCheckoutFlow/videoCallLength'
import {PositionedBluePupikIcon} from '../generalComponents/logoLoadingScreen'

export const handleTooLongText = css`
  max-width: calc(100vw - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
`
export const MediumTitle = styled.h1`
  font-size: 23px;
  ${gentleBlackColor};
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.2px;
  line-height: 1.4;
  white-space: pre-line;
  ${handleTooLongText};
`
export const CenteredExplanationText = styled(ExplanationText)`
  text-align: center;
  ${handleTooLongText};
`
export const PaddedNextButton = styled(NextButton)`
  margin: 30px 0;
`
export const PaddedMediumTitle = styled(MediumTitle)`
  margin: 60px 20px 30px;
`
export const CreatorHungUp = () => {
	const router = useRouter()
	let {creatorUsername, message} = router.query
	
	if (!message && environment === 'testing') {
		[creatorUsername, message] =
			['ItayLev49903425', 'The creator missed the call.']
	}
	
	useEffect(() => {
		if (!message && environment !== 'testing') {
			router.replace('/user-profile')
		}
	}, [message, router])
	
	return (
		<>
			<NextSeo noindex/>
			<FullDisplayCenteredColumn>
				<PositionedBluePupikIcon/>
				<PaddedMediumTitle style={{marginBottom: 5}}>
					{message}
				</PaddedMediumTitle>
				<MediumTitle style={{marginBottom: '50px'}}>
					We will not charge you.
				</MediumTitle>
				<SadFace style={{width: '200px', marginBottom: 'auto'}}/>
				<PaddedNextButton onClick={() => router.push(`/${creatorUsername}`)}>
					Next
				</PaddedNextButton>
			</FullDisplayCenteredColumn>
		</>
	)
}
