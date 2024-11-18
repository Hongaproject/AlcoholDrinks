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
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: 64px;
    margin-top: 150px;

    @media (max-width: 768px) {
        text-align: center;
        font-size: 3rem;
    }
`

const SubTitle = styled.span`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    color: #909090;

    @media (max-width: 768px) {
        text-align: center;
        font-size: 1.25rem;
    }
`
const Guide = styled.div`
    width: calc(100%-440px);
    height: 100%;
    margin-bottom: 100px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`
const BeerSojuGuide = styled.div`
    width: 1200px;
    height: 400px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
`
const BeerSojuGuide2 = styled.div`
    width: 1200px;
    height: 400px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    box-sizing: border-box;
    flex-direction: row-reverse;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
`
const BeerImg = styled.img`
    float: left;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    object-fit: contain;

    @media (max-width: 768px) {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
`
const Content = styled.div`
    width: 580px;
    height: 250px;
    margin-left: 60px;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        margin: 0;
        text-align: center;
    }
`
const BeerTitle = styled.h2`
    font-size: 32px;
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
        margin-top: 20px;
        font-size: 1.5rem;
    }
`
const BeerSpan = styled.span`
    font-size: 18px;
    line-height: 1.2;
    display: block;
    margin-bottom: 30px;
    color: #909090;
`
const BeerBtn = styled.button`
    width: 80%; 
    max-width: 310px; 
    height: 58px;
    background-color: #000;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`

const Content2 = styled.div`
    width: 580px;
    height: 250px;
    margin-right: 60px;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        margin: 0;
        text-align: center;
    }
`

const SojuImg = styled.img`
    float: right;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    object-fit: contain;

    @media (max-width: 768px) {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
`
const SojuTitle = styled.h2`
    font-size: 32px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        margin-top: 20px;
        font-size: 1.5rem;
    }
`
const SojuSpan = styled.span`
    font-size: 18px;
    line-height: 1.2;
    display: block;
    margin-bottom: 30px;
    color: #909090;
`
const SojuBtn = styled.button`
    width: 80%; 
    max-width: 310px; 
    height: 58px;
    background-color: #000;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`

const Makgeolli = styled.div`
    width: 1200px;
    height: 700px;
    margin: auto;
    margin-top: 120px;
    text-align: center;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        text-align: center;
    }
`
const MakgeolliImg = styled.img`
    width: 380px;
    height: 380px;
    border-radius: 50%;
    object-fit: contain;

    @media (max-width: 768px) {
        width: 250px;
        height: 250px;
        margin-bottom: 20px;
    }
`
const MakgeolliTitle = styled.h2`
    font-size: 32px;
    margin-top: 50px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        margin-top: 20px;
        font-size: 1.75rem;
    }
`
const MakgeolliSpan = styled.span`
    font-size: 18px;
    line-height: 1.2;
    display: block;
    margin-bottom: 30px;
    color: #909090;
`
const MakgeolliBtn = styled.button`
    width: 80%; 
    max-width: 310px; 
    height: 58px;
    background-color: #000;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`


export default function SBMGuide (){
    
    const imgError = (e) => {
        e.target.src = `/imgnone.png`
    }

    return(
        <Container>
            <MainTitle aria-label="주류상식 가이드">주류상식 가이드</MainTitle>
            <SubTitle>알고 마시면 더 재밌는 주류상식 가이드입니다.</SubTitle>
            <Sidebtn />
            <Guide>
                <BeerSojuGuide aria-labelledby="대한민국 맥주의 시작">
                    <BeerImg src="/img/brand/beer/hitebeer.jpg" onError={imgError} />
                    <Content>
                        <BeerTitle id="대한민국 맥주의 시작">맥주의 시작 '조선맥주주식회사'</BeerTitle>
                        <BeerSpan aria-describedby="대한민국 맥주의 시작 설명">대한민국 최초의 맥주회사 ‘조선맥주’는 1933년 8월 당시 경기도 시흥군 영등포읍에설립되었습니다. 조선맥주는 국내 최초로 해외수출을 시작하여 대한민국의 맥주를처음으로 세계에 알리게 됩니다. ‘조선맥주’는 맥주업계 1위 탈환 후 1998년 사명을‘하이트맥주’로 변경하였습니다. 2019년 출시한 ‘테라’는 런칭 후 1초에 22병이 판매되는히트상품으로 자리잡았습니다.</BeerSpan>
                        <Link to="/guide/beer" aria-label="맥주상식 가이드 페이지로 이동">
                            <BeerBtn>맥주상식 가이드 확인하기</BeerBtn>
                        </Link>
                    </Content>
                </BeerSojuGuide>
                <BeerSojuGuide2 aria-labelledby="대한민국 소주의 시작">
                    <SojuImg src="/img/brand/soju/jinro.jpg" onError={imgError} />
                    <Content2>
                        <SojuTitle id="대한민국 소주의 시작">대한민국 최초 주류산업진출 ‘진로’</SojuTitle>
                        <SojuSpan aria-describedby="대한민국 소주의 시작 설명">대한민국 현대 주류역사는 1924년 평안남도 용강에서 설립된 진로의 전신 ‘진천양조상회’로 부터시작합니다. 1950년대 영등포에 정착 한 후 진로는 1970년 12월 대망의 국내 소주시장 1위에오른 이후 현재까지 50년간 소주시장을 석권하고 있습니다. ‘참이슬’은 2001년 이후글로벌 증류주 시장에서 1위를 차지하는 대한민국의 대표 브랜드로 성장하였습니다.</SojuSpan>
                        <Link to="/guide/soju" aria-label="소주상식 가이드 페이지로 이동">
                            <SojuBtn>소주상식 가이드 확인하기</SojuBtn>
                        </Link>
                    </Content2>
                </BeerSojuGuide2>
                <Makgeolli aria-labelledby="막걸리 회사">
                    <MakgeolliImg src="/img/brand/makgeolli/jip.jpg" onError={imgError} />
                    <MakgeolliTitle id="막걸리 회사">대한민국 대표의 막걸리 제조회사 Since 1925 지평주조</MakgeolliTitle>
                    <MakgeolliSpan aria-describedby="막걸리 회사 설명">우리의 100주년에는 ‘한국 술’ 하면 모두가 지평을 가장 먼저 떠올릴 것을 믿어 의심치 않습니다.</MakgeolliSpan>
                    <Link to="/guid/makgeolli" aria-label="막걸리상식 가이드 페이지로 이동">
                        <MakgeolliBtn>막걸리상식 가이드 확인하기</MakgeolliBtn>
                    </Link>
                </Makgeolli>
            </Guide>
        </Container>
    );
}