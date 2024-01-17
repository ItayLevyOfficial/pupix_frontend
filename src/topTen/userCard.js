import {AlignedCenteredRow, Column} from '../generalComponents/containers'
import React from 'react'
import styled from 'styled-components'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import StarIcon from '../icons/blueStarIcon.svg'
import Skeleton from '@material-ui/lab/Skeleton'
import {ProfilePhotoWithLoading} from '../generalComponents/profilePhotoWithLoading'

const CardContainer = styled(AlignedCenteredRow)`
  min-width: 270px;
  width: calc(100vw - 40px);
  max-width: 400px;
  border-radius: 15px;
  border: 0.7px solid rgba(0, 0, 0, 0.25);
  padding: 15px 5px 15px 15px;
`

const NumberTitle = styled.h2`
  color: var(--new-main-color);
  font-size: 20px;
  letter-spacing: 0.3px;
  font-weight: normal;
  margin: 0;
`

const DisplayNameTitle = styled(NumberTitle)`
  ${gentleBlackColor};
  line-height: 1.3;
  font-size: 18px;
  letter-spacing: 0;
`

const CardBottomText = styled.h3`
  font-weight: normal;
  ${gentleBlackColor};
  margin: 0;
  font-size: 12px;
  line-height: 1;
`

const FadedCardBottomText = styled(CardBottomText)`
  color: rgba(0, 0, 0, 0.4);
`

const BottomSeparator = styled.div`
  width: 0.5px;
  height: 15px;
  background-color: var(--new-main-color);
`

export const UserCard = ({userDocData, place, ...props}) => {
	const isLoadedUserCard = userDocData.averageRating
	
	return (
		<CardContainer {...props} onClick={() => {
			if (userDocData?.twitterUsername) {
				window.location.href = `/${userDocData?.twitterUsername}`
			}
		}}>
			<NumberTitle>
				#{place}
			</NumberTitle>
			<SizedBox width={15}/>
			{isLoadedUserCard ? <ProfilePhotoWithLoading diameter='60px' src={userDocData?.photoURL}/> :
				<Skeleton variant='circle' height={60} width={60}/>}
			<SizedBox width={15}/>
			<Column>
				<DisplayNameTitle>{isLoadedUserCard ? userDocData.displayName :
					<Skeleton width='100px'/>}</DisplayNameTitle>
				<SizedBox height={20}/>
				{isLoadedUserCard ? <AlignedCenteredRow>
					<StarIcon/>
					<SizedBox width={5}/>
					<CardBottomText>
						{userDocData.averageRating.toFixed(1)}
					</CardBottomText>
					<SizedBox width={5}/>
					<FadedCardBottomText>
						({userDocData.callsAmount})
					</FadedCardBottomText>
					<SizedBox width={10}/>
					<BottomSeparator/>
					<SizedBox width={10}/>
					<CardBottomText>
						<strong>${userDocData.minuteWage}</strong> / minute
					</CardBottomText>
				</AlignedCenteredRow> : <Skeleton width='150px' height='12px'/>}
			</Column>
		</CardContainer>
	)
}

export const PaddedUserCard = styled(UserCard)`
  margin-bottom: 30px;
`