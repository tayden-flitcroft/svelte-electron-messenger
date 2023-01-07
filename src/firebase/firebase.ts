import { initializeApp } from 'firebase/app'
import { connectStorageEmulator, getDownloadURL, getStorage, ref } from 'firebase/storage'
import {
	User,
	connectAuthEmulator,
	createUserWithEmailAndPassword,
	getAuth
} from 'firebase/auth'
import { connectFirestoreEmulator, doc, getFirestore, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	appId: '1:981804038186:web:47bad81d839829680e2b53',
	authDomain: 'messenger-c6186.firebaseapp.com',
	databaseURL: 'https://messenger-c6186-default-rtdb.firebaseio.com',
	measurementId: 'G-Y1JH2QR4YN',
	messagingSenderId: '981804038186',
	projectId: 'messenger-c6186',
	storageBucket: 'messenger-c6186.appspot.com'
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://localhost:9099/')
	connectStorageEmulator(storage, 'localhost', 9199)
	connectFirestoreEmulator(firestore, 'localhost', 8080)
	console.warn('Firebase Emulators Started...')
}

export const createUser = async (
	emailAddress: string,
	password: string
): Promise<User | unknown> => {
	try {
		const { user }: { user: User } = await createUserWithEmailAndPassword(
			auth,
			emailAddress,
			password
		)
		return { ...user }
	} catch (err: unknown) {
		return err
	}
}

export const writeUserData = async (userId: string, extras: object) => {
	await setDoc(doc(firestore, 'users', userId), { ...extras })
}

export const getStorageItem = async (path: string): Promise<string> => {
	return await getDownloadURL(ref(storage, path))
}
