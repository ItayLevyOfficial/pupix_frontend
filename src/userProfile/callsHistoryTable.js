import React, {useCallback, useEffect, useState} from 'react'
import {Loading} from '../generalComponents/loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {generateHistoryCallRow} from './historyTableRow'
import styled from 'styled-components'
import * as constants from '../generalHelpers/constants'
import {environment} from '../generalHelpers/constants'
import GettingStarted from '../icons/userProfileGetStarted.svg'

const TableHeader = styled.th`
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  line-height: 18px;
  padding-bottom: ${props => props.noPadding ? '0' : '20px'};
  text-align: center;
`

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid ${constants.mainColor};
`

const Table = styled.table`
  width: min(90vw, 600px);
  margin-top: 5vh;
`

/**
 * The table of the history calls in the user profile page.
 *
 * @param uid: The user id of the addressee. The default value is here for testing purposes.
 * @param addresseeMinuteWage: The minute wage of the addressee.
 */
export const HistoryCallsTable = ({uid, style}) => {
	
	if (environment === 'testing' && !uid) {
		uid = 'lkmupmVUj8RiGVzJu7LLAGuTa5C3'
	}
	
	const [historyCalls, setHistoryCalls] = useState(null)
	
	/**
	 * Loads ten more history calls from firestore.
	 */
	const loadMoreCalls = useCallback(async () => {
		const lastDoc = historyCalls ? historyCalls[historyCalls.length - 1] : null
		const query = firebase.firestore()
			.collection('videoCalls')
			.where('status', 'in', ['client-left', 'completed'])
			.where('addresseeUid', '==', uid)
			.orderBy('roomCreationTime', 'desc')
			.limit(10)
		if (historyCalls) {
			setHistoryCalls([
				...historyCalls,
				...((await (lastDoc ? query.startAfter(lastDoc).get() : query.get())).docs)
			])
		} else {
			setHistoryCalls((await (lastDoc ? query.startAfter(lastDoc).get() : query.get())).docs)
		}
	}, [historyCalls, uid])
	
	
	/**
	 * Loads the first ten history calls on initialization of the user doc data.
	 */
	useEffect(() => {
		if (historyCalls === null) {
			loadMoreCalls()
		}
	}, [historyCalls, loadMoreCalls])
	
	
	return historyCalls?.length ? (
		<InfiniteScroll
			style={style}
			next={loadMoreCalls}
			hasMore={historyCalls && historyCalls.length % 10 === 0 && historyCalls.length !== 0}
			loader={<Loading/>}
			dataLength={historyCalls?.length ?? 0}>
			<Table>
				<thead>
				<TableHeaderRow>
					<TableHeader>Date</TableHeader>
					<TableHeader>Time</TableHeader>
					<TableHeader>Total</TableHeader>
					<TableHeader>Fee</TableHeader>
					<TableHeader>Net</TableHeader>
					<TableHeader noPadding style={{width: '10vw'}}>Payment<br/>Status</TableHeader>
				</TableHeaderRow>
				</thead>
				<tbody>
				{historyCalls ?
					historyCalls.map(videoCallDoc => generateHistoryCallRow({videoCallDoc})) :
					''}
				</tbody>
			</Table>
		</InfiniteScroll>
	) : <GettingStarted style={{margin: '20px 0 120px'}}/>
}