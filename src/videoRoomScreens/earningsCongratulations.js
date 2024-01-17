import {useRouter} from 'next/router'
import {environment} from '../generalHelpers/constants'
import React, {useEffect} from 'react'
import {NextSeo} from 'next-seo'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import SuccessIcon from '../icons/successIcon.svg'
import {CenteredSmallExplanationText} from '../generalHelpers/fonts'
import {MediumTitle, PaddedMediumTitle, PaddedNextButton} from './creatorHungUp'
import {PositionedBluePupikIcon} from '../generalComponents/logoLoadingScreen'

export const HomePupikIcon = () => (<PositionedBluePupikIcon href='/user-profile'/>)

export function EarningsCongratulationsPage() {
	const router = useRouter()
	
	let {earningsAmount} = router?.query ?? {}
	
	if (!earningsAmount && environment === 'testing') {
		earningsAmount = '57'
	}
	
	useEffect(() => {
		if (!earningsAmount && environment !== 'testing') {
			router.replace('/user-profile')
		}
	}, [router, earningsAmount])
	
	return (
		<>
			<NextSeo noindex/>
			<FullDisplayCenteredColumn>
				<HomePupikIcon/>
				<PaddedMediumTitle>Congratulations!<br/>Call completed.</PaddedMediumTitle>
				<SuccessIcon style={{marginBottom: '30px', width: '200px'}}/>
				<MediumTitle style={{marginBottom: '10px'}}>
					{`Total session revenue: $${earningsAmount}`}
				</MediumTitle>
				<CenteredSmallExplanationText style={{margin: '0 30px auto'}}>
					We will send the money to your bank account within three business days.
				</CenteredSmallExplanationText>
				<PaddedNextButton onClick={() => router.push('/user-profile')}>
					Next
				</PaddedNextButton>
			</FullDisplayCenteredColumn>
		</>
	)
}
