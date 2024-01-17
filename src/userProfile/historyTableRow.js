import styled from 'styled-components'
import {pad} from '../generalHelpers/generalFunctions'
import React from 'react'
import SmallSuccessIcon from '../icons/smallSuccessIcon.svg'

const TableCell = styled.td`
  font-size: 13px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  vertical-align: middle;
`

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  height: 60px;
`

const HistoryTableRow = ({date, time, totalEarnings, pupikFee, netEarnings, handleClick}) => {
	return (
		<TableRow align='center' onClick={handleClick}>
			<TableCell style={{width: '20vw'}}>{date}</TableCell>
			<TableCell>{time}</TableCell>
			<TableCell>{`$ ${totalEarnings}`}</TableCell>
			<TableCell>{`$ ${pupikFee}`}</TableCell>
			<TableCell>{`$ ${netEarnings}`}</TableCell>
			<TableCell>
				<SmallSuccessIcon style={{width: '25px'}}/>
			</TableCell>
		</TableRow>
	)
}

export const generateHistoryCallRow = ({videoCallDoc}) => {
	const {clientConnectionTime, callPrice, totalTips} = videoCallDoc.data()
	const totalEarnings = callPrice + (totalTips ?? 0)
	const clientConnectionDate = new Date(clientConnectionTime)
	const callDateStr = `${clientConnectionDate.getDate()}/${clientConnectionDate.getMonth() +
	1}/${clientConnectionDate.getFullYear()}`
	const callTimeStr = `${pad(clientConnectionDate.getHours(), 2)}:${pad(clientConnectionDate.getMinutes(), 2)}`
	const netEarnings = Math.ceil(totalEarnings * 90) / 100
	const pupikFee = Math.floor(totalEarnings * 10) / 100
	return <HistoryTableRow
		key={videoCallDoc.ref.id} totalEarnings={totalEarnings} date={callDateStr}
		time={callTimeStr} netEarnings={netEarnings} pupikFee={pupikFee}/>
}