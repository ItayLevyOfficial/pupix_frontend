import React from 'react'
import {AlignedCenteredRow, CenteredColumn} from '../generalComponents/containers'
import styled, {keyframes} from 'styled-components'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import Skeleton from '@material-ui/lab/Skeleton'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {ProfilePhotoWithLoading} from '../generalComponents/profilePhotoWithLoading'
import {CheckoutFlowTopBar} from '../userProfile/coverPhotoTopBar'
import {checkoutSlideAnimationDuration} from './newCheckoutFlow'

const profilePhotoDiameter = '100px'

const Title = styled.h1`
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: 0.2px;
  ${gentleBlackColor};
  font-weight: normal;
  padding: 0;
  margin: 0 20px;
  text-align: center;
`

const showAndFade = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
`

const BlueTitle = styled.h2`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  color: var(--new-main-color);
  letter-spacing: 0.5px;
  font-weight: normal;
`

const GreenDot = styled.div`
  animation-name: ${showAndFade};
  animation-iteration-count: infinite;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-timing-function: linear;
  height: 8px;
  width: 8px;
  border-radius: 100%;
  background-color: #00F06F;
`

const GreyLine = styled.div`
  height: 10px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
`

export const BlueLine = styled.div`
  height: 10px;
  width: 33.33333334vw;
  background-color: var(--new-main-color);
  border-radius: 0 2px 2px 0;
  transform-origin: left;
  transform: scaleX(${props => props.checkoutLevel + 1});
  transition: ${props => props.isGoBack ? 'none' : `transform ${checkoutSlideAnimationDuration}`};
`

const ProgressBar = ({isGoBack, checkoutLevel}) => {
	return (
		<GreyLine isGoBack={isGoBack}>
			<BlueLine checkoutLevel={checkoutLevel} isGoBack={isGoBack}/>
		</GreyLine>
	)
}

const BorderedProfilePhoto = styled(ProfilePhotoWithLoading)`
  border: 3px solid white;
`

const ProfilePhotoShadowContainer = styled.div`
  border-radius: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  z-index: 1;
`

export const ProfilePhotoWithBorder = ({photoUrl, diameter, loadingSrc, ...props}) => (
	<ProfilePhotoShadowContainer {...props}>
		<BorderedProfilePhoto src={photoUrl} diameter={diameter} loadingSrc={loadingSrc}/>
	</ProfilePhotoShadowContainer>
)

export const TopPupikBar = ({checkoutLevel, isGoBack, addresseeData, ...props}) => {
	return (
		<CenteredColumn {...props} >
			<CheckoutFlowTopBar coverPhotoUrl={addresseeData?.coverPhotoUrl}/>
			<ProfilePhotoWithBorder photoUrl={addresseeData?.photoURL} diameter={profilePhotoDiameter}
			                        style={{marginTop: `calc(${profilePhotoDiameter} * -1 / 2)`}}
			                        loadingSrc={!addresseeData}/>
			<SizedBox height={15}/>
			<Title isGoBack={isGoBack}>
				{addresseeData ? addresseeData.displayName : <Skeleton width='150px'/>}
			</Title>
			<SizedBox height={10}/>
			<AlignedCenteredRow>
				{addresseeData?.isAvailable ? <GreenDot style={{marginRight: '10px'}}/> : null}
				<BlueTitle>
					{addresseeData ? addresseeData.isAvailable ? 'AVAILABLE NOW' : 'NOT AVAILABLE' :
						<Skeleton width='100px'/>}
				</BlueTitle>
			</AlignedCenteredRow>
			<SizedBox height={15}/>
			{addresseeData ? <ProgressBar isGoBack={isGoBack} checkoutLevel={checkoutLevel}/> :
				<Skeleton variant='rect'><ProgressBar/></Skeleton>}
		</CenteredColumn>
	)
}