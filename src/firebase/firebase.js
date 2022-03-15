import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyD8XiKp7GcNWewqjxQU3qSWucgVQ74fGyA",
    authDomain: "quiz-js-bb522.firebaseapp.com",
    databaseURL: "https://quiz-js-bb522-default-rtdb.firebaseio.com",
    projectId: "quiz-js-bb522",
    storageBucket: "quiz-js-bb522.appspot.com",
    messagingSenderId: "409910303075",
    appId: "1:409910303075:web:5e5505a095bb778b97db56"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Get a list of cities from your database
export async function getQuiz(db) {
  const quiz = collection(db, 'quiz')
  const quizSnapshot = await getDocs(quiz)
  const quizList = quizSnapshot.docs.map(doc => doc.data())
  return quizList
}