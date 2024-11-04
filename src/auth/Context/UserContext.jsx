import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

// UserContext 생성 
// 애플리케이션 전역 상태를 관리하는데 사용
const UserContext = createContext();

export const UserProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [savedItems, setSavedItems] = useState([]);
    const [favoriteCounts, setFavoriteCounts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    // 사용자 인증 상태 변화 감지 및 처리
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    // 사용자 정보 업데이트
                    setUser({ name: currentUser.displayName, photoURL: currentUser.photoURL });
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setSavedItems(userDoc.data().savedItems || []);
                    } else {
                        await setDoc(userDocRef, { savedItems: [] });
                    }
                } else {
                    setUser(null);
                    setSavedItems([]);
                }
            } catch (error) {
                console.error("Error in auth state change: ", error);
            }
        });
        return () => unsubscribe(); // 언마운트시 해제
    }, []);

    // 저장 상품 숫자 초기화
    useEffect(() => {
        const fetchFavoriteCounts = async () => {
            try {
                const countsDocRef = doc(db, 'favoriteCounts', 'global');
                const countsDoc = await getDoc(countsDocRef);
                if (countsDoc.exists()) {
                    setFavoriteCounts(countsDoc.data());
                } else {
                    await setDoc(countsDocRef, {});
                    setFavoriteCounts({});
                }
            } catch (error) {
                console.error("Error fetching favorite counts: ", error);
            }
        };
        fetchFavoriteCounts();
    }, []);

    // 저장 상품 함수
    const saveItem = async (item) => {
        if (user) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    savedItems: arrayUnion(item)
                });
                setSavedItems(prevItems => [...prevItems, item]);
            } catch (error) {
                console.error("Error saving item: ", error);
            }
        }
    };  

    // 저장 상품 삭제 함수
    const removeItem = async (itemId) => {
        if (user) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const userDoc = await getDoc(userRef);
                const updatedItems = userDoc.data().savedItems.filter(item => item.id !== itemId);
                await updateDoc(userRef, {
                    savedItems: updatedItems
                });
                setSavedItems(updatedItems);
            } catch (error) {
                console.error("Error removing item: ", error);
            }
        }
    };

    // 저장 상품 카운터 증가 함수
    const incrementFavoriteCount = async (category, itemId) => {
        try {
            const countsDocRef = doc(db, 'favoriteCounts', 'global');
            const countsDoc = await getDoc(countsDocRef);
            const counts = countsDoc.data();
            if (!counts[category]) {
                counts[category] = {};
            }
            counts[category][itemId] = (counts[category][itemId] || 0) + 1;
            await updateDoc(countsDocRef, counts);
            setFavoriteCounts(counts);
        } catch (error) {
            console.error("Error incrementing favorite count: ", error);
        }
    };

    // 저장 상품 카운터 감소 함수
    const decrementFavoriteCount = async (category, itemId) => {
        try {
            const countsDocRef = doc(db, 'favoriteCounts', 'global');
            const countsDoc = await getDoc(countsDocRef);
            const counts = countsDoc.data();
            if (counts[category] && counts[category][itemId]) {
                counts[category][itemId] = Math.max(0, counts[category][itemId] - 1);
                await updateDoc(countsDocRef, counts);
                setFavoriteCounts(counts);
            }
        } catch (error) {
            console.error("Error decrementing favorite count: ", error);
        }
    };
    
    // 사용자 가입 함수
    const submitSignUp = async(name, email, password) => {
        setErr("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setIsLoading(true);
            const userCreate = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCreate.user, { displayName: name }); // 사용자 프로필 업데이트
            setUser({ name }); // Context에 사용자 정보 설정
            const userDocRef = doc(db, 'users', userCreate.user.uid);
            await setDoc(userDocRef, { savedItems: [] });
            return userCreate.user;
        } catch (e) {
            if (e instanceof FirebaseError) {
                setErr(e.message);
            }
        } finally {
            setIsLoading(false);
        }

    }

    // 사용자 로그인 함수
    const submitLogin = async (email, password) => {
        setErr("");
        if(isLoading || email === "" || password === "") return;
        try{
            setIsLoading(true);
            const userSignup = await signInWithEmailAndPassword(auth, email, password);
            const user = userSignup.user;
            setUser({ name: user.displayName, photoURL: user.photoURL }) // Context에 사용자 정보 설정
            return user;
        } catch(e){
            if(e instanceof FirebaseError){
                setErr(e.message);
            }
        } finally{
            setIsLoading(false);
        }
    }

    // OAuth 로그인 함수
    const submitOauth = async(provider) => {
        try{
            setIsLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser({ name: user.displayName, photoURL: user.photoURL }); // Context에 사용자 정보 설정 photoURL
            return user;
        } catch(e){
            if(e instanceof FirebaseError){
                setErr(e.message);
            }
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, savedItems, saveItem, removeItem, favoriteCounts, incrementFavoriteCount, decrementFavoriteCount, isLoading, err, setErr, submitLogin, submitOauth, submitSignUp}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
