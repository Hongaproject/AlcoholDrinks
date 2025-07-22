import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebtn from "../Section/Sidebtn";
import { useUserContext } from "../auth/Context/UserContext";
import { FaRegHeart } from "react-icons/fa";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const Notification = styled.span`
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0 10px;
    }
`;

const TitleMain = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 100px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleNav = styled.nav`
    width: 800px;
    height: auto;
    border-bottom: 2px solid #000;
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
`;
const TitleNavL = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#008810" : "#000")};
`;
const TitleNavL2 = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${(props) => (props.active ? "#C98B20" : "#000")};
`;
const TitleNavL3 = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#0066D3" : "#000")};
`;
const TitleNavL4 = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#ccc" : "#000")};
`;
const TitleNavL5 = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#e05555" : "#000")};
`;

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 180px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 20px;
    }
`;

const Product = styled.div`
    width: 23%;
    margin-top: 80px;
    border: 1px solid #ebeaec;
    box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
    border-radius: 20px;

    @media (max-width: 768px) {
        width: 35%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 180px;
        height: 224px;
    }
`;

const ProductImgName = styled.h1`
    font-size: 32px;
    color: #000;
    text-align: center;
    margin-top: 30px;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const ProductImgCompany = styled.span`
    font-size: 20px;
    color: #909090;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    margin: 20px 0;
`;

const SavedMessage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
`;

const Favorite = styled.button`
    border: 0;
    background: none;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;

    svg {
        cursor: pointer;
        font-size: 30px;
        color: ${({ active }) => (active ? "red" : "black")};
        transition: color 0.3s ease;
        margin-right: 7px;
        margin-left: 10px;
        display: flex;
        align-items: center;
    }
`;

const FavoriteNumber = styled.span`
    font-size: 22px;
    height: 24px;
    color: #909090;
    font-weight: bold;
`;

// Main Component
export default function BrandList({ category }) {
    const {
        user,
        saveItem,
        savedItems,
        removeItem,
        favoriteCounts,
        incrementFavoriteCount,
        decrementFavoriteCount,
    } = useUserContext(); // Context함수에서 기능 가져오기

    const [products, setProducts] = useState([]); // 제품 목록을 저장할 상태 변수
    const [page, setPage] = useState(0); // 현재 페이지 번호 상태 변수
    const [loading, setLoading] = useState(false); //
    const loader = useRef(null); // IntersectionObserver를 위한 참조 변수
    const location = useLocation(); // 현재 위치
    const [favorite, setFavorite] = useState({}); // 즐겨찾기 상태 변수
    const [savedMessage, setSavedMessage] = useState(""); // 저장/삭제 메시지 변수
    const [activeTitle, setActiveTitle] = useState(""); // 활성화된 제목 상태 변수
    const navigate = useNavigate(""); // 페이지 이동

    // API에서 데이터 가져오고 8개씩 보여주게 설정
    const imgAPi = async (page = 1) => {
        if (page <= 0) return;
        setLoading(true);
        try {
            const res = await axios.get(`/db/brand${category}.json`);
            const data = res.data[category].map((item) => ({
                ...item,
                category,
            }));
            const newProducts = data.slice((page - 1) * 8, page * 8);
            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        } catch (error) {
            console.error(`${category} 데이터를 가져오는 중 오류 발생:`, error);
        }
        setLoading(false);
    };

    // 카테고리와 저장된 항목에 따라 즐겨찾기 상태 업데이트
    useEffect(() => {
        setProducts([]);
        setPage(0);
        if (savedItems) {
            const categoryFavorites = savedItems
                .filter((item) => item.category === category)
                .map((item) => item.id);
            setFavorite((prevFavorites) => ({
                ...prevFavorites,
                [category]: categoryFavorites,
            }));
        }
    }, [category, location.pathname, savedItems]);

    // 페이지 변경시 데이터 가져오기
    useEffect(() => {
        if (page > 0) {
            imgAPi(page);
        }
    }, [page]);

    // 현재 경로에 따라 카테고리 변경
    useEffect(() => {
        switch (location.pathname) {
            case `/brand/${category}`:
                setActiveTitle(category);
                break;
            default:
                setActiveTitle("");
        }
    }, [location.pathname, category]);

    // 제목 클릭 시 활성화된 제목 설정
    const handleClick = (title) => {
        setActiveTitle(title);
    };

    // 무한 스크롤 설정
    useEffect(() => {
        // IntersectionObserver를 사용하여 스크롤 감지
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage((prevPage) => prevPage + 1);
                    }
                });
            },
            { threshold: 1.0 },
        ); // 화면에 100% 보일 때 감지

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    // 제품 즐겨찾기 상태 토굴 함수
    const handleHeart = async (itemId) => {
        if (!user) {
            // 로그인하지 않은 상태일 경우 알림 표시
            alert("로그인 후 이용하실 수 있습니다.");
            navigate("/login");
            return;
        }

        const isFavorite = favorite[category]?.includes(itemId); // 현재 항목이 즐겨찾기 인지 확인

        if (isFavorite) {
            // 즐겨찾기 항목 제거
            setFavorite((prevFavorites) => ({
                ...prevFavorites,
                [category]: prevFavorites[category].filter(
                    (id) => id !== itemId,
                ),
            }));
            const item = products.find((product) => product.id === itemId);
            if (item) {
                await removeItem(itemId);
                await decrementFavoriteCount(category, itemId);
                setSavedMessage("상품이 삭제되었습니다.");
                setTimeout(() => setSavedMessage(""), 2000);
            }
        } else {
            // 즐겨찾기 항목 추가
            setFavorite((prevFavorites) => ({
                ...prevFavorites,
                [category]: [...(prevFavorites[category] || []), itemId],
            }));
            const item = products.find((product) => product.id === itemId);
            if (item) {
                await saveItem(item);
                await incrementFavoriteCount(category, itemId);
                setSavedMessage("상품이 저장되었습니다.");
                setTimeout(() => setSavedMessage(""), 2000);
            }
        }
    };

    const imgError = (e) => {
        e.target.src = `/imgnone.png`;
    };

    return (
        <Container>
            <TitleMain>
                <TitleNav>
                    <Link to="/brand/soju" style={{ textDecoration: "none" }}>
                        <TitleNavL active={activeTitle === "soju"}>
                            소주
                        </TitleNavL>
                    </Link>
                    <Link to="/brand/beer" style={{ textDecoration: "none" }}>
                        <TitleNavL2 active={activeTitle === "beer"}>
                            맥주
                        </TitleNavL2>
                    </Link>
                    <Link
                        to="/brand/makgeolli"
                        style={{ textDecoration: "none" }}
                    >
                        <TitleNavL3 active={activeTitle === "makgeolli"}>
                            막걸리
                        </TitleNavL3>
                    </Link>
                    <Link to="/brand/liquor" style={{ textDecoration: "none" }}>
                        <TitleNavL4 active={activeTitle === "liquor"}>
                            증류주
                        </TitleNavL4>
                    </Link>
                    <Link to="/brand/new" style={{ textDecoration: "none" }}>
                        <TitleNavL5 active={activeTitle === "new"}>
                            신제품
                        </TitleNavL5>
                    </Link>
                </TitleNav>
            </TitleMain>
            <Sidebtn />
            <Notification>
                전통주를 제외한 주류/담배등은 관령 법령에 의거하여 인터넷
                쇼핑몰에서는 판매가 불가합니다.
            </Notification>
            <Outline role="region">
                {products.map((item) => (
                    <Product key={item.id}>
                        <Link
                            to={`/brand/detail/${item.category}/${item.id}`}
                            style={{
                                textDecoration: "none",
                                color: "#000",
                                cursor: "pointer",
                            }}
                            aria-label={`${item.name}의 상세 페이지로 이동`}
                        >
                            <ProductImg
                                src={item.url}
                                alt={`${item.name} 이미지`}
                                onError={imgError}
                            />
                            <ProductImgName>{item.name}</ProductImgName>
                            <ProductImgCompany>
                                {item.company}
                            </ProductImgCompany>
                        </Link>
                        <Favorite
                            onClick={() => handleHeart(item.id)}
                            active={favorite[category]?.includes(item.id)}
                            aria-label={`좋아요 ${favorite[category]?.includes(item.id) ? "취소" : "추가"} 버튼`}
                        >
                            <FaRegHeart />
                            <FavoriteNumber>
                                {favoriteCounts[category]?.[item.id] || 0}
                            </FavoriteNumber>
                        </Favorite>
                    </Product>
                ))}
            </Outline>
            {loading && (
                <Loader role="status" aria-live="polite">
                    <img src="/img/Spinner.webp" alt="로딩 중..." />
                </Loader>
            )}
            <div
                ref={loader}
                style={{ height: "100px", background: "transparent" }}
            ></div>
            {savedMessage && (
                <SavedMessage role="alert" aria-live="assertive">
                    {savedMessage}
                </SavedMessage>
            )}
        </Container>
    );
}
