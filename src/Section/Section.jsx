import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebtn from "./Sidebtn";
import { Link } from "react-router-dom";
import useCloudinaryImages from "../hooks/useCloudinaryImages";
import { device } from "../breakpoints";

// ✅ 반응형 전체 코드
const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 80px;
    margin: 0 auto;
    box-sizing: border-box;
`;
// ----- 이미지 슬라이드 -----
const ImgSlice = styled.div`
    width: 100%;
    height: 480px;
    z-index: 1;

    @media ${device.mobile} {
        height: 200px; /* ✅ 반응형일 때 높이 줄이기 */
    }
    @media ${device.tablet} {
        height: 300px; /* ✅ 반응형일 때 높이 줄이기 */
    }
    @media ${device.laptop} {
        height: 400px; /* ✅ 반응형일 때 높이 줄이기 */
    }
`;

const Slide = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

const PrevButton = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 40%;
    left: 5%;
    transform: translateY(-50%);
    cursor: pointer;

    & > svg {
        transform: rotate(180deg);
        color: #858585;
        width: 36px;
        height: 36px;
    }
    @media ${device.mobile} {
        display: none;
    }

    @media ${device.tablet} {
        display: none;
    }

    @media ${device.laptop} {
        display: none;
    }
`;

const NextButton = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 40%;
    right: 5%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #858585;

    & > svg {
        width: 36px;
        height: 36px;
    }

    @media ${device.mobile} {
        display: none;
    }
    @media ${device.tablet} {
        display: none;
    }
    @media ${device.laptop} {
        display: none;
    }
`;

const Show = styled.div`
    width: 100vw;
    height: 480px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;

    @media ${device.mobile} {
        height: 200px; /* ✅ 반응형일 때 높이 줄이기 */
    }

    @media ${device.tablet} {
        height: 300px; /* ✅ 반응형일 때 높이 줄이기 */
    }
    @media ${device.laptop} {
        height: 400px; /* ✅ 반응형일 때 높이 줄이기 */
    }
`;

const SliderWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const Img = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media ${device.tablet} {
        background-size: ${(props) =>
            props.$isTall ? "contain" : "180% auto"};
        background-position: center;
    }
`;

// ----- Alcohol Section -----
const AlcoholContainer = styled.div`
    width: 100%;
    height: 900px;
    background-color: #344368;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
        margin-top: 20px;
        height: auto;
        padding: 40px 0;
    }

    @media ${device.tablet} {
        margin-top: 10px;
        height: auto;
        padding: 40px 0;
    }

    @media ${device.laptop} {
        margin-top: 20px;
        height: auto;
        padding: 40px 0;
    }
    @media ${device.desktop} {
        margin-top: 20px;
        height: auto;
        padding: 40px 0;
    }
`;

const AlcoholTitle = styled.h2`
    font-size: 32px;
    color: #fff;
    text-align: center;
    margin-bottom: 90px;

    @media ${device.mobile} {
        font-size: 24px;
        margin-bottom: 40px;
    }
    @media ${device.tablet} {
        font-size: 30px;
        margin-bottom: 40px;
    }
    @media ${device.laptop} {
        font-size: 36px;
        margin-bottom: 40px;
    }
`;

const AlcoholSort = styled.div`
    width: 100%;
    height: 550px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
        flex-direction: column;
        height: auto;
        padding: 20px 0;
        background: transparent;
    }
    @media ${device.tablet} {
        flex-direction: column;
        height: auto;
        padding: 20px 0;
        background: transparent;
    }
    @media ${device.laptop} {
        flex-direction: column;
        height: auto;
        padding: 20px 0;
        background: transparent;
    }
    @media ${device.desktop} {
        flex-direction: column;
        height: auto;
        padding: 20px 0;
        background: transparent;
    }
`;

const AlcoholWrapper = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    @media ${device.mobile} {
        flex-wrap: wrap;
        gap: 20px;
        height: auto;
    }
    @media ${device.tablet} {
        flex-wrap: wrap;
        gap: 20px;
        height: auto;
    }
    @media ${device.laptop} {
        flex-wrap: wrap;
        gap: 20px;
        height: auto;
    }
    @media ${device.desktop} {
        flex-wrap: wrap;
        gap: 20px;
        height: auto;
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border-radius: 187.5px;

    @media ${device.tablet} {
        font-size: 16px;
    }
`;

const Soju = styled.div`
    position: relative;
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

    @media ${device.mobile} {
        width: 150px;
        height: 210px;
        border-radius: 100px;
    }
    @media ${device.tablet} {
        width: 130px;
        height: 210px;
        border-radius: 100px;
    }
    @media ${device.laptop} {
        width: 140px;
        height: 210px;
        border-radius: 100px;
    }
    @media ${device.desktop} {
        width: 210px;
        height: 300px;
        border-radius: 100px;
    }
`;

const Beer = styled(Soju)``;
const Makgeolli = styled(Soju)``;
const Liquor = styled(Soju)``;
const New = styled(Soju)``;

// ----- Last Section -----
const LastSection = styled.div`
    width: 100%;
    height: 600px;
    padding: 20px 0;
    gap: 10px;
    display: flex;
    flex-direction: row;

    @media ${device.mobile} {
        flex-direction: column;
        height: auto;
        gap: 20px;
    }
    @media ${device.tablet} {
        flex-direction: column;
        height: auto;
        gap: 20px;
    }
    @media ${device.laptop} {
        flex-direction: column;
        height: auto;
        gap: 20px;
    }
`;

const Company = styled.div`
    width: 100%;
    height: 600px;
    background: linear-gradient(
            180deg,
            rgba(0, 0, 13, 0) 0%,
            rgba(0, 0, 13, 0.7) 100%
        ),
        url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
        height: 300px;
    }
    @media ${device.tablet} {
        height: 350px;
    }
    @media ${device.laptop} {
        height: 375px;
    }
`;

const Story = styled(Company)``;
const Guide = styled(Company)``;

const OverlayContent = styled.div`
    height: 400px;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media ${device.mobile} {
        height: auto;
        padding: 20px;
    }
    @media ${device.tablet} {
        height: auto;
        padding: 20px;
    }
    @media ${device.laptop} {
        height: auto;
        padding: 20px;
    }
`;

const OverlayText = styled.div`
    color: white;
    font-size: 42px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);

    @media ${device.mobile} {
        font-size: 24px;
        text-align: center;
    }
    @media ${device.tablet} {
        font-size: 24px;
        text-align: center;
    }
    @media ${device.laptop} {
        font-size: 32px;
        text-align: center;
    }
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

    @media ${device.mobile} {
        width: 180px;
        height: 45px;
        font-size: 16px;
        margin-top: 20px;
    }
    @media ${device.tablet} {
        width: 180px;
        height: 45px;
        font-size: 16px;
        margin-top: 20px;
    }
    @media ${device.laptop} {
        width: 180px;
        height: 45px;
        font-size: 24px;
        margin-top: 20px;
    }
`;

export default function Section() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    const { imageSrc, loading, error } = useCloudinaryImages([
        "chamiseulpst_vxbrxf",
        "terrapst_mpgbjp",
        "makgeollipst_kq8txj",
        "liquorjinropst_wxcffj",
        "terralightpst_ajvgoh",
        "jinro_bexnug",
        "hite_an9nj4",
        "jipeng_ugwtwn",
        "dokdo_aovji0",
        "new_ecntvk",
        "shop_d33rvj",
        "company_viu0sf",
        "guide_mcrsj9",
    ]);

    const visibleSlides = imageSrc.slice(0, 5);
    const loopedSlides = [
        visibleSlides[visibleSlides.length - 1], // 마지막 이미지 복제
        ...visibleSlides,
        visibleSlides[0], // 첫 이미지 복제
    ];

    const moveSlide = (direction, isManual = false) => {
        if (isManual) {
            setIsAutoSliding(false);
            // 일정 시간 후 자동 슬라이드 재개 (예: 5초)
            setTimeout(() => {
                setIsAutoSliding(true);
            }, 5000);
        }
        setIsTransitioning(true);
        setCurrentIndex((prev) => (direction === "next" ? prev + 1 : prev - 1));
    };

    useEffect(() => {
        if (!isAutoSliding) return;

        const autoSlide = setInterval(() => {
            moveSlide("next");
        }, 3000);

        return () => clearInterval(autoSlide);
    }, [isAutoSliding]);

    useEffect(() => {
        if (!isTransitioning) return;

        if (currentIndex === loopedSlides.length - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1); // 첫 번째 진짜 이미지로 점프
            }, 400); // transition 시간과 맞춰야 함
        }

        if (currentIndex === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(loopedSlides.length - 2); // 마지막 진짜 이미지로 점프
            }, 400);
        } else {
            setIsTransitioning(true);
        }
    }, [currentIndex]);

    if (loading) return <p>이미지를 불러오는 중...</p>;
    if (error) return <p>에러: {error}</p>;

    return (
        <Container>
            <ImgSlice>
                <Slide>
                    <PrevButton
                        onClick={() => moveSlide("prev", true)}
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
                        <SliderWrapper
                            style={{
                                transform: `translateX(${-100 * currentIndex}%)`,
                                transition: isTransitioning
                                    ? "all 0.4s ease-in-out"
                                    : "none",
                            }}
                        >
                            {loopedSlides.map((src, index) => (
                                <Img
                                    key={index}
                                    style={{ backgroundImage: `url(${src})` }}
                                    $isTall={src.includes(
                                        "makgeollipst_kq8txj",
                                    )}
                                />
                            ))}
                        </SliderWrapper>
                    </Show>

                    <NextButton
                        onClick={() => moveSlide("next", true)}
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
                                {imageSrc[5] && (
                                    <img
                                        src={imageSrc[5]}
                                        alt="cass"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "187.5px",
                                        }}
                                    />
                                )}
                                <Overlay className="overlay">
                                    소주 더보기
                                </Overlay>
                            </Soju>
                        </Link>
                        <Link to="/brand/beer">
                            <Beer>
                                {imageSrc[6] && (
                                    <img
                                        src={imageSrc[6]}
                                        alt="cass"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "187.5px",
                                        }}
                                    />
                                )}
                                <Overlay className="overlay">
                                    맥주 더보기
                                </Overlay>
                            </Beer>
                        </Link>
                        <Link to="/brand/makgeolli">
                            <Makgeolli>
                                {imageSrc[7] && (
                                    <img
                                        src={imageSrc[7]}
                                        alt="cass"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "187.5px",
                                        }}
                                    />
                                )}
                                <Overlay className="overlay">
                                    막걸리 더보기
                                </Overlay>
                            </Makgeolli>
                        </Link>
                        <Link to="/brand/liquor">
                            <Liquor>
                                {imageSrc[8] && (
                                    <img
                                        src={imageSrc[8]}
                                        alt="cass"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "187.5px",
                                        }}
                                    />
                                )}
                                <Overlay className="overlay">
                                    증류주 더보기
                                </Overlay>
                            </Liquor>
                        </Link>
                        <Link to="/brand/new">
                            <New>
                                {imageSrc[9] && (
                                    <img
                                        src={imageSrc[9]}
                                        alt="cass"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "187.5px",
                                        }}
                                    />
                                )}
                                <Overlay className="overlay">
                                    신제품 더보기
                                </Overlay>
                            </New>
                        </Link>
                    </AlcoholWrapper>
                </AlcoholSort>
            </AlcoholContainer>
            <LastSection>
                <Story bgImage={imageSrc[10]}>
                    <OverlayContent>
                        <OverlayText>Story</OverlayText>
                        <Link
                            to="/story"
                            style={{
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >
                            <MoreButton>More</MoreButton>
                        </Link>
                    </OverlayContent>
                </Story>
                <Company bgImage={imageSrc[11]}>
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
                <Guide bgImage={imageSrc[12]}>
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
