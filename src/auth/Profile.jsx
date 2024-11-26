import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useUserContext } from "./Context/UserContext";
import { useRef } from "react";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const Section = styled.div`
    width: calc(100% - 660px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 120px;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 50px;
        align-items: center;
        text-align: center;
    }
`;

const UserImg = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    svg {
        width: 50px;
    }
`;

const User = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;
const UserName = styled.h1`
    font-size: 24px;
    margin-top: 20px;
`;
const Store = styled.div`
    width: 100%;
    margin-top: 100px;
    align-items: flex-start;
`;

const StoreTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
`;

const StoreProductContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const StoreProduct = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 20px;
    padding-bottom: 10px;
`;

const StoreItem = styled.div`
    width: 170px;
    border-radius: 8px;
    border: 2px solid #ebeaec;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    @media (max-width: 768px) {
        width: 195px;
    }
`;

const Linked = styled.div`
    height: 180px;
    position: fixed;
    margin-left: 150px;

    @media (max-width: 768px) {
        position: static;
        margin: 20px 0;
    }
`;
const Home = styled.div`
    cursor: pointer;
`;

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
`;

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
`;

const ProductImgName = styled.h2`
    font-size: 28px;
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

const PrevButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 66%;
    left: 13%;
    z-index: 1;
    cursor: pointer;
    & > svg {
        transform: rotate(180deg);
        color: #858585;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const NextButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 66%;
    right: 13%;
    cursor: pointer;
    color: #858585;

    @media (max-width: 768px) {
        display: none;
    }
`;

export default function Profile() {
    const { user, savedItems } = useUserContext(); // Context에서 사용자 및 저장된 정보 가져옴
    const navigate = useNavigate();
    const storeProductRef = useRef(null);

    // 방향에 따라 컨테이너를 스크롤 할 수 있는 스크롤 함수
    const scroll = (direction) => {
        if (storeProductRef.current) {
            const scrollAmount = 225; // 스크롤할 너비 설정
            if (direction === "left") {
                storeProductRef.current.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth",
                });
            } else {
                storeProductRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }
    };

    // 로그아웃 함수
    const Logout = () => {
        const ok = window.confirm("로그아웃을 하시겠습니까?");
        if (ok) {
            auth.signOut();
            navigate("/");
        }
    };

    return (
        <Container>
            <Linked>
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#000" }}
                    aria-label="홈으로 이동"
                >
                    <Home>
                        <img src="/img/back.png" alt="뒤로 가기" />
                    </Home>
                </Link>
                <LogOut
                    className="logout"
                    onClick={Logout}
                    role="button"
                    aria-label="로그아웃"
                >
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
                    {user && user.photoURL ? (
                        <User
                            src={user.photoURL}
                            alt={`${user.name}의 프로필 사진`}
                        />
                    ) : (
                        <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                    )}
                </UserImg>
                <UserName>{user ? user.name : "이름 없음"}</UserName>
                <Store>
                    <StoreTitle>좋아요 상품</StoreTitle>
                    {savedItems.length > 0 ? (
                        <StoreProductContainer>
                            <PrevButton
                                onClick={() => scroll("left")}
                                role="button"
                                aria-label="이전 상품 보기"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                                    />
                                </svg>
                            </PrevButton>
                            <StoreProduct ref={storeProductRef}>
                                {savedItems.map((item) => (
                                    <StoreItem key={item.id}>
                                        <Link
                                            to={`/brand/detail/${item.category}/${item.id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                            aria-label={`${item.name} 상세 페이지로 이동`}
                                        >
                                            <ProductImg
                                                src={item.url}
                                                alt={item.name}
                                            />
                                            <ProductImgName>
                                                {item.name}
                                            </ProductImgName>
                                            <ProductImgCompany>
                                                {item.company}
                                            </ProductImgCompany>
                                        </Link>
                                    </StoreItem>
                                ))}
                            </StoreProduct>
                            <NextButton
                                onClick={() => scroll("right")}
                                role="button"
                                aria-label="다음 상품 보기"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                                    />
                                </svg>
                            </NextButton>
                        </StoreProductContainer>
                    ) : (
                        <p>저장된 상품이 없습니다.</p>
                    )}
                </Store>
            </Section>
        </Container>
    );
}
