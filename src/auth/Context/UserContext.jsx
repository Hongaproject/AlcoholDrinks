import { createContext, useContext, useState } from "react";

// UserContext생성
// React의 createContext를 사용해서 Context 객체를 생성
// Context 객체는 애플리케이션 전역 상태를 관리하는데 사용
const UserContext = createContext();

export const UserProvider = ({children}) => {
    // user 상태와 setUser 상태 업데이트 함수
    // useState 훅을 사용하여 user 상태를 정의
    // 초기값은 null로 설정, setUser는 user 상태를 업데이트하는 함수.
    const [user, setUser] = useState(null);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

// useUserContext 커스텀 훅
// useContext 훅을 사용하여 UserContext에서 현재 컨텍스트 값을 가져오는 커스텀 훅
// 이 훅을 통해 Context를 사용하는 컴포넌트가 user 상태와 setUser 함수를 간편하게 접근할 수 있다.
export const useUserContext = () => useContext(UserContext);
