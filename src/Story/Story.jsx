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
`

const Introduce = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 110px;
`
const IntroduceTitle = styled.h1`
    width: 230px;
    height: 80px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.active ? '#87CEEB' : '#FFFFFF')}; 
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


const Summary = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 180px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 20px;
    }
`
const SummaryText = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;

    @media (max-width: 768px) {
        text-align: center;
    }
`
const SummaryTitle = styled.h1`
    font-size: 48px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 32px; 
    }
`
const SummaryContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 18px;
        text-align: center;
        display: block;
    }
`

const SummaryImg = styled.div`
    width: 100%;
    height: 180px;

    @media (max-width: 768px) {
        height: auto;
        text-align: center;
    }
`
const SummaryKImg = styled.div`
    float: left;
    width: 700px;
    height: 130px;
    background-image: url("/img/story/koreasoju.png");
    background-size: cover;
    background-position: center;

    @media (max-width: 768px) {
        float: none;
        width: 100%;
    }
`
const SummaryTImg = styled.div`
    float: left;
    width: 700px;
    height: 130px;
    background-image: url("/img/story/traditional.png");
    background-position: center;

    @media (max-width: 768px) {
        float: none;
        width: 100%;
    }
`
const SummaryGImg = styled.div`
    float: left;
    width: 700px;
    height: 200px;
    background-image: url("/img/story/global.png");
    background-position: center;
    background-size: cover;

    @media (max-width: 768px) {
        float: none;
        width: 100%;
    }
`
const SummaryKImgContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;

    @media (max-width: 768px) {
        margin-top: 20px;
        font-size: 18px;
        text-align: center;
        display: block;
    }
`

const SummaryTImgContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 18px;
        text-align: center;
        display: block;
    }
`
const SummaryGImgContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 18px;
        text-align: center;
        display: block;
    }
`

export default function Story () {

    const location = useLocation();
    const [activeTitle, setActiveTitle] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case '/story':
                setActiveTitle('개요');
                break;
            default:
                setActiveTitle('');
        }
    }, [location.pathname]);

    const handleClick = (title) => {
        setActiveTitle(title);
    };

    const imgError = (e) => {
        e.target.src = `/imgnone.png`
    }

    return(
        <Container>
            <Introduce>
                <Link to='/story' style={{ textDecoration: "none", color: "#000"}} aria-label="개요 페이지로 이동">
                    <IntroduceTitle
                        active={activeTitle === '개요'}
                        onClick={() => handleClick('개요')}
                    >
                        개요
                    </IntroduceTitle>
                </Link>
                <Link to='/story/soju' style={{ textDecoration: "none", color: "#000"}} aria-label="소주의 역사 페이지로 이동">
                    <IntroduceTitle
                        active={activeTitle === '소주의 역사'}
                        onClick={() => handleClick('소주의 역사')}
                    >
                        소주의 역사
                    </IntroduceTitle>
                </Link>
                <Link to='/story/beer' style={{ textDecoration: "none", color: "#000"}} aria-label="맥주의 역사 페이지로 이동">
                    <IntroduceTitle
                        active={activeTitle === '맥주의 역사'}
                        onClick={() => handleClick('맥주의 역사')}
                    >
                        맥주의 역사
                    </IntroduceTitle>
                </Link>
                <Link to='/story/makgeolli' style={{ textDecoration: "none", color: "#000"}} aria-label="막걸리의 역사 페이지로 이동">
                    <IntroduceTitle
                        active={activeTitle === '막걸리의 역사'}
                        onClick={() => handleClick('막걸리의 역사')}
                    >  
                        막걸리의 역사
                    </IntroduceTitle>
                </Link>
            </Introduce>
            <Summary>
                <SummaryText aria-labelledby="사이트 제작 의도">
                    <SummaryTitle id="사이트 제작 의도">사이트 제작 의도</SummaryTitle>
                    <SummaryContent>
                        사이트를 제작 한 이유는 평소 주류에 관심이 많았고 최근에 술이 많이 나왔는데요. 많은 사람들이 새로운 제품을 알지 못하고 도수는 어느 정도인지 무슨 맛인지를 모르는 상태로 
                        주류를 고르는 것에 불편함을 직접 느끼게 되었습니다. 주류에 관하여 이야기를 해보면 많은 사람들이 술 종류가 많으니까 다 똑같은 술이라고 생각하고 드시는 분들도 꽤 많이 계셔가지고 술 종류도 
                        소개할 겸 더 나아가 외국인 분들에게 한국 술에 대해서 알려드리고 싶어서 제작하게 되었습니다.
                    </SummaryContent>
                </SummaryText>
                <SummaryText aria-labelledby="대한민국 주류 시장 규모">
                    <SummaryTitle id="대한민국 주류 시장 규모">대한민국 주류 시장 규모</SummaryTitle>
                    <SummaryImg onError={imgError}>
                        <SummaryKImg alt="대한민국 주류 시장 기사 이미지" />
                        <SummaryKImgContent>
                            <p>국내 주류 시장 규모입니다.</p>
                            <p>22년도 기준 국내 주류 시장 규모가 10조원에 육박했고 시장 규모가 커진 이유는 다양한 주류들의 등장과 제로슈가와 제로칼로리의 여파가 크지 않을까 라는 생각이듭니다.</p>
                        </SummaryKImgContent>
                    </SummaryImg>
                    <SummaryImg onError={imgError}>
                        <SummaryTImg alt="전통주 시장 규모 기사 이미지" />
                        <SummaryTImgContent>
                            <p>국내 전통주 시장 규모입니다.</p>
                            <p>최근 들어 문화 전통에 관심을 가지고 젊은 세대들이 관심을 가지고 있어서 시장 규모가 커지고 있습니다. 또한 21년도에 막걸리 빚기를 국가무형문화재 신규 종목으로 지정했고 현재 UNESCO 세계무형문화유산으로 등재하기 위해 노력하고 있습니다.</p>
                        </SummaryTImgContent>
                    </SummaryImg>
                    <SummaryImg onError={imgError}>
                        <SummaryGImg alt="글로벌 주류 시장 규모 이미지" />
                        <SummaryGImgContent>
                            <p>글로벌 시장 규모입니다.</p>
                            <p>글로벌 시장은 꾸준하게 커지고 있으며 이때 대한민국 소주를 홍보할 좋은 기회라고 생각합니다. 전통적인 술인 막걸리와 소주를 글로벌 주류 시장에 공격적으로 이미지 마켓팅하고 적극 사업추진을 한다면 주류회사에게 이익이 될 수 있는 좋은 기회이며 또한 대한민국의 홍보와 인식에 변화가 있을거라 생각하고 있습니다.</p>
                        </SummaryGImgContent>
                    </SummaryImg>
                </SummaryText>
            </Summary>
        </Container>
    );
}