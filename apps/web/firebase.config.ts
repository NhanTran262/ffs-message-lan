import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDKVZjRLYK8wVW9iMbx8iVNu0vD_PDeRqg',
  authDomain: 'ffs-ping.firebaseapp.com',
  projectId: 'ffs-ping',
  storageBucket: 'ffs-ping.firebasestorage.app',
  messagingSenderId: '138063447063',
  appId: '1:138063447063:web:ef80fa6fec304fda95c852',
  measurementId: 'G-469XS0GGKR'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)

export { auth }
