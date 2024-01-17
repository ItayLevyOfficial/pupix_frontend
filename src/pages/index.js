import React, {useEffect, useState} from 'react'
import {PupikTopBar} from './terms'
import {CenteredColumn, CenteredContainer} from '../generalComponents/containers'
import TrophyIcon from '../icons/trophyIcon.svg'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import styled from 'styled-components'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import {PaddedUserCard} from '../topTen/userCard'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Button from 'react-bootstrap/Button'
import {PupikFooter} from '../generalComponents/pupikFooter'
import {useRouter} from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import {NextSeo} from 'next-seo'

export const BigTitle = styled.h1`
  font-size: 26px;
  ${gentleBlackColor};
  letter-spacing: 0.3px;
  margin-bottom: 0;
  font-weight: normal;
`

export const NewBootstrapActionButton = styled(Button).attrs({block: true, size: 'lg', variant: 'pupik'})`
  min-width: 250px;
  width: calc(100vw - 60px);
  max-width: 400px;
  align-self: center;
  border-radius: 10px;
  border: none;

  &:focus {
    box-shadow: none;
  }
`

const Index = () => {
	const [topTenCreators, setTopTenCreators] = useState(Array(10).fill({}))
	const router = useRouter()
	const [currentUser, loading] = useAuthState(firebase.auth())
	const [topElevenCreators, setTopElevenCreators] = useState()
	
	useEffect(() => {
		firebase.firestore().collection('users')
			.orderBy('callsAmount', 'desc').limit(11)
			.onSnapshot(snapshot => {
				setTopElevenCreators(snapshot.docs)
			})
	}, [])
	
	// Need the two affects to make the filter on the current user uid faster.
	useEffect(() => {
		if (!loading && topElevenCreators) {
			setTopTenCreators(
				topElevenCreators.filter(doc => doc.id !== currentUser?.uid).map(doc => doc.data()).slice(0, 10))
		}
	}, [currentUser?.uid, loading, topElevenCreators])
	
	return (
		<>
			<NextSeo title='Pupix' description='Video sessions are made simple.'/>
			<CenteredColumn>
				<PupikTopBar withCreateAccount/>
				<SizedBox height={30}/>
				<CenteredContainer>
					<TrophyIcon/>
					<SizedBox width={10}/>
					<BigTitle>
						Top <strong>10</strong> Creators
					</BigTitle>
				</CenteredContainer>
				<SizedBox height={30}/>
				{
					topTenCreators ? topTenCreators.map(
						(creatorData, index) => <PaddedUserCard userDocData={creatorData} place={index + 1}
						                                        key={index}/>) : null
				}
				<SizedBox height={20}/>
				<NewBootstrapActionButton onClick={() => router.push('/login')}>
					Join for Free
				</NewBootstrapActionButton>
				<SizedBox height={50}/>
				<PupikFooter pupikIconLink='/login'/>
			</CenteredColumn>
		</>
	)
}

export default Index