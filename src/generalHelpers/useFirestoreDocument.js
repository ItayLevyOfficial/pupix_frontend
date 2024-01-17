import {useEffect, useState} from 'react'

export function useFirestoreDocument(documentPath) {
	
	const [userDoc, setUserDoc] = useState(null)
	
	useEffect(() => {
		if (documentPath) {
			return documentPath.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					setUserDoc(documentSnapshot)
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [documentPath?.path])
	
	return [userDoc, setUserDoc]
}