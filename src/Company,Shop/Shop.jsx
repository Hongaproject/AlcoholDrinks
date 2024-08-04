import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const IntroduceTitle = styled.h1`
    width: 295px;
    height: 75px;
    font-size: 48px;
    margin-left: 200px;
    margin-top: 160px;
    margin-bottom: 100px;
`

const CompanyMove = styled.span`
    float: right;
    font-size: 20px;
    margin-right: 200px;
    margin-top: 60px;
`

const Notification = styled.span`
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-top: 150px;
    margin-bottom: 130px;
    display: flex;
    flex-wrap: wrap;
    gap: 140px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Shops = styled.div`
    width: 600px;
    height: 200px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 60px;
`

const ShopImg = styled.img`  
    width: 600px;
    height: 200px;
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
`;

export default function Shop () {

    const [shopImg, setShopImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 8;


    const shopImgApi = async() => {
        const res = await axios.get("/db/shop.json");
        setShopImg(res.data.shop.filter(item => item.name !== ""));
    }

    useState(() => {
        shopImgApi();
    }, []);

    const totalPages = Math.ceil(shopImg.length / companiesPerPage);

    const currentShops = shopImg.slice(
        (currentPage - 1) * companiesPerPage,
        currentPage * companiesPerPage
    );

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return(
        <Container>
            <Link to='/company' style={{ textDecoration: "none", color: "#000" }}>
                <CompanyMove>회사소개 구경하기</CompanyMove>
            </Link>
            <IntroduceTitle>판매처 소개</IntroduceTitle>
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