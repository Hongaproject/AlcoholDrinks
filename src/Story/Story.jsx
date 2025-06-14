import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
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
const MarketImgC = styled.div`
    display: flex;
    gap: 120px;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
`;
const MarketImgW = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
`;
const Temporary = styled.div`
    width: 350px;
    height: 250px;
    background-color: #ccc;
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
    gap: 60px;
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
`;

const Soju = styled.div`
    position: relative; // 오버레이 기준
    width: 300px;
    height: 300px;
    background-color: #fff;
    border-radius: 50%;
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

const Beer = styled(Soju)``;
const Makgeolli = styled(Soju)``;

export default function Story() {
    return (
        <Container>
            <TitleMain>
                <TitlePoint>,</TitlePoint>
                <Title>사이트 제작 의도</Title>
                <TitleDes>
                    사이트를 제작 한 이유는 평소 주류에 관심이 많았고 최근에
                    새로운 술이 많이 나왔는데요. 많은 사람들이 새로운 제품을
                    알지 못하고 도수는 어느 정도인지 무슨 맛인지를 모르는 상태로
                    주류를 고르는 것에 불편함을 직접 느끼게 되었습니다.
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
                <MarketImgC>
                    <MarketImgW>
                        <TitleDes>대한민국 주류 시장 규모</TitleDes>
                        <Temporary></Temporary>
                    </MarketImgW>
                    <MarketImgW>
                        <TitleDes>글로벌 주류 시장 규모</TitleDes>
                        <Temporary></Temporary>
                    </MarketImgW>
                </MarketImgC>
            </MarketShare>
            <MarketTitle>주류의 역사 알아보기</MarketTitle>
            <AlcoholSort>
                <AlcoholWrapper>
                    <Link to="/story/soju">
                        <Soju>
                            <img
                                src="/img/home/chamiseul.png"
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                            <Overlay className="overlay">소주의 역사</Overlay>
                        </Soju>
                    </Link>
                    <Link to="/story/beer">
                        <Beer>
                            <img
                                src="/img/home/cass.jpg"
                                alt="맥주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                            <Overlay className="overlay">맥주의 역사</Overlay>
                        </Beer>
                    </Link>
                    <Link to="/story/makgeolli">
                        <Makgeolli>
                            <img
                                src="/img/home/boksun.jpg"
                                alt="막걸리"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                            <Overlay className="overlay">막걸리의 역사</Overlay>
                        </Makgeolli>
                    </Link>
                </AlcoholWrapper>
            </AlcoholSort>
        </Container>
    );
}
