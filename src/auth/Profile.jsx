import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useUserContext } from "./Context/UserContext";

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const Section = styled.div`
    width: calc(100% - 660px);
    height: 100%;
    display: flex;
    flex-direction: column; // 수직 방향으로 
    align-items: center; 
    justify-content: center; // 수평 수직 모두 중앙정렬
    margin: 0 auto;
    margin-top: 120px;
`
const UserImg = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center; // 내부요소가 가운데로 오게 정렬
    margin-top: 70px;
    svg {
        width: 50px;
    }
`

const User = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const UserName = styled.h1`
    font-size: 24px;
    margin-top: 20px;
`
const Store = styled.div`
    width: 100%;
    margin-top: 100px; 
    align-items: flex-start; // 요소가 왼쪽부터 시작 할 수 있게 도와줌.
`

const StoreTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 10px; 
`

const StoreProduct = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    gap: 20px;
    border: 3px solid #000;
    padding-bottom: 10px; // 스크롤바 공간 확보
`

const StoreItem = styled.div`
    min-width: 210px; // 아이템의 최소 너비 설정
    border-radius: 8px;
    border: 2px solid #EBEAEC;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

const Linked = styled.div`
    height: 180px;
    position: fixed;
    margin-left: 150px;
`
const Home = styled.div`
    cursor: pointer;
    
`
    
const LogOut = styled.div`
    cursor: pointer;
    margin-top: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    svg {
    width: 30px;
    fill: white;
    }
    &.logout {
        border-color: tomato;
        svg {
            fill: tomato;
        }
    }
`

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
`;

const ProductImgName = styled.h2`
    font-size: 32px;
    color: #000;
    text-align: center;
    margin-top: 30px;
`;

const ProductImgCompany = styled.span`
    font-size: 20px;
    color: #909090;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Profile () {
    
    const {user, savedItems} = useUserContext();

    const navigate = useNavigate();

    const Logout = () => {
        const ok = window.confirm("로그아웃을 하시겠습니까?");
        if(ok) {
            auth.signOut();
            navigate("/");
        }
    }
    
    console.log('User:', user); // 디버깅: 현재 사용자 정보 출력
    console.log('Saved Items:', savedItems); // 디버깅: 저장된 아이템 출력

    return(
        <Container>
            <Linked>
                <Link to='/' style={{ textDecoration: "none", color: "#000" }}>
                    <Home>
                        <img src="/img/back.png" alt="뒤로 가기"/>
                    </Home>
                </Link>
                <LogOut className="logout" onClick={Logout}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                        />
                        <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                        />
                    </svg>
                </LogOut>   
            </Linked>
            <Section>
                <UserImg>
                    {
                        user && user.photoURL ? (
                            <User src={user.photoURL} alt="Profile" />
                        ) : (
                            <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                            </svg>
                        )
                    }   
                </UserImg>
                <UserName>{user ? user.name : '이름 없음'}</UserName>
                <Store>
                    <StoreTitle>저장 상품</StoreTitle>
                    {savedItems.length > 0 ? (
                        <StoreProduct>
                            {
                                savedItems.map((item) => (
                                    <StoreItem key={item.id}>
                                        <Link to={`/brand/detail/${item.category}/${item.id}`} style={{ textDecoration: "none", color: "#000" }}>
                                            <ProductImg src={item.url} alt={item.name}/>
                                            <ProductImgName>{item.name}</ProductImgName>
                                            <ProductImgCompany>{item.company}</ProductImgCompany>
                                        </Link>
                                    </StoreItem>
                                ))
                            }
                        </StoreProduct>
                    ) : (
                        <p>저장된 상품이 없습니다.</p>
                    )}
                </Store>
            </Section>
        </Container>
    );
}