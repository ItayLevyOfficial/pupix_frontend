import React from 'react'
import {AlignedCenteredRow, FullWidthCenteredColumn} from './containers'
import styled, {keyframes} from 'styled-components'
import {PupixIcon} from '../icons/pupixIcon'
import NewPupikIconWithBackground from '../icons/newPupixIconWithBackground.svg'

export const LoadingPageTitle = styled.h1`
  font-size: 30px;
  color: var(--new-main-color);
  text-align: center;
  font-weight: normal;
`

const LoadingAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.15);
  }
`

const AnimatedPupikIcon = styled(NewPupikIconWithBackground)`
  animation-name: ${LoadingAnimation};
  animation-direction: alternate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  width: 170px;
`

export function LogoLoadingScreen({loadingText = 'Loading...'}) {
	return (
		<FullWidthCenteredColumn>
			<LoadingPageTitle style={{margin: '17vh 20px 50px'}}>
				{loadingText}
			</LoadingPageTitle>
			<AlignedCenteredRow style={{height: '200px'}}>
				<AnimatedPupikIcon/>
			</AlignedCenteredRow>
		</FullWidthCenteredColumn>
	)
}

export const PositionedPupikIcon = styled(PupixIcon)
	.attrs(props => ({
		width: '60px',
		onClick: props.withoutHref ? null : () => window.location = props.href ?? '/'
	}))`
  position: absolute;
  top: 20px;
  left: 20px;
`

export const PositionedBluePupikIcon = styled(PositionedPupikIcon).attrs({fillColor: 'var(--new-main-color)'})``