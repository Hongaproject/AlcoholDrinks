import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const ShopMove = styled.span`
    float: right;
    font-size: 20px;
    margin-right: 200px;
    margin-top: 60px;

    @media (max-width: 768px) {
        margin-right: 0;
        margin-top: 15px;
        float: none;
        display: block;
        text-align: center;
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
        text-align: center;
        font-size: 2rem;
        margin-top: 120px;
    }
`;

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-top: 250px;
    margin-bottom: 130px;
    display: flex;
    flex-wrap: wrap;
    gap: 100px; 
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 80px;
        justify-content: center;
        gap: 50px;
    }
`;

const Companys = styled.div`
    width: 45%;
    height: 200px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
    border-radius: 20px;
    cursor: pointer;
    box-sizing: border-box; 
    margin-bottom: 50px;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const CompanyImg = styled.img`  
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const CompanyTitle = styled.h2`
    font-size: 24px;
    margin-top: 20px;
`;

const CompanyHomepage = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;
    
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 160px;
    margin-bottom: 100px;

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


export default function Company() {
    
    const [companyImg, setCompanyImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 8;

    // API로 company 데이터를 가져 옴
    const companyImgApi = async () => {
        const res = await axios.get("/db/company.json");
        setCompanyImg(res.data.company.filter(item => item.name !== "")); // 이름이 비어있지 않은 항목만 상태에 저장
    }

    // 컴포넌트 마운트시 회사 이미지 데이터 가져오기
    useEffect(() => {
        companyImgApi();
    }, []);

    const totalPages = Math.ceil(companyImg.length / companiesPerPage); // 총 페이지수 계산

    // 현재 페이지에 해당하는 회사 이미지 목록을 slice해서 가져옴
    const currentCompanies = companyImg.slice(
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

    return (
        <Container>
            <IntroduceTitle>주류 회사 소개</IntroduceTitle>
            <Link to='/shop' style={{ textDecoration: "none", color: "#000" }}>
                <ShopMove>판매처 구경하기</ShopMove>
            </Link>
            <Sidebtn />
            <Outline>
                {
                    currentCompanies.map((item) => (
                        <Companys key={item.id} onClick={() => window.open(`${item.homepage}`)}>
                            <CompanyImg src={item.url} />
                            <CompanyTitle>{item.name}</CompanyTitle>
                            <CompanyHomepage>{item.homepage}</CompanyHomepage>
                        </Companys>
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
