import firebase from 'firebase/app'
import 'firebase/firestore'

export const userDocRef = (userId) => userId ? firebase.firestore().collection('users').doc(userId) : ''

export const userPIDocRef = (userId) => userId ? firebase.firestore().collection('usersPrivateInfo').doc(userId) : ''

export const videoCallDocRef = (videoRoomId) => firebase.firestore().collection('videoCalls').doc(videoRoomId)

export const documentRef = (docId, collectionName) => firebase.firestore().collection(collectionName).doc(docId)
