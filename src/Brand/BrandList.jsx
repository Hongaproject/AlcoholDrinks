import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Sidebtn from '../Section/Sidebtn';

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

// Main Component
export default function BrandList({ category }) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0); // 페이지 상태를 0으로 초기화
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);
    const location = useLocation();

    const imgAPi = async (page = 1) => {
        if (page <= 0) return; // 페이지가 0 이하일 때는 데이터 페칭하지 않음
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

    useEffect(() => {
        setProducts([]); // 카테고리 변경 시 제품 목록 초기화
        setPage(0);      // 페이지 번호 초기화
    }, [category, location.pathname]);

    useEffect(() => {
        if (page > 0) {
            imgAPi(page); // 페이지가 변경될 때마다 데이터 가져오기
        }
    }, [page]);

    const [activeTitle, setActiveTitle] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case `/brand/${category}`:
                setActiveTitle(category);
                break;
            default:
                setActiveTitle('');
        }
    }, [location.pathname, category]);

    const handleClick = (title) => {
        setActiveTitle(title);
    };

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setPage(prevPage => prevPage + 1);
                }
            });
        }, { threshold: 1.0 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

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
                    </Product>
                ))}
            </Outline>
            {loading && (
                <Loader>
                    <img src="/img/Spinner.gif" alt="Loading..." />
                </Loader>
            )}
            <div ref={loader} style={{ height: '100px', background: 'transparent' }}></div>
        </Container>
    );
}
