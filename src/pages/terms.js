import React, {Fragment} from 'react'
import BackArrowIcon from '../icons/backArrowIcon.svg'
import {CenteredContainer, FullWidthColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {NextSeo} from 'next-seo'
import {PupixIcon} from '../icons/pupixIcon'
import {PupikFooter} from '../generalComponents/pupikFooter'
import {NewBootstrapActionButton} from './index'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'

const TopBarContainer = styled(CenteredContainer)`
  background-color: var(--new-main-color);
  height: 60px;
  width: 100vw;
`

export const ParagraphOrderedList = styled.ol`
  font-size: 14px;
  line-height: 20px;
  ${gentleBlackColor};
  list-style-type: decimal;
  margin: 0 20px 20px;
  padding: 0 20px;
`

export const LITitle = styled.li`
  font-weight: bold;
  margin-bottom: 5px;
`

const BlackDiskUL = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`

const BlackCircleUL = styled.ul`
  list-style-type: circle;
  padding-left: 20px;
`

export const UnorderedLI = styled.li`
  margin-bottom: 5px;
`

export const PaddedBottomDiskUL = styled(BlackDiskUL)`
  margin-bottom: 10px;
`

const UnderlinedA = styled(Link)`
  text-decoration: underline;
`

export const SmallPaddedP = styled.p`
  margin-bottom: 5px;
`

const PositionedBackArrowIcon = styled(BackArrowIcon)`
  position: absolute;
  top: 23px;
  left: 25px;
`

const TopBarLink = styled.a`
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  color: white;

  &:hover {
    color: white;
  }
`

const PositionedTopBarLink = styled(TopBarLink)`
  position: absolute;
  top: 20px;
  right: 25px;
`

export const PupikTopBar = ({withTopTen = false, withCreateAccount = false, ...props}) => {
	const router = useRouter()
	
	return <TopBarContainer {...props}>
		<PupixIcon height='31px' onClick={() => router.push('/login')}/>
		<PositionedBackArrowIcon onClick={typeof window === 'undefined' ? null : () => window.history.back()}/>
		{withTopTen ? <PositionedTopBarLink href='/'>TOP 10</PositionedTopBarLink> :
			withCreateAccount ? <PositionedTopBarLink href='/login'>Join now</PositionedTopBarLink> : null}
	</TopBarContainer>
}

const FixedPupikTopBar = styled(PupikTopBar)`
  position: fixed;
  top: 0;
  left: 0;
`

export const PupikHeaderContainer = ({children}) => {
	return (
		<Fragment>
			<FixedPupikTopBar withTopTen/>
			<FullWidthColumn style={{marginTop: '60px'}}>
				{children}
			</FullWidthColumn>
		</Fragment>
	)
}

export const MediumTitle = styled.h1`
  font-size: 22px;
  font-weight: bold;
  ${gentleBlackColor};
  letter-spacing: 0.3px;
  text-align: center;
  margin-bottom: 0;
`
export const Terms = (props) => {
	
	const router = useRouter()
	
	return (
		<>
			<NextSeo
				title='Terms of Service - Pupix'
				description='Please read through the terms and conditions of pupix.com, for any related questions or inquires, feel free to contact us at your convenience.'
			/>
			<PupikHeaderContainer>
				<MediumTitle style={{margin: '20px'}}>
					Terms & Conditions
				</MediumTitle>
				<ParagraphOrderedList>
					<LITitle>
						Definitions
					</LITitle>
					<SmallPaddedP>
						<strong>“Creator”</strong> - The registered user which receives video calls for 90 percent of
						the client payment
						revenue.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>“Client”</strong> - The user who pays to have a video chat with the creator for the
						minute wage the
						creator stated.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>“The company”</strong> - Pupix Inc, located in 651 N Broad St, Suite 206, Middletown,
						Delaware, 19709.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>“Pupik”</strong> - The website which enables clients to make video calls to creators for
						the minute wage
						the creator stated, and allows creators to accept the calls and earn 90 percent of the client
						payment revenue.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>“User”</strong> - any user of the Website, whether a Creator or a client.
					</SmallPaddedP>
					<p>
						<strong>“Video room”</strong> - The twilio video room created by the server, that enables the
						video communication
						between the client and the creator.
					</p>
					<LITitle>
						About
					</LITitle>
					<p>
						The Website is a service that allows users to make video calls to creators for the minute wage
						the creator stated. 90% of the client payment revenue may go to the creator, and 10% to the
						company, as a management fee. We charge the customer an additional small fee for each
						transaction, that goes to our third-party payment provider (Stripe). The video call length may
						be 3, 8, or 20 minutes.<br/><br/>
						These Terms govern your use of the Website, including any content, functionality, and services
						offered on or through the Website whether part of Pupix. By registering with or using Pupik, you
						hereby accept and agree to be bound by and abide by these Terms. If you do not want to agree to
						these Terms of Service, you must not access or use the Website.
					</p>
					<LITitle>Refunds</LITitle>
					<SmallPaddedP>
						When the client enters its credit card details and clicks the “pay and start call” button, the
						video call room created, the payment get authorized, and the creator get notified about the
						incoming call. The client may receive refund by our servers in case:
					</SmallPaddedP>
					<PaddedBottomDiskUL>
						<UnorderedLI>
							The creator denied the call. (a.k.a actively clicked the deny call button in the incoming
							call page).
						</UnorderedLI>
						<UnorderedLI>
							The creator has not connected to the twilio video room within two minutes from the moment
							the client connected to the video room, and the client remain connected to the video room
							until Pupix showed explicitly that the creator missed the video call.
						</UnorderedLI>
						<UnorderedLI>
							The creator disconnected from the twilio video room in the middle of the call, for any
							reason. Keep in mind that:
						</UnorderedLI>
						<BlackCircleUL>
							<UnorderedLI>
								Pupix give generous time of up to 45 seconds for user to reconnect to the video room
								before it marked as disconnected. If the creator started to disconnect from the room
								less then 45 seconds from the call end time, and the server did not mark it as
								disconnection before the call time ended, the client will not be eligible for refund,
								and the room will end regularly, like the video call been completed successfully.
							</UnorderedLI>
							<UnorderedLI>
								The time Pupix will let the user to reconnect to the room in case of lost connection
								will might be shorter then 45 seconds.
							</UnorderedLI>
							<UnorderedLI>
								When the creator leaves the call tab and the video freezes / becomes black, it does not
								means he left the call. The creator has full right to leave the tab and provide no
								video, or any video content, as long as he remain connected to the twilio video room.
							</UnorderedLI>
						</BlackCircleUL>
						<UnorderedLI>
							You agree that you will not make unjustified requests for a refund from any Creator, or
							unjustified chargeback requests of your payment card provider in relation to
							any transaction between you and a Creator.
						</UnorderedLI>
						<UnorderedLI>
							<strong>
								Disclaimer: Even if someone authorized by our server like the creator, who is not the
								actual
								creator, will connect to the video room, like the creator friend or a bot, the client
								will
								not be eligible for refund.
								Make sure you make calls to creators you know and trust.
							</strong>
						</UnorderedLI>
						<UnorderedLI>
							<strong>
								Disclaimer: Tips payments will not be eligible for a refund, in any case.
							</strong>
						</UnorderedLI>
						<UnorderedLI>
							Refund will might take up to 10 business days to take place.
						</UnorderedLI>
						<UnorderedLI>
							If you think you deserve a refund and you did not got it, contact out support team at
							support@pupix.com. We here to help.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>
						Creator Revenue
					</LITitle>
					<SmallPaddedP>
						If the creator accepted a call, The creator stripe account may be eligible to 90 percent from
						the client payment revenue, in case:
					</SmallPaddedP>
					<PaddedBottomDiskUL>
						<UnorderedLI>
							The creator stripe account information is correct and the account has not been disabled by
							stripe.
						</UnorderedLI>
						<UnorderedLI>
							The creator connected to the video room and provided audio and video permissions (each time
							it been requested) within two minutes from the client connection time to the video room, and
							remained connected to the video room until the call ended by Pupix, whether because the call
							time ended or because the client left the call in the middle. To remain connected to the
							video room:
						</UnorderedLI>
						<BlackCircleUL>
							<UnorderedLI>Make sure you keep the pupix video call tab and visible active during the call
								time.</UnorderedLI>
							<UnorderedLI>Make sure that Pupix is the only process on your device that uses your camera
								and microphone during the video call time.</UnorderedLI>
							<UnorderedLI>Make sure you use Pupix from a good and new mobile device, since web video chat
								is a new technology.</UnorderedLI>
							<UnorderedLI>Make sure you have fast and stable internet connection (At least 20MBPS at any
								given moment during the call).</UnorderedLI>
						</BlackCircleUL>
						<UnorderedLI>If you think you deserve money and you did not received it, contact our support
							team at support@pupix.com. We here to help.</UnorderedLI>
						<UnorderedLI>Stripe may charge additional fees from the creator to receive the payment, so the
							actual amount of money the creator will receive will might be lower then 90% from the client
							revenue, by the Stripe fee.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>
						Disclaimer
					</LITitle>
					<p>
						<strong>
							The company has no responsibility for the video and audio content provided by the creator
							during the video call.<br/>
						</strong>
						The creator may provide black screen, cats video or no video and audio content at all. Since the
						company cannot access the video call content, due to privacy issues, we cannot force the creator
						to provide certain video and audio content.
						As a client, make sure you make video calls to creators you trust to provide high quality
						content.
					</p>
					<LITitle>
						Privacy Policy
					</LITitle>
					<p>
						Certain registration information and other information about you may be collected by Pupix and
						through the use of the service. Pupix use of this information is governed by the <UnderlinedA
						href='./privacy'>Pupix privacy policy.</UnderlinedA>
					</p>
					<LITitle>
						Disclaimer of Warranties
					</LITitle>
					<SmallPaddedP>
						Generally. The Site and any Services provided thereby are provided "as is", "with all faults",
						"as available", without warranty of any kind, either express or implied.<br/>
						Specific Disclaimers. To the fullest extent possible under applicable law the Company
						specifically disclaims:
					</SmallPaddedP>
					<PaddedBottomDiskUL>
						<UnorderedLI>Any warranties concerning the availability, accuracy, reliability,
							completeness, capabilities, security, timeliness, usefulness or content of the site and
							any creator or the ability of the Site or any creator to interoperate or integrate with
							any third-party products such as software or hardware;</UnorderedLI>
						<UnorderedLI>Any warranties resulting from a course of dealing or usage of
							trade;</UnorderedLI>
						<UnorderedLI>Any warranties with regard to the accuracy or completeness of or errors in the
							contents or functioning of or the accuracy of the results or output that derives from
							the use of the Site or any creator video services.
						</UnorderedLI>
						<UnorderedLI>Any warranties of merchantability or fitness for a particular purpose;
							and</UnorderedLI>
						<UnorderedLI>Any warranties regarding the rights and title of the Company in the Site and
							any creator video, or any warranty that the Site or any creator video do not infringe
							the intellectual property rights of any third party
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>
						Limitations of Liability
					</LITitle>
					<p>
						Disclaimer. In no event will the Company or its affiliates or suppliers or the officers,
						directors, employees, shareholders, agents, representatives, licensors, successors or assigns of
						the Company or its affiliates or suppliers be liable to any User or to any third party
						whatsoever for any damage, including, but not limited to, indirect, direct, special, punitive,
						incidental or consequential damages (including, but not limited to, damages for loss of business
						profits, business interruption, or loss, or vandalism or theft of programs or information, and
						any other kind of damage), or any other damages arising in connection with or in any way out of
						the availability or use of, reliance on, or inability to use, the Site or any Services, even if
						the Company or any creator were advised of the possibility of such damage, and regardless of the
						form of action whether in contract, tort, equity or otherwise.<br/>
						Remedy. If at any time a User becomes dissatisfied with the Site or any of its Services or
						develops any dispute with the Company or any creator in connection with the provision of
						Services or the terms of this Agreement, that Users sole and exclusive remedy under this
						Agreement is to stop using the Site and to stop receiving its Services.
					</p>
					<LITitle>Geographic Restrictions</LITitle>
					<p>
						The Site and its Services may not be accessed, viewed, downloaded or otherwise received in any
						country or location in which doing so would, or could be deemed a violation of any law,
						regulation, rule, ordinance, edict or custom. The provisions of Section 14.1 notwithstanding,
						the Company reserves the right to restrict or deny access to the site to Guests or Users in any
						country or location at any time at its sole discretion and shall not be held liable in any way
						by any guest in such respect.
					</p>
					<LITitle>Severability</LITitle>
					<p>
						To the extent that a court of competent jurisdiction determines that any specific term or terms
						of these Terms and Conditions is/are unenforceable, the other terms of these Terms and
						Conditions will continue in full force and effect.
					</p>
					<LITitle>Headers</LITitle>
					<p>
						Headers of sections in these Terms & Conditions are included for convenience only and shall not
						be used to interpret these Terms & Conditions.
					</p>
					<LITitle>Governing Law</LITitle>
					<p>
						This Agreement shall be governed by and construed in accordance with the laws of the State of
						Texas, without giving effect to the principles thereof relating to conflict of laws.
					</p>
					<LITitle>Attorney’s Fees</LITitle>
					<p>
						The prevailing party to any dispute arising under this Agreement shall be entitled to collect
						its attorney’s fees and costs relating to said dispute.
					</p>
					<LITitle>Intellectual property</LITitle>
					<p>
						Generally. All materials on the Site, are proprietary, constitute valuable intellectual
						property, are copyrighted and are protected under treaty provisions and United States and/or
						worldwide copyright laws, and may not be reproduced, copied, edited, published, transmitted or
						uploaded in any way without written permission from the Company.<br/>
						Website Name. The name “Pupik,” the URL “www.pupix.com”, “www.pupikvideo.com” & “www.pupik.co” ,
						and any other
						brand names or identifiers present on the Site are the property of the Company and are protected
						by United States and international trademark law.<br/>
						User Aliases. The Company owns all rights in all aliases associated with all User Accounts on
						the Site.
					</p>
					<LITitle>Notification of changes</LITitle>
					<p>
						The company reserves the right to make changes to these Terms at any time and at the company
						sole discretion. All changes are effective immediately from the time the company posts them, and
						apply to all access to and use of the Website thereafter. By continuing to use Pupix, you agree
						to the Terms as modified or as they currently appear. You are expected to check this page from
						time to time so you are aware of any changes, as they are binding on you.
					</p>
					<LITitle>Termination</LITitle>
					<SmallPaddedP>
						You are free to stop using our Services at any time. We reserve the right to suspend or
						terminate your access to the Services without notice to you if:
					</SmallPaddedP>
					<PaddedBottomDiskUL>
						<UnorderedLI> You are in breach of these Terms.</UnorderedLI>
						<UnorderedLI> Your use of the Services would cause a real risk of harm or loss to us or
							other users.
						</UnorderedLI>
						<UnorderedLI>More than three clients in a row gave a video call with you a two stars rating
							or lower.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>Contact information</LITitle>
					<p>
						If you have any questions, comments, complaints or concerns about Pupix, please contact us at
						support@pupix.com.
					</p>
				</ParagraphOrderedList>
				<NewBootstrapActionButton onClick={() => router.push('/login')}>
					Join for Free
				</NewBootstrapActionButton>
				<SizedBox height={30}/>
				<PupikFooter/>
			</PupikHeaderContainer>
		</>
	)
}

export default Terms