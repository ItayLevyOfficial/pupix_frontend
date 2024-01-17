import styled from 'styled-components'
import RightArrow from './rightArrow.svg'
import {CenteredExplanationText} from '../videoRoomScreens/creatorHungUp'
import Row from 'react-bootstrap/Row'
import {CenteredContainer, Column} from '../generalComponents/containers'
import HalfRect from '../icons/sideRect.svg'
import React from 'react'
import {gentleBlackColor} from '../generalHelpers/generalStyles'

const HorizontalLine = styled.div`
  height: 4px;
  width: calc(50vw - 60px);
  background-color: var(--new-main-color);
`
export const RightHalfRect = () => {
	return (
		<Row style={{marginRight: '20px', alignSelf: 'flex-end', marginBottom: '-22px', marginTop: '-22px'}}>
			<Column>
				<HorizontalLine style={{marginBottom: '176px'}}/>
				<HorizontalLine/>
			</Column>
			<HalfRect/>
		</Row>
	)
}
export const LeftHalfRect = () => {
	return (
		<Row style={{
			marginLeft: '20px',
			alignSelf: 'flex-start',
			marginBottom: '-22px',
			marginTop: '-22px',
			transform: 'scaleX(-1)'
		}}>
			<Column>
				<HorizontalLine style={{marginBottom: '176px'}}/>
				<HorizontalLine/>
			</Column>
			<HalfRect/>
		</Row>
	)
}
export const NumberCircle = styled(CenteredContainer)`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-color: var(--new-main-color);
  font-size: 18px;
  font-weight: bolder;
  color: white;
`
export const OverlayContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  position: relative;
  flex-direction: column;
`
export const Title = styled.h1`
  font-size: 18px;
  letter-spacing: 0.3px;
  ${gentleBlackColor};
`
export const SeparatorLine = styled.div`
  height: 0.5px;
  width: min(calc(100vw - 140px), 350px);
  background-color: var(--new-main-color);
`
export const SmallerCenteredExplanationText = styled(CenteredExplanationText)`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  width: 100%;
  padding: 0 20px;
`
export const SecondTitle = styled.h1`
  font-size: 20px;
  letter-spacing: 0.3px;
  font-weight: normal;
  ${gentleBlackColor};
  align-self: flex-start;
  margin-bottom: 0;
`
export const PaddedSecondTitle = styled(SecondTitle)`
  margin: 0 40px;
`
export const SmallParagraph = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.3px;
  text-align: start;
  margin-bottom: 0;
`
const RaisedRightArrow = styled(RightArrow)`
  z-index: 1;
`
export const PaddedSmallParagraph = styled(SmallParagraph)`
  align-self: flex-start;
  margin: 0 40px;
`
export const PositionedLeftArrow = styled(RaisedRightArrow)`
  transform: scaleX(-1);
  position: absolute;
  left: 15px;
  top: calc(50% - 10px);
`
export const PositionedRightArrow = styled(RaisedRightArrow)`
  position: absolute;
  right: 15px;
  top: calc(50% - 10px);
`