import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";
import useCloudinaryImages from "../hooks/useCloudinaryImages";
import { device } from "../breakpoints";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media ${device.desktop} {
        padding: 0 20px;
    }
    @media ${device.laptop} {
        padding: 0 20px;
    }
    @media ${device.tablet} {
        padding: 0 20px;
    }
    @media ${device.mobile} {
        padding: 0 20px;
    }
`;

const MainTitle = styled.h1`
    text-align: center;
    font-size: 64px;
    margin-top: 200px;

    @media ${device.laptop} {
        text-align: center;
        font-size: 3.5rem;
    }
    @media ${device.tablet} {
        text-align: center;
        font-size: 3rem;
    }
    @media ${device.mobile} {
        text-align: center;
        font-size: 2rem;
    }
`;

const SubTitle = styled.span`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    color: #909090;

    @media ${device.laptop} {
        text-align: center;
        font-size: 1.5rem;
    }
    @media ${device.tablet} {
        text-align: center;
        font-size: 1.25rem;
    }
    @media ${device.mobile} {
        text-align: center;
        font-size: 1rem;
    }
`;
const Guide = styled.div`
    width: calc(100%-220px);
    height: 100%;
    margin-bottom: 100px;
    box-sizing: border-box;
`;
const BeerSojuGuide = styled.div`
    width: 1400px;
    height: 400px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    box-sizing: border-box;

    @media ${device.desktop} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.laptop} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.tablet} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.mobile} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
`;
const BeerSojuGuide2 = styled.div`
    width: 1400px;
    height: 400px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    box-sizing: border-box;
    flex-direction: row-reverse;

    @media ${device.desktop} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.laptop} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.tablet} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.mobile} {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
`;
const BeerImg = styled.img`
    float: left;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    object-fit: contain;

    @media ${device.laptop} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
    @media ${device.tablet} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
    @media ${device.mobile} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
`;
const Content = styled.div`
    width: 700px;
    height: 250px;
    margin-left: 60px;

    @media ${device.desktop} {
        max-width: 900px;
        height: auto;
        margin: 0;
        text-align: center;
    }

    @media ${device.laptop} {
        max-width: 800px;
        height: auto;
        margin: 0;
        text-align: center;
    }
    @media ${device.tablet} {
        max-width: 700px;
        height: auto;
        margin: 0;
        text-align: center;
    }
    @media ${device.mobile} {
        width: 100%;
        height: auto;
        margin: 0;
        text-align: center;
    }
`;
const BeerTitle = styled.h2`
    font-size: 32px;
    margin-bottom: 30px;
    color: #c98b20;

    @media ${device.desktop} {
        margin-top: 40px;
    }

    @media ${device.laptop} {
        margin-top: 40px;
        font-size: 2rem;
    }
    @media ${device.tablet} {
        margin-top: 40px;
        font-size: 1.75rem;
    }
    @media ${device.mobile} {
        margin-top: 40px;
        font-size: 1.5rem;
    }
`;
const BeerSpan = styled.span`
    font-size: 18px;
    line-height: 1.2;
    display: block;
    margin-bottom: 30px;
    color: #909090;

    @media ${device.laptop} {
        font-size: 22px;
    }
    @media ${device.tablet} {
        font-size: 22px;
    }
`;
const BeerBtn = styled.button`
    width: 350px;
    height: 58px;
    background-color: #eacaa2;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 70px;
    border-radius: 204px;
    border: none;

    @media ${device.laptop} {
        margin-top: 30px;
    }
    @media ${device.tablet} {
        margin-top: 30px;
    }
    @media ${device.mobile} {
        margin-top: 30px;
    }
`;

const Content2 = styled.div`
    width: 700px;
    height: 250px;
    margin-right: 60px;
    text-align: right;
    @media ${device.desktop} {
        max-width: 900px;
        height: auto;
        margin: 0;
        text-align: center;
    }

    @media ${device.laptop} {
        max-width: 800px;
        height: auto;
        margin: 0;
        text-align: center;
    }
    @media ${device.tablet} {
        max-width: 700px;
        height: auto;
        margin: 0;
        text-align: center;
    }
    @media ${device.mobile} {
        width: 100%;
        height: auto;
        margin: 0;
        text-align: center;
    }
`;

const SojuImg = styled.img`
    float: right;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    object-fit: contain;

    @media ${device.laptop} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
    @media ${device.tablet} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
    @media ${device.mobile} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
`;
const SojuTitle = styled.h2`
    font-size: 32px;
    margin-bottom: 30px;
    color: #008810;

    @media ${device.desktop} {
        margin-top: 40px;
    }

    @media ${device.laptop} {
        margin-top: 40px;
        font-size: 2rem;
    }
    @media ${device.tablet} {
        margin-top: 40px;
        font-size: 1.75rem;
    }
    @media ${device.mobile} {
        margin-top: 40px;
        font-size: 1.5rem;
    }
`;
const SojuSpan = styled.span`
    font-size: 18px;
    line-height: 1.2;
    display: block;
    margin-bottom: 30px;
    color: #909090;

    @media ${device.laptop} {
        font-size: 22px;
    }
    @media ${device.tablet} {
        font-size: 22px;
    }
`;
const SojuBtn = styled.button`
    width: 350px;
    height: 58px;
    background-color: #cbeaa2;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 70px;
    border-radius: 204px;
    border: none;

    @media ${device.laptop} {
        margin-top: 30px;
    }
    @media ${device.tablet} {
        margin-top: 30px;
    }
    @media ${device.mobile} {
        margin-top: 30px;
    }
`;

const Makgeolli = styled.div`
    width: 1200px;
    height: 700px;
    margin: auto;
    margin-top: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media ${device.laptop} {
        width: 100%;
        height: auto;
        text-align: center;
    }
    @media ${device.tablet} {
        width: 100%;
        height: auto;
        text-align: center;
    }
    @media ${device.mobile} {
        width: 100%;
        height: auto;
        text-align: center;
    }
`;
const MakgeolliImg = styled.img`
    width: 380px;
    height: 380px;
    border-radius: 50%;
    object-fit: contain;

    @media ${device.laptop} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
    @media ${device.tablet} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
    @media ${device.mobile} {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
`;
const MakgeolliTitle = styled.h2`
    font-size: 32px;
    margin-top: 50px;
    margin-bottom: 30px;
    color: #0066d3;

    @media ${device.laptop} {
        margin-top: 40px;
        font-size: 2rem;
    }
    @media ${device.tablet} {
        margin-top: 40px;
        font-size: 1.75rem;
    }
    @media ${device.mobile} {
        margin-top: 40px;
        font-size: 1.5rem;
    }
`;
const MakgeolliSpan = styled.span`
    font-size: 18px;
    line-height: 1.2;
    display: block;
    margin-bottom: 30px;
    color: #909090;

    @media ${device.laptop} {
        font-size: 22px;
    }
    @media ${device.tablet} {
        font-size: 22px;
    }
`;
const MakgeolliBtn = styled.button`
    width: 350px;
    height: 58px;
    background-color: #c0deff;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 70px;
    border-radius: 204px;
    border: none;

    @media ${device.laptop} {
        margin-top: 30px;
    }
    @media ${device.tablet} {
        margin-top: 30px;
    }
    @media ${device.mobile} {
        margin-top: 30px;
    }
`;

const Soju = styled.div`
    position: relative; // 오버레이 기준
    width: 300px;
    height: 300px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default function SBMGuide() {
    const imgError = (e) => {
        e.target.src = `/imgnone.png`;
    };
    const { imageSrc, loading, error } = useCloudinaryImages([
        "jinro_bexnug",
        "hite_an9nj4",
        "jipeng_ugwtwn",
    ]);

    if (loading) return <p>이미지를 불러오는 중...</p>;
    if (error) return <p>에러: {error}</p>;

    return (
        <Container>
            <MainTitle aria-label="주류상식 가이드">주류 상식 가이드</MainTitle>
            <SubTitle>알고 마시면 더 재밌는 주류상식 가이드입니다.</SubTitle>
            <Sidebtn />
            <Guide>
                <BeerSojuGuide aria-labelledby="대한민국 맥주의 시작">
                    <Soju>
                        {imageSrc[1] && (
                            <BeerImg
                                src={imageSrc[1]}
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </Soju>
                    <Content>
                        <BeerTitle id="대한민국 맥주의 시작">
                            맥주의 시작 '조선맥주주식회사'
                        </BeerTitle>
                        <BeerSpan aria-describedby="대한민국 맥주의 시작 설명">
                            대한민국 최초의 맥주회사 ‘조선맥주’는 1933년 8월
                            당시 경기도 시흥군 영등포읍에설립되었습니다.
                            조선맥주는 국내 최초로 해외수출을 시작하여
                            대한민국의 맥주를처음으로 세계에 알리게 됩니다.
                            ‘조선맥주’는 맥주업계 1위 탈환 후 1998년
                            사명을‘하이트맥주’로 변경하였습니다. 2019년 출시한
                            ‘테라’는 런칭 후 1초에 22병이 판매되는히트상품으로
                            자리잡았습니다.
                        </BeerSpan>
                        <Link
                            to="/guide/beer"
                            aria-label="맥주상식 가이드 페이지로 이동"
                        >
                            <BeerBtn>맥주 상식 가이드 확인하기</BeerBtn>
                        </Link>
                    </Content>
                </BeerSojuGuide>
                <BeerSojuGuide2 aria-labelledby="대한민국 소주의 시작">
                    <Soju>
                        {imageSrc[0] && (
                            <SojuImg
                                src={imageSrc[0]}
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </Soju>
                    <Content2>
                        <SojuTitle id="대한민국 소주의 시작">
                            대한민국 최초 주류산업진출 ‘진로’
                        </SojuTitle>
                        <SojuSpan aria-describedby="대한민국 소주의 시작 설명">
                            대한민국 현대 주류역사는 1924년 평안남도 용강에서
                            설립된 진로의 전신 ‘진천양조상회’로 부터시작합니다.
                            1950년대 영등포에 정착 한 후 진로는 1970년 12월
                            대망의 국내 소주시장 1위에오른 이후 현재까지 50년간
                            소주시장을 석권하고 있습니다. ‘참이슬’은 2001년
                            이후글로벌 증류주 시장에서 1위를 차지하는 대한민국의
                            대표 브랜드로 성장하였습니다.
                        </SojuSpan>
                        <Link
                            to="/guide/soju"
                            aria-label="소주상식 가이드 페이지로 이동"
                        >
                            <SojuBtn>소주 상식 가이드 확인하기</SojuBtn>
                        </Link>
                    </Content2>
                </BeerSojuGuide2>
                <Makgeolli aria-labelledby="막걸리 회사">
                    <Soju>
                        {imageSrc[2] && (
                            <MakgeolliImg
                                src={imageSrc[2]}
                                alt="소주"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </Soju>
                    <MakgeolliTitle id="막걸리 회사">
                        대한민국 대표의 막걸리 제조회사 Since 1925 지평주조
                    </MakgeolliTitle>
                    <MakgeolliSpan aria-describedby="막걸리 회사 설명">
                        우리의 100주년에는 ‘한국 술’ 하면 모두가 지평을 가장
                        먼저 떠올릴 것을 믿어 의심치 않습니다.
                    </MakgeolliSpan>
                    <Link
                        to="/guide/makgeolli"
                        aria-label="막걸리상식 가이드 페이지로 이동"
                    >
                        <MakgeolliBtn>막걸리 상식 가이드 확인하기</MakgeolliBtn>
                    </Link>
                </Makgeolli>
            </Guide>
        </Container>
    );
}
