import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {environment} from '../generalHelpers/constants'
import firebase from 'firebase/app'
import 'firebase/functions'
import {NextSeo} from 'next-seo'
import {AlignedCenteredRow, FullDisplayCenteredColumn} from '../generalComponents/containers'
import SuccessIcon from '../icons/successIcon.svg'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {NextButton} from '../newCheckoutFlow/videoCallLength'
import styled from 'styled-components'
import StarIcon from '../icons/starIcon.svg'
import {MediumTitle, PaddedMediumTitle} from './creatorHungUp'
import {PositionedBluePupikIcon} from '../generalComponents/logoLoadingScreen'

const ColoredStar = styled(StarIcon)`
  & > path {
    fill: ${props => props.isfilled ? 'var(--new-main-color)' : '#b9b9b9'};
  }
`

export const RateYourExperience = () => {
	const [rating, setRating] = useState(0)
	const [savingData, setSavingData] = useState(false)
	const router = useRouter()
	
	let {creatorUsername, roomId} = router.query ?? {}
	
	if (!creatorUsername && environment === 'testing') {
		[creatorUsername, roomId] = ['itaylevy134', 'testingId']
	}
	
	useEffect(() => {
		if (!creatorUsername && environment !== 'testing') {
			router.replace('/user-profile')
		}
	}, [creatorUsername, router])
	
	const saveCallRating = async () => {
		setSavingData(true)
		try {
			await firebase.functions().httpsCallable('rateCall')({callRating: rating, callId: roomId})
			router.push(`/${creatorUsername}`)
		} catch (error) {
			router.push(`/${creatorUsername}`)
		}
	}
	
	const stars = () => {
		return [1, 2, 3, 4, 5].map(
			value => <ColoredStar
				key={value} style={{marginRight: '15px'}} isfilled={rating >= value} onClick={() => setRating(value)}/>
		)
	}
	
	return (
		<>
			<NextSeo noindex/>
			<FullDisplayCenteredColumn>
				<PositionedBluePupikIcon/>
				<PaddedMediumTitle>
					Call completed.
				</PaddedMediumTitle>
				<SuccessIcon style={{width: '200px', marginBottom: '30px'}}/>
				<MediumTitle style={{margin: '0 30px 30px'}}>
					Rate your experience {creatorUsername ? ` with ${creatorUsername}` : ''}
				</MediumTitle>
				<AlignedCenteredRow style={{marginBottom: 'auto'}}>
					{stars()}
				</AlignedCenteredRow>
				<SizedBox height={30}/>
				<NextButton onClick={saveCallRating} loading={savingData}>
					Save & Continue
				</NextButton>
				<SizedBox height={30}/>
			</FullDisplayCenteredColumn>
		</>
	)
}
