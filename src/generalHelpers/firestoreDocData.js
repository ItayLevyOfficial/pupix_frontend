import {useEffect, useState} from 'react'

export function useFirestoreDocumentData(documentPath) {
	
	const [userDocData, setUserDocData] = useState(null)
	
	useEffect(() => {
		if (documentPath) {
			return documentPath.onSnapshot(snapshot => {
				if (snapshot.exists) {
					setUserDocData(snapshot.data())
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [documentPath?.path])
	
	return [userDocData, setUserDocData]
}