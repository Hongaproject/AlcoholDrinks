
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebtn from '../Section/Sidebtn';
import { useUserContext } from '../auth/Context/UserContext';
import { FaRegHeart } from "react-icons/fa";

// Styled-components
const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Introduce = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 160px;
`;

const IntroduceTitle = styled.h1`
    width: 230px;
    height: 80px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.active ? '#87CEEB' : '#FFFFFF')}; /* SkyBlue when active */
    box-shadow: 5px 3px 0px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-right: 70px;
    font-size: 32px;
    cursor: pointer;
    transition: background 0.3s ease;
    color: #000;
`;

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 180px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const Product = styled.div`
    width: 23%;
    margin-top: 90px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
`;

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
`;

const ProductImgName = styled.h1`
    font-size: 32px;
    color: #000;
    text-align: center;
    margin-top: 30px;
`;

const ProductImgPrice = styled.span`
    font-size: 20px;
    color: #909090;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
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

    svg {
        cursor: pointer; /* 버튼에 커서 추가 */
        font-size: 30px; /* 아이콘 크기 설정 */
        color: ${({ active }) => (active ? 'red' : 'black')}; /* 아이콘 색상 설정 */
        transition: color 0.3s ease; /* 색상 변경 애니메이션 */
        margin-right: 7px; /* 아이콘 오른쪽 여백 */
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
`

// Main Component
export default function BrandList({ category }) {
    
    const { user, saveItem, savedItems, removeItem, favoriteCounts, incrementFavoriteCount, decrementFavoriteCount } = useUserContext(); // Context함수에서 기능 가져오기
    
    const [products, setProducts] = useState([]); // 제품 목록을 저장할 상태 변수
    const [page, setPage] = useState(0); // 현재 페이지 번호 상태 변수
    const [loading, setLoading] = useState(false); // 
    const loader = useRef(null); // IntersectionObserver를 위한 참조 변수
    const location = useLocation(); // 현재 위치 
    const [favorite, setFavorite] = useState({}); // 즐겨찾기 상태 변수
    const [savedMessage, setSavedMessage] = useState(''); // 저장/삭제 메시지 변수
    const [activeTitle, setActiveTitle] = useState(''); // 활성화된 제목 상태 변수
    const navigate = useNavigate(''); // 페이지 이동

    // API에서 데이터 가져오고 8개씩 보여주게 설정
    const imgAPi = async (page = 1) => {
        if (page <= 0) return;
        setLoading(true);
        try {
            const res = await axios.get(`/db/brand${category}.json`); 
            const data = res.data[category].map(item => ({ ...item, category })); 
            const newProducts = data.slice((page - 1) * 8, page * 8);
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
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
                .filter(item => item.category === category)
                .map(item => item.id);
            setFavorite(prevFavorites => ({
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
                setActiveTitle('');
        }
    }, [location.pathname, category]);

    // 제목 클릭 시 활성화된 제목 설정
    const handleClick = (title) => {
        setActiveTitle(title);
    };

    // 무한 스크롤 설정
    useEffect(() => {
        // IntersectionObserver를 사용하여 스크롤 감지
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setPage(prevPage => prevPage + 1); 
                }
            });
        }, { threshold: 1.0 }); // 화면에 100% 보일 때 감지

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
        if (!user) { // 로그인하지 않은 상태일 경우 알림 표시
            alert('로그인 후 이용하실 수 있습니다.');
            navigate('/login');
            return;
        }

        const isFavorite = favorite[category]?.includes(itemId); // 현재 항목이 즐겨찾기 인지 확인 
    
        if (isFavorite) {
            // 즐겨찾기 항목 제거
            setFavorite(prevFavorites => ({
                ...prevFavorites,
                [category]: prevFavorites[category].filter(id => id !== itemId),
            }));
            const item = products.find(product => product.id === itemId);
            if (item) {
                await removeItem(itemId);
                await decrementFavoriteCount(category, itemId);
                setSavedMessage('상품이 삭제되었습니다.');
                setTimeout(() => setSavedMessage(''), 2000);
            }
        } else {
            // 즐겨찾기 항목 추가
            setFavorite(prevFavorites => ({
                ...prevFavorites,
                [category]: [...(prevFavorites[category] || []), itemId],
            }));
            const item = products.find(product => product.id === itemId);
            if (item) {
                await saveItem(item);
                await incrementFavoriteCount(category, itemId);
                setSavedMessage('상품이 저장되었습니다.');
                setTimeout(() => setSavedMessage(''), 2000);
            }
        }
    };

    return (
        <Container>
            <Introduce>
                <Link to='/brand/soju' style={{ textDecoration: "none", color: "#000" }}>
                    <IntroduceTitle
                        active={activeTitle === 'soju'}
                        onClick={() => handleClick('soju')}
                    >
                        소주
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/beer' style={{ textDecoration: "none", color: "#000" }}>
                    <IntroduceTitle
                        active={activeTitle === 'beer'}
                        onClick={() => handleClick('beer')}
                    >
                        맥주
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/liquor' style={{ textDecoration: "none", color: "#000" }}>
                    <IntroduceTitle
                        active={activeTitle === 'liquor'}
                        onClick={() => handleClick('liquor')}
                    >
                        증류주
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/makgeolli' style={{ textDecoration: "none", color: "#000" }}>
                    <IntroduceTitle
                        active={activeTitle === 'makgeolli'}
                        onClick={() => handleClick('makgeolli')}
                    >
                        막걸리
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/new' style={{ textDecoration: "none", color: "#000" }}>
                    <IntroduceTitle
                        active={activeTitle === 'new'}
                        onClick={() => handleClick('new')}
                    >
                        신제품
                    </IntroduceTitle>
                </Link>
            </Introduce>
            <Sidebtn />
            <Outline>
                {products.map(item => (
                    <Product key={item.id}>
                        <Link to={`/brand/detail/${item.category}/${item.id}`} style={{ textDecoration: "none", color: "#000" }}>
                            <ProductImg src={item.url} />
                            <ProductImgName>{item.name}</ProductImgName>
                            <ProductImgPrice>{item.company}</ProductImgPrice>
                        </Link>
                        <Favorite 
                            onClick={() => handleHeart(item.id)}
                            active={favorite[category]?.includes(item.id)}
                        >
                            <FaRegHeart />
                            <FavoriteNumber>{favoriteCounts[category]?.[item.id] || 0}</FavoriteNumber>
                        </Favorite>
                    </Product>
                ))}
            </Outline>
            {loading && (
                <Loader>
                    <img src="/img/Spinner.gif" alt="Loading..." />
                </Loader>
            )}
            <div ref={loader} style={{ height: '100px', background: 'transparent' }}></div>
            {savedMessage && <SavedMessage>{savedMessage}</SavedMessage>}
        </Container>
    );
}