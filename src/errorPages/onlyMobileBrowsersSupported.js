import React from 'react'
import {CenteredColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import PupikIcon from '../icons/newPupixIconWithBackground.svg'
import {gentleBlackColor} from '../generalHelpers/generalStyles'

const TitleFont = styled.h1`
  font-size: 4vh;
  font-weight: 500;
  letter-spacing: 0.2px;
  ${gentleBlackColor};
  text-align: center;
`

export const OnlyMobileBrowsersSupported = () => {
	return (
		<CenteredColumn>
			<TitleFont style={{margin: '10vh 20px'}}>
				Right now, Pupix is supported only on mobile browsers.
			</TitleFont>
			<PupikIcon style={{height: '50vh'}}/>
		</CenteredColumn>
	)
}