import React from 'react'
import {
	LITitle,
	MediumTitle,
	PaddedBottomDiskUL,
	ParagraphOrderedList,
	PupikHeaderContainer,
	SmallPaddedP,
	UnorderedLI
} from './terms'
import {useRouter} from 'next/router'
import {NextSeo} from 'next-seo'
import {NewBootstrapActionButton} from './index'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {PupikFooter} from '../generalComponents/pupikFooter'

export const PrivacyPolicy = (props) => {
	
	const router = useRouter()
	
	return (
		<>
			<NextSeo
				title='Privacy Policy - Pupix'
				description='This page contains the privacy policy of pupix.com, please read through the page and contact us with any questions or concerns.'
			/>
			<PupikHeaderContainer>
				<MediumTitle style={{margin: '20px'}}>
					Privacy Policy
				</MediumTitle>
				<ParagraphOrderedList>
					<LITitle>Definitions</LITitle>
					<SmallPaddedP>
						<strong>“Creator”</strong> - The registered user which receives video calls for 90 percent of
						the
						client
						payment revenue.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>“Client”</strong> - The user who pays to have a video chat with the creator for the
						minute
						wage
						the creator stated.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>“The company”</strong> - Pupix Inc, located in 651 N Broad St, Suite 206, Middletown,
						Delaware, 19709.
					</SmallPaddedP>
					<p>
						<strong>“Pupik”</strong> - The website which enables Users to provide and make video calls to
						creators
						for the minute wage the creator stated, and allows creators to accept these calls and earn 80
						percent of
						the client payment revenue.
					</p>
					<LITitle>Information collected</LITitle>
					<SmallPaddedP>
						<strong>Registration data</strong> - When a creator register, we ask him to provide certain
						information,
						which includes
						his phone number, and twitter account information: The twitter username, profile photo url and
						the
						user
						twitter display name. Stripe will ask more information from the creator to set up his stripe
						account
						in
						order to receive
						payments.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>Video calls archive</strong> - for each video call that the creator had connected to, we
						save
						general information
						about the call, like the call price, the call length, how the call ended, and the client rating
						for
						the
						video call.
					</SmallPaddedP>
					<SmallPaddedP>
						<strong>Video calls recordings</strong> - We save recordings of all the video calls on the
						platform. The records are fully private & will be in use only in case of disputes.
					</SmallPaddedP>
					<p>
						<strong>Payment information</strong> - When the client pays and starts a video call with a
						creator,
						the
						client will be
						asked to provide his credit card information. Pupix does not store the client credit card
						information,
						but only uses it to process the payment with stripe.
					</p>
					<LITitle>Use of Information</LITitle>
					<PaddedBottomDiskUL>
						<UnorderedLI>
							We use the creator twitter username to create the url link to the creator profile,
							where clients can initiate video calls to the creator.
						</UnorderedLI>
						<UnorderedLI>
							We use the creator display name and profile photo url to create the creator profile page.
						</UnorderedLI>
						<UnorderedLI>
							We use the creator phone number to notify him by SMS message on incoming calls, so he will
							be
							able to receive calls even when he is not in the site.
						</UnorderedLI>
						<UnorderedLI>
							Stripe use the collected information to perform payments to the creator, according to the
							stripe
							privacy policy.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>Disclaimer</LITitle>
					<PaddedBottomDiskUL>
						<UnorderedLI>
							The creator twitter username, display name, minute wage and profile photo will be publicly
							available to everyone using Pupix.
						</UnorderedLI>
						<UnorderedLI>
							The creator phone number will remain private, and only a user authorized as the creator, the
							company and firebase administrators will be able to access or change it.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>Disclosure to Third Parties</LITitle>
					<PaddedBottomDiskUL>
						<UnorderedLI>
							When the client submit the payment to perform the call, his credit card information is sent
							to
							stripe to perform the payment.
						</UnorderedLI>
						<UnorderedLI>
							Stripe will store the information collected by the creator while setting up his stripe
							account
							in order to receive payments.
						</UnorderedLI>
						<UnorderedLI>
							Keep in mind that the company uses google cloud firestore and google cloud storage services
							to
							store both the creator data and the video calls archive.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>Protection of Information</LITitle>
					<p>
						The Company follows generally accepted industry standards and maintains reasonable safeguards to
						attempt to ensure the security, integrity and privacy of the information in the company
						possession.
					</p>
					<LITitle>Rights of Users</LITitle>
					<PaddedBottomDiskUL>
						<UnorderedLI>
							The creator can change or update his information at any time in the edit profile page,
							except
							from the twitter username, that detected in the registration stage and cannot be changed.
						</UnorderedLI>
						<UnorderedLI>
							The creator can delete his account and all the personal data associated with it at any time,
							by
							clicking the delete account button in the edit profile page.
						</UnorderedLI>
					</PaddedBottomDiskUL>
					<LITitle>Notification of Change</LITitle>
					<p>
						Pupix can modify this Privacy Policy, and if we make material changes to it, we will provide
						notice
						through our Services, or by other means, to provide you the opportunity to review the changes
						before
						they become effective. If you object to any changes, you may delete your account.<br/>
						You acknowledge that your continued use of our Services after we publish or send a notice about
						our
						changes to this Privacy Policy means that the collection, use and sharing of your personal data
						is
						subject to the updated Privacy Policy, as of its effective date.
					</p>
					<LITitle>Contact Us</LITitle>
					<p>
						If you have any questions about this privacy policy, or the privacy practices of Pupix, contact
						us
						at support@pupix.com.
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

export default PrivacyPolicy