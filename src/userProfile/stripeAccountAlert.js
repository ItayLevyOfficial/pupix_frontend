import React from 'react'
import Alert from 'react-bootstrap/Alert'
import styled from 'styled-components'

export const BootstrapAlert = styled(Alert)`
  width: calc(100vw - 40px);
  margin: 0;
  border-radius: 10px;
`

export const TopPaddedBootstrapAlert = styled(BootstrapAlert)`
  margin-bottom: 0;
  z-index: 20;
  position: absolute;
  top: 20px;
`

const AlertLink = styled(Alert.Link)`
  text-decoration: underline;
`

export const StripeAccountAlert = ({stripeAccountStatus, redirectToStripe, finishedLoading, ...props}) => {
	
	return stripeAccountStatus === 'need-review' ? (
		<TopPaddedBootstrapAlert variant={'warning'} {...props} dismissible>
			Stripe need to know more information about you. <AlertLink onClick={redirectToStripe}>Submit
			information</AlertLink>
		</TopPaddedBootstrapAlert>
	) : stripeAccountStatus === 'disabled' ? (
			<TopPaddedBootstrapAlert variant={'danger'} {...props}>
				Your account has been disabled by Stripe. <AlertLink onClick={redirectToStripe}>
				Activate your account
			</AlertLink>
			</TopPaddedBootstrapAlert>)
		: stripeAccountStatus === 'repair' ? (
			<TopPaddedBootstrapAlert variant='primary' {...props} dismissible={false}>
				Because of a technical problem we had, we need you to create your Stripe account once again. We are
				deeply sorry for the inconvenience. <AlertLink onClick={redirectToStripe}>Activate
				your account
			</AlertLink>
			</TopPaddedBootstrapAlert>
		) : stripeAccountStatus === 'pending' ? (
			<TopPaddedBootstrapAlert variant='primary' {...props}>
				Stripe is verifying your account. <AlertLink onClick={redirectToStripe}>Watch verification
				status</AlertLink>
			</TopPaddedBootstrapAlert>
		) : stripeAccountStatus === 'onboarding' || (!stripeAccountStatus && finishedLoading) ?
			(
				<TopPaddedBootstrapAlert variant={'primary'} {...props}>
					You have not finished the registration process. <AlertLink
					onClick={redirectToStripe}>
					Click here to continue
				</AlertLink>
				</TopPaddedBootstrapAlert>
			) : null
}