import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const ShopMove = styled.span`
    float: right;
    font-size: 20px;
    margin-right: 200px;
    margin-top: 60px;
`;

const IntroduceTitle = styled.h1`
    width: 295px;
    height: 75px;
    font-size: 48px;
    margin-left: 200px;
    margin-top: 160px;
`;

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-top: 250px;
    margin-bottom: 130px;
    display: flex;
    flex-wrap: wrap;
    gap: 140px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Companys = styled.div`
    width: 600px;
    height: 200px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 60px;
`;

const CompanyImg = styled.img`  
    width: 600px;
    height: 200px;
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

export default function Company() {
    const [companyImg, setCompanyImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 8;

    const companyImgApi = async () => {
        const res = await axios.get("/db/company.json");
        setCompanyImg(res.data.company.filter(item => item.name !== ""));
    }

    useEffect(() => {
        companyImgApi();
    }, []);

    const totalPages = Math.ceil(companyImg.length / companiesPerPage);

    const currentCompanies = companyImg.slice(
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
