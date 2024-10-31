import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`
const HeaderContainer = styled.div`
    position: relative;
    
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const IntroduceTitle = styled.h1`
    width: 20%;
    height: 75px;
    font-size: 48px;
    margin-left: 200px;
    margin-top: 160px;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        font-size: 2rem;
        text-align: center;
    }
`

const CompanyMove = styled.span`
    float: right;
    font-size: 20px;
    margin-right: 200px;
    margin-top: 60px;
    margin-bottom: 60px;

    @media (max-width: 768px) {
        margin-right: 0;
        float: none;
        display: block;
        text-align: center;
        order: 1;
    }
`

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
`

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 130px;
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        gap: 80px;
    }
`;

const Shops = styled.div`
    width: 45%;
    height: 200px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        width: 90%;
    }
`

const ShopImg = styled.img`  
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const ShopTitle = styled.h2`
    font-size: 24px;
    margin-top: 20px;
`
const ShopHomepage = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;
`
const ShopTel = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;
`
const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    margin-top: 160px;

    @media (max-width: 768px) {
        margin-top: 80px;
        margin-bottom: 50px;
    }
`;

const PaginationButton = styled.button`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const PageNumber = styled.span`
    font-size: 18px;
    margin: 0 10px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export default function Shop () {

    const [shopImg, setShopImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 8;

    // API로 company 데이터를 가져 옴
    const shopImgApi = async() => {
        const res = await axios.get("/db/shop.json");
        setShopImg(res.data.shop.filter(item => item.name !== "")); // 이름이 비어있지 않은 항목만 상태에 저장
    }

    // 컴포넌트 마운트시 회사 이미지 데이터 가져오기
    useState(() => {
        shopImgApi();
    }, []);

    const totalPages = Math.ceil(shopImg.length / companiesPerPage); // 총 페이지수 계산
    
    // 현재 페이지에 해당하는 회사 이미지 목록을 slice해서 가져옴
    const currentShops = shopImg.slice(
        (currentPage - 1) * companiesPerPage,
        currentPage * companiesPerPage
    );

    // 이전 페이지 이동 함수
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지 이동 함수
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return(
        <Container>
            <HeaderContainer>
                <IntroduceTitle>판매처 소개</IntroduceTitle>
                <Link to='/company' style={{ textDecoration: "none", color: "#000" }}>
                    <CompanyMove>회사소개 구경하기</CompanyMove>
                </Link>
            </HeaderContainer>
            <Notification>전통주를 제외한 주류/담배등은 관령 법령에 의거하여 인터넷 쇼핑몰에서는 판매가 불가합니다.</Notification>
            <Sidebtn />
            <Outline>
                {
                    currentShops.map((item)=> (
                        <Shops key={item.id} onClick={()=> window.open(`${item.homepage}`)}>
                            <ShopImg src={item.url}/>
                            <ShopTitle>{item.name}</ShopTitle>
                            <ShopHomepage>{item.homepage}</ShopHomepage>
                            <ShopTel>{item.tel}</ShopTel>
                        </Shops>
                    ))
                }
            </Outline>
            <PaginationControls>
                <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                    이전
                </PaginationButton>
                <PageNumber>{currentPage} / {totalPages}</PageNumber>
                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    다음
                </PaginationButton>
            </PaginationControls>
        </Container>
    );
}