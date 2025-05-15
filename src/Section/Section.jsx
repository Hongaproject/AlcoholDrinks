import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebtn from "./Sidebtn";
// import { Link } from "react-router-dom";

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
    width: 90vw;
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
    font-size: 24px;
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

const Soju = styled.div`
    width: 250px;
    height: 400px;
    background-color: #fff;
    border-radius: 187.5px;
`;
const Beer = styled.div`
    width: 250px;
    height: 400px;
    background-color: #fff;
    border-radius: 187.5px;
`;
const Makgeolli = styled.div`
    width: 250px;
    height: 400px;
    background-color: #fff;
    border-radius: 187.5px;
`;
const Liquor = styled.div`
    width: 250px;
    height: 400px;
    background-color: #fff;
    border-radius: 187.5px;
`;
const New = styled.div`
    width: 250px;
    height: 400px;
    background-color: #fff;
    border-radius: 187.5px;
`;

// popup
const Popup = styled.div`
    font-family: Arial, sans-serif;
    text-align: center;
`;

const PopupOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
        display: none;
    }
`;

const PopupContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 700px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;

    @media (max-width: 768px) {
        display: none;
    }
`;

const CloseButton = styled.span`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;

    &:hover,
    &:focus {
        color: #000;
    }
`;

const Content = styled.div`
    margin-top: 80px;
    margin-bottom: 80px;
`;

const ContentSpan = styled.span`
    font-size: 20px;
    line-height: 1.6;
`;
const ContextTitle = styled.h2`
    font-size: 28px;
    font-weight: 700;
`;

export default function Section() {
    const imgSlide = ["", "", "", "", ""];
    const [imgArr, setImgArr] = useState(0);
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = imgSlide.length - 1;
    const MOVE_SLIDE_INDEX = 1;
    const [isOpen, setIsOpen] = useState(false);

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

    useEffect(() => {
        const popupClose = sessionStorage.getItem("popupClosed");
        if (!popupClose) {
            setIsOpen(true);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        sessionStorage.setItem("popupClosed", "true");
    };

    // const imgError = (e) => {
    //     e.target.src = `/imgnone.png`;
    // };

    return (
        <Container>
            <Popup>
                {isOpen && (
                    <PopupOverlay>
                        <PopupContent aria-labelledby="팝업 내용">
                            <CloseButton
                                onClick={closePopup}
                                aria-label="팝업 닫기"
                                role="button"
                            >
                                &times;
                            </CloseButton>
                            <Content>
                                <ContentSpan>
                                    <ContextTitle id="팝업 내용">
                                        필독해 주세요!! 읽어주셔서 감사합니다.
                                    </ContextTitle>
                                    <br />
                                    <br />
                                    처음 만든 페이지다 보니 오류나 불편한 사항이
                                    있을 수 있습니다. <br />이 점은 먼저
                                    사죄드립니다.
                                    <br />
                                    <br />
                                    오류나 불편한 사항, 데이터 추가 요청 등이
                                    있을 시 저에게 말씀해 주시면 <br />
                                    신속하게 해결하여 더 나은 서비스로
                                    보답하겠습니다.
                                    <br />
                                    <br />
                                    왼쪽에 있는 비행기 모양 아이콘을 클릭하시면
                                    저에게 메일을 발송하실 수 있습니다.
                                    <br />
                                    <br />
                                    현재 데이터는 무료 버전으로 제공되고 있어
                                    자동 업데이트가 되지 않습니다. <br />
                                    이럴 경우, 페이지를 새로 고침하시면 데이터가
                                    정상적으로 작동합니다. <br />
                                    <br />
                                    다시 한번 사이트에 방문해 주셔서
                                    감사드립니다.
                                </ContentSpan>
                            </Content>
                        </PopupContent>
                    </PopupOverlay>
                )}
            </Popup>
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
                        <Soju></Soju>
                        <Beer></Beer>
                        <Makgeolli></Makgeolli>
                        <Liquor></Liquor>
                        <New></New>
                    </AlcoholWrapper>
                </AlcoholSort>
            </AlcoholContainer>
        </Container>
    );
}
