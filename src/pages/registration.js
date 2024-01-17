import React, { useCallback, useEffect, useState } from 'react'
import { NeverMissCalls } from '../registrationFlow/neverMissCalls'
import { PageAnimation } from '../generalComponents/pageAnimation'
import { MyPhoneNumber } from '../registrationFlow/myPhoneNumber'
import { MinuteWage } from '../registrationFlow/minuteWage'
import { userDocRef, userPIDocRef } from '../generalHelpers/firestorePaths'
import { useHistoryState } from '../generalHelpers/useHistoryState'
import styled from 'styled-components'
import { StripeExplanationScreen } from '../registrationFlow/stripeExplanation'
import firebase from 'firebase/app'
import 'firebase/functions'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import * as constants from '../generalHelpers/constants'

export const FlowContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
`

export const progressBarTransition = (isBackMove) =>
  isBackMove ? 'none' : `transform ${constants.pageSlideAnimationDuration}`
export const ProgressBar = styled.div`
  height: 5px;
  align-self: flex-start;
  transform-origin: 0 50%;
  background-color: var(--new-main-color);
  transform: scaleX(var(--progress-bar-scale-x));
  width: var(--progress-bar-initial-width);
  transition: var(--progress-bar-transition);
`
export const pageAnimationTransition = (isBackMove) =>
  isBackMove ? 'none' : `transform ${constants.pageSlideAnimationDuration}`
export const pageAnimationTransform = (currentLevel, level) =>
  currentLevel > level
    ? `translateX(-100vw)`
    : currentLevel < level
    ? 'translateX(100vw)'
    : 'none'
export const Registration = (props) => {
  const [registrationLevel, setRegistrationLevel, isBackMove] = useHistoryState(
    0,
  )
  const [phoneNumber, setPhoneNumber] = useState('')
  const [minuteWage, setMinuteWage] = useState('')
  const [redirecting, setRedirecting] = useState(false)
  const [currentUser, loadingUser] = useAuthState(firebase?.auth())
  const [stripeOnboardingUrlPromise, setStripeOnboardingUrlPromise] = useState()
  const [saveUserDataPromise, setSaveUserDataPromise] = useState()
  const [saveUserPIDataPromise, setSaveUserPIDataPromise] = useState()
  const [countryCode, setCountryCode] = useState('US')
  const router = useRouter()

  useEffect(() => {
    if (!loadingUser && !currentUser?.providerData[0]) {
      router.replace('/login')
    }
  }, [currentUser, loadingUser, props.history, router])

  useEffect(() => {
    if (registrationLevel === 3) {
      setStripeOnboardingUrlPromise(
        firebase.functions().httpsCallable('createStripeOnboardingUrl')(
          countryCode,
        ),
      )
    }
  }, [registrationLevel, countryCode])

  const saveUserData = useCallback(async () => {
    await userDocRef(currentUser.uid).set(
      { minuteWage: parseInt(minuteWage), isAvailable: false },
      { merge: true },
    )
  }, [currentUser, minuteWage])

  const saveUserPIData = useCallback(async () => {
    await userPIDocRef(currentUser.uid).set({ phoneNumber }, { merge: true })
  }, [currentUser, phoneNumber])

  /**
   * Split the function to setState and useEffect to handle the case when the url is ready and then the spinner
   * won't even start.
   */
  useEffect(() => {
    if (redirecting) {
      const saveAndRedirect = async () => {
        try {
          const [{ data: stripeOnboardingUrl }] = await Promise.all([
            stripeOnboardingUrlPromise,
            saveUserDataPromise,
            saveUserPIDataPromise,
          ])
          if (stripeOnboardingUrl) {
            window.location.href = stripeOnboardingUrl
          } else {
            setRedirecting(false)
          }
        } catch (error) {
          setRedirecting(false)
        }
      }

      saveAndRedirect()
    }
  }, [
    redirecting,
    saveUserDataPromise,
    saveUserPIDataPromise,
    stripeOnboardingUrlPromise,
  ])

  useEffect(() => {
    if (!isBackMove) {
      if (registrationLevel === 1) {
        setSaveUserDataPromise(saveUserData())
      } else if (registrationLevel === 3) {
        setSaveUserPIDataPromise(saveUserPIData())
      }
    }
  }, [registrationLevel, saveUserData, isBackMove, saveUserPIData])

  return (
    <>
      <NextSeo noindex />
      <FlowContainer>
        <ProgressBar
          style={{
            '--progress-bar-scale-x': registrationLevel + 1,
            '--progress-bar-initial-width': '20vw',
            '--progress-bar-transition': progressBarTransition(isBackMove),
          }}
        />
        <PageAnimation
          style={{
            '--page-animation-transform': pageAnimationTransform(
              registrationLevel,
              0,
            ),
            '--page-animation-transition': pageAnimationTransition(isBackMove),
          }}
        >
          <MinuteWage
            handleInputChange={(value) => {
              // Need those tests because of the dollar sign at the beginning.
              if (/^\$ [0-9]*$/.test(value) && value.length < 7) {
                setMinuteWage(value.replace('$ ', ''))
              }
            }}
            minuteWage={minuteWage}
            handleContinueClick={() => setRegistrationLevel(1)}
          />
        </PageAnimation>
        <PageAnimation
          style={{
            '--page-animation-transform': pageAnimationTransform(
              registrationLevel,
              1,
            ),
            '--page-animation-transition': pageAnimationTransition(isBackMove),
          }}
        >
          <NeverMissCalls handleContinueClick={() => setRegistrationLevel(2)} />
        </PageAnimation>
        <PageAnimation
          style={{
            '--page-animation-transform': pageAnimationTransform(
              registrationLevel,
              2,
            ),
            '--page-animation-transition': pageAnimationTransition(isBackMove),
          }}
        >
          <MyPhoneNumber
            phoneNumber={phoneNumber}
            handleInputChange={(newPhoneNumber, newCountryCode) => {
              setPhoneNumber(newPhoneNumber)
              setCountryCode(newCountryCode)
            }}
            handleContinueClick={() => setRegistrationLevel(3)}
          />
        </PageAnimation>
        <PageAnimation
          style={{
            '--page-animation-transform': pageAnimationTransform(
              registrationLevel,
              3,
            ),
            '--page-animation-transition': pageAnimationTransition(isBackMove),
          }}
        >
          <StripeExplanationScreen
            handleContinueClick={() => setRedirecting(true)}
            loading={redirecting}
          />
        </PageAnimation>
      </FlowContainer>
    </>
  )
}

export default Registration
