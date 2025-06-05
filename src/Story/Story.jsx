import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const Introduce = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 110px;
`;
const IntroduceTitle = styled.h1`
    width: 230px;
    height: 80px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.active ? "#87CEEB" : "#FFFFFF")};
    box-shadow: 5px 3px 0px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-right: 70px;
    font-size: 32px;
    cursor: pointer;
    transition: background 0.3s ease;
    color: #000;

    @media (max-width: 768px) {
        width: 110px;
        height: 40px;
        margin-right: 10px;
        font-size: 1.1rem;
    }
`;

const TitleMain = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: auto;
`;
const TitlePoint = styled.p`
    font-family: "JejuHallasan";
    font-style: normal;
    font-weight: 400;
    font-size: 128px;
    text-align: center;
    margin-top: 120px;
`;
const Title = styled.h1`
    font-size: 48px;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 10px;
`;
const TitleDes = styled.h1`
    font-size: 20px;
    text-align: center;
    margin-top: 40px;
    line-height: 1.6;
`;

const MarketShare = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: auto;
`;
const MarketTitle = styled.h2`
    font-size: 48px;
    text-align: center;
    margin-top: 180px;
`;

const AlcoholSort = styled.div`
    width: 100%;
    height: 550px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AlcoholWrapper = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 검정
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border-radius: 187.5px;
`;

const Soju = styled.div`
    position: relative; // 오버레이 기준
    width: 250px;
    height: 350px;
    background-color: #fff;
    border-radius: 187.5px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);

        .overlay {
            opacity: 1;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default function Story() {
    // const location = useLocation();
    // const [activeTitle, setActiveTitle] = useState("");

    // useEffect(() => {
    //     switch (location.pathname) {
    //         case "/story":
    //             setActiveTitle("개요");
    //             break;
    //         default:
    //             setActiveTitle("");
    //     }
    // }, [location.pathname]);

    // const handleClick = (title) => {
    //     setActiveTitle(title);
    // };

    return (
        <Container>
            <TitleMain>
                <TitlePoint>,</TitlePoint>
                <Title>사이트 제작 의도</Title>
                <TitleDes>
                    사이트 제작 의도 사이트를 제작 한 이유는 평소 주류에 관심이
                    많았고 최근에 술이 많이 나왔는데요. 많은 사람들이 새로운
                    제품을 알지 못하고 도수는 어느 정도인지 무슨 맛인지를 모르는
                    상태로 주류를 고르는 것에 불편함을 직접 느끼게 되었습니다.
                </TitleDes>
                <TitleDes>
                    주류에 관하여 이야기를 해보면 많은 사람들이 술 종류가
                    많으니까 다 똑같은 술이라고 생각하고 드시는 분들도 꽤 많이
                    계셔가지고 술 종류도 소개할 겸 더 나아가 외국인 분들에게
                    한국 술에 대해서 알려드리고 싶어서 제작하게 되었습니다.
                </TitleDes>
            </TitleMain>
            <MarketShare>
                <MarketTitle>주류 시장 규모</MarketTitle>
                <div>
                    <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </div>
            </MarketShare>
            <MarketTitle>주류의 역사 알아보기</MarketTitle>
            <AlcoholSort>
                <AlcoholWrapper>
                    <Link to="/brand/soju">
                        <Soju>
                            <img
                                src="/img/home/chamiseul.png"
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "187.5px",
                                }}
                            />
                            <Overlay className="overlay">소주 더보기</Overlay>
                        </Soju>
                    </Link>
                    <Link to="/brand/soju">
                        <Soju>
                            <img
                                src="/img/home/chamiseul.png"
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "187.5px",
                                }}
                            />
                            <Overlay className="overlay">소주 더보기</Overlay>
                        </Soju>
                    </Link>
                    <Link to="/brand/soju">
                        <Soju>
                            <img
                                src="/img/home/chamiseul.png"
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "187.5px",
                                }}
                            />
                            <Overlay className="overlay">소주 더보기</Overlay>
                        </Soju>
                    </Link>
                </AlcoholWrapper>
            </AlcoholSort>

            {/* <Introduce>
                <Link
                    to="/story/soju"
                    style={{ textDecoration: "none", color: "#000" }}
                    aria-label="소주의 역사 페이지로 이동"
                >
                    <IntroduceTitle
                        active={activeTitle === "소주의 역사"}
                        onClick={() => handleClick("소주의 역사")}
                    >
                        소주의 역사
                    </IntroduceTitle>
                </Link>
                <Link
                    to="/story/beer"
                    style={{ textDecoration: "none", color: "#000" }}
                    aria-label="맥주의 역사 페이지로 이동"
                >
                    <IntroduceTitle
                        active={activeTitle === "맥주의 역사"}
                        onClick={() => handleClick("맥주의 역사")}
                    >
                        맥주의 역사
                    </IntroduceTitle>
                </Link>
                <Link
                    to="/story/makgeolli"
                    style={{ textDecoration: "none", color: "#000" }}
                    aria-label="막걸리의 역사 페이지로 이동"
                >
                    <IntroduceTitle
                        active={activeTitle === "막걸리의 역사"}
                        onClick={() => handleClick("막걸리의 역사")}
                    >
                        막걸리의 역사
                    </IntroduceTitle>
                </Link>
            </Introduce> */}
        </Container>
    );
}
