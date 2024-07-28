import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";

// UserContext생성
// React의 createContext를 사용해서 Context 객체를 생성
// Context 객체는 애플리케이션 전역 상태를 관리하는데 사용
const UserContext = createContext();

export const UserProvider = ({children}) => {
    // user 상태와 setUser 상태 업데이트 함수
    // useState 훅을 사용하여 user 상태를 정의
    // 초기값은 null로 설정, setUser는 user 상태를 업데이트하는 함수.
    const [user, setUser] = useState(null);
    const [savedItems, setSavedItems] = useState([]); // 저장된 상품 상태 추가

    useEffect(() => { // 로그인 유지
        // Firebase의 onAuthStateChanged 메서드를 사용하여 사용자 상태 감시
        const userCheck = onAuthStateChanged(auth, async(currentUser) => {
            if(currentUser) {
                // 사용자가 로그인되어 있는 경우, 사용자 상태 업데이트
                setUser({name: currentUser.displayName, photoURL: currentUser.photoURL});

                // Firestore에서 저장된 아이템 불러오기
                const userDoc = await db.collection('users').doc(currentUser.uid).get();
                if(userDoc.exists){ // exists는 Firestore에서 제공하는 속성 문서가 존재하면 true, 존재하지 않으면 false를 반환함.
                    // Firestore에 저장된 사용자 문서가 존재하는 경우, savedItems를 상태로 설정
                    setSavedItems(userDoc.data().savedItems || []);
                } else {
                    // 사용자 문서가 존재하지 않는 경우, 새 문서 생성
                    await db.collection('users').doc(currentUser.uid).set({savedItems: []}); 
                }
            } else {
                // 사용자가 로그아웃된 경우, 사용자 상태를 null로 설정
                setUser(null);
                setSavedItems([]);
            }
        })
        // 컴포넌트 언마운트 시 이벤트 리스너 해제
        return () => userCheck();
    }, []);

    // 상품을 저장하는 함수
    const saveItem = async (item) => {
        if (user) { // 사용자 로그인 확인 
            const userRef = db.collection('users').doc(auth.currentUser.uid); // 사용자의 문서를 참조하고 로그인된 사용자의 고유 UID를 확인합니다.
            // Firestore 필드 값을 업데이트하여 아이템 추가
            await userRef.update({ // update 메서드를 사용해서 해당 문서를 업데이트 함.
                savedItems: firebase.firestore.FieldValue.arrayUnion(item) // Firestore에서 제공하는 메서드 배열 필드에 값을 추가, 중목 항목을 허용하지 않고, 추가하려는 값이 배열에 이미 존재하면 무시한다.
            });
            // 로컬 상태 업데이트
            setSavedItems(prevItems => [...prevItems, item]);
        }
    }


    return(
        <UserContext.Provider value={{user, setUser, savedItems, saveItem}}>
            {children}
        </UserContext.Provider>
    );
}

// useUserContext 커스텀 훅
// useContext 훅을 사용하여 UserContext에서 현재 컨텍스트 값을 가져오는 커스텀 훅
// 이 훅을 통해 Context를 사용하는 컴포넌트가 user 상태와 setUser 함수를 간편하게 접근할 수 있다.
export const useUserContext = () => useContext(UserContext);
