import {NextImageContainer} from '../generalComponents/profilePhotoWithLoading'
import {PositionedLeftArrow, PositionedRightArrow, SecondTitle, SmallParagraph} from './howItWorksComponents'
import Image from 'next/image'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import React from 'react'
import styled from 'styled-components'
import {PaddedFullWidthColumn} from '../newCheckoutFlow/checkoutScreen/checkoutScreenHelpers'

const RelativeCardContainer = styled(PaddedFullWidthColumn)`
  position: relative;
`

export const HowItWorksCard = ({cardData, emblaApi}) => <RelativeCardContainer padding='40px'>
	<NextImageContainer width='calc(100vw - 80px)'>
		<PositionedLeftArrow onClick={emblaApi?.scrollPrev}/>
		<PositionedRightArrow onClick={emblaApi?.scrollNext}/>
		<Image src={cardData.imageSrc} layout='responsive' width={295} height={155} objectFit='cover' priority/>
	</NextImageContainer>
	<SizedBox height={25}/>
	<SecondTitle>{cardData?.title}</SecondTitle>
	<SizedBox height={15}/>
	<SmallParagraph>{cardData?.paragraph}</SmallParagraph>
</RelativeCardContainer>