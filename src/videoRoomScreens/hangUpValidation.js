import React from 'react'
import {FullWidthCenteredColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import {ExplanationText} from '../generalHelpers/fonts'
import {NewBootstrapActionButton} from '../pages'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {ExactSizedBox} from '../generalComponents/pupikFooter'
import {useRouter} from 'next/router'

export const MediumTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  ${gentleBlackColor};
  text-align: center;
`

const SecondaryBootstrapButton = styled(NewBootstrapActionButton).attrs({variant: 'secondary'})``

export function HangUpValidationScreen({isCreator, handleCancel, handleHangUp}) {
	const router = useRouter()
	
	
	return (
		<FullWidthCenteredColumn>
			<MediumTitle style={{margin: '30px 20px 10px'}}>Sure you want to hang up?</MediumTitle>
			<ExplanationText>
				{isCreator ? 'We will not pay you.' : 'We will not refund you.'}
			</ExplanationText>
			<ExactSizedBox height='25vh'/>
			<NewBootstrapActionButton onClick={handleCancel}>
				Cancel
			</NewBootstrapActionButton>
			<SizedBox height={25}/>
			<SecondaryBootstrapButton onClick={handleHangUp}>
				Yes, I'm sure
			</SecondaryBootstrapButton>
		</FullWidthCenteredColumn>
	)
}