import {CenteredColumn} from '../generalComponents/containers'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import React from 'react'
import {useRouter} from 'next/router'
import {NextSeo} from 'next-seo'
import {PupikTopBar} from '../pages/terms'
import {NewBootstrapActionButton} from '../pages'
import {PupikFooter} from '../generalComponents/pupikFooter'
import {
	LeftHalfRect,
	NumberCircle,
	OverlayContainer,
	PaddedSecondTitle,
	PaddedSmallParagraph,
	RightHalfRect,
	SeparatorLine,
	SmallerCenteredExplanationText,
	Title
} from './howItWorksComponents'
import {HowItWorksCard} from './howItWorksCard'
import {useEmblaCarousel} from 'embla-carousel/react'
import styled from 'styled-components'

const Embla = styled.div`
  overflow: hidden;
`

const EmblaContainer = styled.div`
  display: flex;
  width: 100vw;
`

export const HowItWorks = () => {
	const router = useRouter()
	const cardsData = require('./cardsData.json')
	const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})
	
	return (
		<>
			<NextSeo
				title='How it Works - Pupix'
				description='How does Pupix work? Get started in three easy steps! Sign up, sell video calls & start earning money today!'
			/>
			<CenteredColumn>
				<PupikTopBar withTopTen/>
				<SizedBox height={40}/>
				<NumberCircle>
					1
				</NumberCircle>
				<OverlayContainer>
					<RightHalfRect/>
					<NumberCircle>
						2
					</NumberCircle>
					<Title style={{position: 'absolute', top: '20px'}}>Sign Up</Title>
					<SmallerCenteredExplanationText style={{position: 'absolute', top: '55px'}}>
						Getting started is easy! Sign up for your FREE account today!
					</SmallerCenteredExplanationText>
				</OverlayContainer>
				<OverlayContainer>
					<LeftHalfRect/>
					<NumberCircle>
						3
					</NumberCircle>
					<Title style={{position: 'absolute', top: '20px'}}>Sell Calls</Title>
					<SmallerCenteredExplanationText style={{position: 'absolute', top: '55px'}}>
						Sell video sessions & make your clients send tips during the call!
					</SmallerCenteredExplanationText>
				</OverlayContainer>
				<OverlayContainer>
					<Title style={{marginTop: '20px'}}>Earn Money!</Title>
					<SmallerCenteredExplanationText style={{position: 'absolute', top: '55px'}}>
						Pupix will send the funds to your bank account within three business days!
					</SmallerCenteredExplanationText>
				</OverlayContainer>
				<SeparatorLine style={{marginTop: '90px'}}/>
				<SizedBox height={40}/>
				<Embla className="embla" ref={emblaRef}>
					<EmblaContainer className="embla__container">
						{Object.keys(cardsData)
							?.map(key => <HowItWorksCard key={key} cardData={cardsData[key]} emblaApi={emblaApi}/>)}
					</EmblaContainer>
				</Embla>
				<SizedBox height={40}/>
				<SeparatorLine/>
				<SizedBox height={30}/>
				<PaddedSecondTitle>
					What percentage does Pupix take?
				</PaddedSecondTitle>
				<SizedBox height={15}/>
				<PaddedSmallParagraph>
					Pupix takes only 10% of all transactions on the platform.
				</PaddedSmallParagraph>
				<SizedBox height={40}/>
				<NewBootstrapActionButton onClick={() => router.push('/login')}>
					Join for Free
				</NewBootstrapActionButton>
				<SizedBox height={40}/>
				<PupikFooter/>
			</CenteredColumn>
		</>
	)
}