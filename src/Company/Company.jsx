import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";
import { device } from "../breakpoints";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media ${device.desktop} {
        padding: 0 40px; /* 데스크톱에서 양쪽 여백 추가 */
    }

    @media ${device.laptop} {
        padding: 0 30px;
    }

    @media ${device.tablet} {
        padding: 0 20px;
    }

    @media ${device.mobile} {
        padding: 0 15px;
    }
`;

const IntroduceTitle = styled.h1`
    font-size: 64px;
    text-align: center;
    margin-top: 200px;

    @media ${device.laptop} {
        font-size: 48px;
        margin-top: 150px;
    }

    @media ${device.tablet} {
        font-size: 36px;
        margin-top: 120px;
    }

    @media ${device.mobile} {
        font-size: 32px; /* 2rem 대신 px로 일관성 유지 */
        margin-top: 120px;
    }
`;

const Outline = styled.div`
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 130px;
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: flex-start;
    align-items: flex-start;

    @media ${device.laptop} {
        max-width: 900px;
        margin-top: 80px;
        margin-bottom: 100px;
        justify-content: center;
        gap: 80px 4%;
    }

    @media ${device.tablet} {
        max-width: 900px;
        margin-top: 70px;
        /* 태블릿에서는 항목을 중앙 정렬하고, 한 줄에 하나씩 크게 표시하도록 유도 */
        justify-content: center;
        gap: 50px 0; /* 가로 간격 제거 */
    }

    @media ${device.mobile} {
        width: 100%;
        margin-top: 70px;
        justify-content: center;
        gap: 50px 0;
    }
`;

const Companys = styled.div`
    width: 45%;
    height: 200px;
    border: 1px solid #ebeaec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    cursor: pointer;
    box-sizing: border-box;
    margin-bottom: 50px;

    media ${device.laptop} {
        width: 100%; /* 간격 조정 */
        height: 180px;
        margin-bottom: 40px;
    }

    @media ${device.tablet} {
        width: 70%; /* 한 줄에 하나씩 */
        height: 150px;
    }

    @media ${device.mobile} {
        width: 90%; /* 모바일에서 더 넓게 사용 */
        height: 120px;
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

    @media ${device.tablet} {
        font-size: 20px;
    }

    @media ${device.mobile} {
        font-size: 18px;
        margin-top: 15px;
    }
`;

const CompanyHomepage = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;

    @media ${device.tablet} {
        font-size: 16px;
    }

    @media ${device.mobile} {
        font-size: 14px;
        margin-top: 8px;
    }
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 160px;
    margin-bottom: 100px;

    @media ${device.laptop} {
        margin-top: 120px;
        margin-bottom: 80px;
    }

    @media ${device.tablet} {
        margin-top: 80px;
        margin-bottom: 50px;
    }

    @media ${device.mobile} {
        margin-top: 60px;
        margin-bottom: 40px;
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
    @media ${device.mobile} {
        padding: 8px 16px;
        font-size: 14px;
    }
`;

const PageNumber = styled.span`
    font-size: 18px;
    margin: 0 10px;

    @media ${device.mobile} {
        font-size: 16px;
        margin: 0 8px;
    }
`;

export default function Company() {
    const [companyImg, setCompanyImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 8;

    // API로 company 데이터를 가져 옴
    const companyImgApi = async () => {
        const res = await axios.get("/db/company.json");
        setCompanyImg(res.data.company.filter((item) => item.name !== "")); // 이름이 비어있지 않은 항목만 상태에 저장
    };

    // 컴포넌트 마운트시 회사 이미지 데이터 가져오기
    useEffect(() => {
        companyImgApi();
    }, []);

    const totalPages = Math.ceil(companyImg.length / companiesPerPage); // 총 페이지수 계산

    // 현재 페이지에 해당하는 회사 이미지 목록을 slice해서 가져옴
    const currentCompanies = companyImg.slice(
        (currentPage - 1) * companiesPerPage,
        currentPage * companiesPerPage,
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

    const imgError = (e) => {
        e.target.src = `/imgnone.png`;
    };

    return (
        <Container>
            <IntroduceTitle>주류 회사 소개</IntroduceTitle>
            <Sidebtn />
            <Outline role="region">
                {currentCompanies.map((item) => (
                    <Companys
                        key={item.id}
                        onClick={() => window.open(`${item.homepage}`)}
                        role="link"
                        aria-label={`주류 회사 페이지: ${item.name}`}
                    >
                        <CompanyImg
                            src={item.url}
                            alt={`${item.name} 이미지`}
                            onError={imgError}
                        />
                        <CompanyTitle>{item.name}</CompanyTitle>
                        <CompanyHomepage>{item.homepage}</CompanyHomepage>
                    </Companys>
                ))}
            </Outline>
            <PaginationControls>
                <PaginationButton
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    aria-label="이전 페이지"
                >
                    이전
                </PaginationButton>
                <PageNumber>
                    {currentPage} / {totalPages}
                </PageNumber>
                <PaginationButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="다음 페이지"
                >
                    다음
                </PaginationButton>
            </PaginationControls>
        </Container>
    );
}
