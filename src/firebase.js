import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);

// FireStore 와 Storage차이
// FireStore 문서와 컬렉션으로 데이터를 구조화, 실시간 동기화 가능 -> 사용 예) 사용자 정보, 상품 목록, 채팅 메시지 등 구조화 데이터 저장 등
// Storage 파일 저장 및 관리. 대용량 파일 저장 가능, 이미지, 비디오, 오디오, 기타 파일 -> 사용자 프로필 사진, 비디오 파일, 앱 내 미디어 콘텐츠 등