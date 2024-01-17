import React from 'react'
import {Column, FullWidthColumn, Row} from './containers'
import {PupixIcon} from '../icons/pupixIcon'
import styled from 'styled-components'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'

const contentColor = '#999997'
const pupikLinkedInLink = 'https://www.linkedin.com/company/pupikvideo'

const GreyColumn = styled(FullWidthColumn)`
  background-color: #F5F5F5;
  padding: 50px 40px 20px;
`

const ExplanationParagraph = styled.p`
  color: ${contentColor};
  font-size: 13px;
  line-height: 25px;
  font-weight: normal;
  margin-bottom: 0;
`

const SizedPupikIcon = styled(PupixIcon).attrs({height: '27px', width: '74.81', fillColor: contentColor})``

const OneLineFont = styled(ExplanationParagraph)`
  white-space: nowrap;
  line-height: 1;
`

const CopyrightFont = styled(ExplanationParagraph)`
  font-size: 10px;
`

const PaddedOneLineFont = styled(OneLineFont)`
  margin-bottom: 15px;
`

const Link = styled(OneLineFont).attrs({as: 'a'})`
  text-decoration: underline;

  &:hover {
    color: ${contentColor};
  }
`

const PaddedBottomLink = styled(Link)`
  margin-bottom: 15px;
`

const SeparatorLine = styled.div`
  height: 0.5px;
  width: calc(100vw - 80px);
  background-color: ${contentColor};
`

const PaddedMediumWeightLink = styled(PaddedBottomLink)`
  font-weight: 500;

`

/**
 * This sized box can not accept number as pixels, but accept only string values as the exact width & height.
 */
export const ExactSizedBox = styled.div`
  height: ${props => props.height ?? 0};
  width: ${props => props.width ?? 0};
  flex: none;
`

export const PupikFooter = ({pupikIconLink = '/'}) => {
	return (
		<GreyColumn>
			<SizedPupikIcon onClick={() => window.location.href = pupikIconLink}/>
			<SizedBox height={20}/>
			<ExplanationParagraph>
				Pupix's mission is to grow the video sessions market by creating a technology that enables a simple and
				trusted connection between the client and the creator. Pupix’s platform helps celebrities and content
				creators grow their businesses and build better customer relationships.
			</ExplanationParagraph>
			<SizedBox height={40}/>
			<Row>
				<Column>
					<PaddedBottomLink href='/how-it-works'>How it works?</PaddedBottomLink>
					<PaddedBottomLink href='/'>Top 10</PaddedBottomLink>
					<PaddedBottomLink href='/login'>Join now</PaddedBottomLink>
					<Link href={pupikLinkedInLink}>Careers</Link>
				</Column>
				<ExactSizedBox width='20vw'/>
				<Column>
					<PaddedBottomLink href='/privacy-policy'>Privacy Policy</PaddedBottomLink>
					<PaddedBottomLink href='/privacy-policy'>Security Policy</PaddedBottomLink>
					<PaddedBottomLink href='/privacy-policy'>Cookies Policy</PaddedBottomLink>
					<Link href='/terms'>Terms of Service</Link>
				</Column>
			</Row>
			<SizedBox height={40}/>
			<SeparatorLine/>
			<SizedBox height={40}/>
			<PaddedMediumWeightLink href={pupikLinkedInLink}>Contact us</PaddedMediumWeightLink>
			<PaddedOneLineFont>King George 48,</PaddedOneLineFont>
			<PaddedOneLineFont>Tel Aviv-Yafo, 6433701, Israel.</PaddedOneLineFont>
			<PaddedOneLineFont>Email: support@pupix.com</PaddedOneLineFont>
			<PaddedOneLineFont>Phone: +972 0544 677 134</PaddedOneLineFont>
			<Link href={pupikLinkedInLink}>Follow us on LinkedIn</Link>
			<SizedBox height={70}/>
			<CopyrightFont>Copyright © 2023 Pupix Inc. All rights reserved. </CopyrightFont>
		</GreyColumn>
	)
}
