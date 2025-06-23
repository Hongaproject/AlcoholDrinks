import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebtn from "./Sidebtn";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const ImgSlice = styled.div`
    width: 100%;
    height: 60vh;
    z-index: 1;

    @media (max-width: 768px) {
        display: none;
    }
`;

// 이미지 슬라이드 예시
const Slide = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

const PrevButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 40%;
    left: 5%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;

    & > svg {
        transform: rotate(180deg);
        color: #858585;
    }
`;

const NextButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 40%;
    right: 5%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #858585;
`;

const Show = styled.div`
    width: 100vw;
    height: 60vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
`;

const Img = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    text-align: center;
    background-size: cover;
    background-position: center;

    &:nth-child(1) {
        background-image: url("/img/home/chamiseulpst.jpg");
    }
    &:nth-child(2) {
        background-image: url("/img/home/terrapst.jpg");
    }
    &:nth-child(3) {
        background-image: url("/img/home/makgeollipst.jpg");
    }
    &:nth-child(4) {
        background-image: url("/img/home/liquorjinropst.jpg");
    }
    &:nth-child(5) {
        background-image: url("/img/home/newpst.jpg");
    }
`;

// alcohol
const AlcoholContainer = styled.div`
    width: 100%;
    height: 900px;
    background-color: #344368;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const AlcoholTitle = styled.h2`
    font-size: 32px;
    color: #fff;
    text-align: center;
    margin-bottom: 90px;
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
    /* background-color: beige; */
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

const Beer = styled(Soju)``;
const Makgeolli = styled(Soju)``;
const Liquor = styled(Soju)``;
const New = styled(Soju)``;

// lastSection
const OverlayContent = styled.div`
    height: 400px;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const OverlayText = styled.div`
    color: white;
    font-size: 42px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const MoreButton = styled.button`
    width: 250px;
    height: 60px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: rgba(255, 255, 255, 0.7);
    }
`;

const LastSection = styled.div`
    width: 100%;
    height: 600px;
    padding: 20px 0;
    gap: 10px;
    display: flex;
    flex-direction: row;
`;
const Company = styled.div`
    width: 100%;
    height: 600px;
    background: linear-gradient(
            180deg,
            rgba(0, 0, 13, 0) 0%,
            rgba(0, 0, 13, 0.7) 100%
        ),
        url("/img/home/company.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const Shop = styled(Company)`
    width: 100%;
    height: 600px;
    background: linear-gradient(
            180deg,
            rgba(0, 0, 13, 0) 0%,
            rgba(0, 0, 13, 0.7) 100%
        ),
        url("/img/home/shop.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const Guide = styled(Company)`
    width: 100%;
    height: 600px;
    background: linear-gradient(
            180deg,
            rgba(0, 0, 13, 0) 0%,
            rgba(0, 0, 13, 0.7) 100%
        ),
        url("/img/home/guide.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export default function Section() {
    const imgSlide = ["", "", "", "", ""];
    const [imgArr, setImgArr] = useState(0);
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = imgSlide.length - 1;
    const MOVE_SLIDE_INDEX = 1;

    const moveSlide = (value) => {
        if (value === "next") {
            setImgArr((prevState) =>
                prevState < LAST_SLIDE_INDEX
                    ? prevState + MOVE_SLIDE_INDEX
                    : FIRST_SLIDE_INDEX,
            );
        }
        if (value === "prev") {
            setImgArr((prevState) =>
                prevState > FIRST_SLIDE_INDEX
                    ? prevState - MOVE_SLIDE_INDEX
                    : LAST_SLIDE_INDEX,
            );
        }
    };

    useEffect(() => {
        const autoImg = setInterval(() => {
            moveSlide("next");
        }, 3000);

        return () => clearInterval(autoImg);
    }, [imgArr, imgSlide.length]);

    return (
        <Container>
            <ImgSlice>
                <Slide>
                    <PrevButton
                        onClick={() => moveSlide("prev")}
                        aria-label="이전 버튼"
                        role="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                            />
                        </svg>
                    </PrevButton>
                    <Show>
                        {imgSlide.map((item, index) => (
                            <Img
                                key={index}
                                style={{
                                    transform: `translateX(${-100 * imgArr}%)`,
                                    transition: "all 0.4s ease-in-out",
                                }}
                            >
                                {item}
                            </Img>
                        ))}
                    </Show>
                    <NextButton
                        onClick={() => moveSlide("next")}
                        aria-label="다음 버튼"
                        role="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                            />
                        </svg>
                    </NextButton>
                </Slide>
            </ImgSlice>
            <Sidebtn />
            <AlcoholContainer>
                <AlcoholTitle>alcohol beverage</AlcoholTitle>
                <AlcoholSort>
                    <AlcoholWrapper>
                        <Link to="/brand/soju">
                            <Soju>
                                <img
                                    src="/img/home/sj.jpeg"
                                    alt="소주"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "187.5px",
                                    }}
                                />
                                <Overlay className="overlay">
                                    소주 더보기
                                </Overlay>
                            </Soju>
                        </Link>
                        <Link to="/brand/beer">
                            <Beer>
                                <img
                                    src="/img/home/be.jpeg"
                                    alt="cass"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "187.5px",
                                    }}
                                />
                                <Overlay className="overlay">
                                    맥주 더보기
                                </Overlay>
                            </Beer>
                        </Link>
                        <Link to="/brand/makgeolli">
                            <Makgeolli>
                                <img
                                    src="/img/home/bok.jpeg"
                                    alt="cass"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "187.5px",
                                    }}
                                />
                                <Overlay className="overlay">
                                    막걸리 더보기
                                </Overlay>
                            </Makgeolli>
                        </Link>
                        <Link to="/brand/liquor">
                            <Liquor>
                                <img
                                    src="/img/home/dok.jpeg"
                                    alt="cass"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "187.5px",
                                    }}
                                />
                                <Overlay className="overlay">
                                    증류주 더보기
                                </Overlay>
                            </Liquor>
                        </Link>
                        <Link to="/brand/new">
                            <New>
                                <img
                                    src="/img/home/n.jpeg"
                                    alt="cass"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "187.5px",
                                    }}
                                />
                                <Overlay className="overlay">
                                    신제품 더보기
                                </Overlay>
                            </New>
                        </Link>
                    </AlcoholWrapper>
                </AlcoholSort>
            </AlcoholContainer>
            <LastSection>
                <Company>
                    <OverlayContent>
                        <OverlayText>Company</OverlayText>
                        <Link
                            to="/company"
                            style={{
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >
                            <MoreButton>More</MoreButton>
                        </Link>
                    </OverlayContent>
                </Company>
                <Shop>
                    <OverlayContent>
                        <OverlayText>Shop</OverlayText>
                        <Link
                            to="/shop"
                            style={{
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >
                            <MoreButton>More</MoreButton>
                        </Link>
                    </OverlayContent>
                </Shop>
                <Guide>
                    <OverlayContent>
                        <OverlayText>Guide</OverlayText>
                        <Link
                            to="/guide"
                            style={{
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >
                            <MoreButton>More</MoreButton>
                        </Link>
                    </OverlayContent>
                </Guide>
            </LastSection>
        </Container>
    );
}
