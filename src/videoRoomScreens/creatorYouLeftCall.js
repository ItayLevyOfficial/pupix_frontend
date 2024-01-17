import {useRouter} from 'next/router'
import {addresseeAnsweredTooLateTitle, environment} from '../generalHelpers/constants'
import React, {useEffect} from 'react'
import {NextSeo} from 'next-seo'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import {PaddedMediumTitle, PaddedNextButton} from './creatorHungUp'
import SadFace from '../icons/sadFaceIcon.svg'
import {SpacedCenteredExplanationText} from './outgoingCall'
import {HomePupikIcon} from './earningsCongratulations'

export const CreatorYouLeftCallScreen = () => {
	const router = useRouter()
	let title = router.query?.title
	
	if (!title && environment === 'testing') {
		title = 'You left the call in the middle, so the client got refunded.'
	}
	
	useEffect(() => {
		if (!title && environment !== 'testing') {
			router.replace('/user-profile')
		}
	}, [router, title])
	
	return (
		<>
			<NextSeo noindex/>
			<FullDisplayCenteredColumn>
				<HomePupikIcon/>
				<PaddedMediumTitle>{title}</PaddedMediumTitle>
				<SadFace style={{width: '200px', marginBottom: '30px'}}/>
				<SpacedCenteredExplanationText style={{margin: '0 30px auto'}}>
					{
						addresseeAnsweredTooLateTitle === title ? (
								'You have two minutes to accept a call before the client gets refunded.') :
							'If you think it is wrong, contact our support at support@pupix.com.'
					}
				</SpacedCenteredExplanationText>
				<PaddedNextButton onClick={() => router.push('/user-profile')}>
					Next
				</PaddedNextButton>
			</FullDisplayCenteredColumn>
		</>
	)
}