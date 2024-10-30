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
        width: 100px;
        height: 40px;
        margin-right: 10px;
        font-size: 1.25rem;
    }
`;


const Summary = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 20px;
    }
`
const HistoryText = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;

    @media (max-width: 768px) {
        text-align: center;
    }
`
const HistoryTitle = styled.h1`
    font-size: 48px;
    margin-bottom: 40px;
`
const HistoryContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 18px;
        text-align: center;
        display: block;
    }
`
const HistoryText2 = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 40px;

    @media (max-width: 768px) {
        text-align: center;
    }
`
const BeerGuide = styled.button`
    width: 310px;
    height: 58px;
    background-color: #000;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    margin-top: 70px;
`

export default function MakgeolliStory () {

    const location = useLocation(); 
    const [activeTitle, setActiveTitle] = useState(''); 

    useEffect(() => {
        switch (location.pathname) {
            case '/story/makgeolli':
                setActiveTitle('막걸리 역사');
                break;
            default:
                setActiveTitle('');
        }
    }, [location.pathname]);

    const handleClick = (title) => {
        setActiveTitle(title);
    };

    return(
        <Container>
            <Introduce>
            <Link to='/story' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '개요'}
                        onClick={() => handleClick('개요')}
                    >
                        개요
                    </IntroduceTitle>
                </Link>
                <Link to='/story/soju' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '소주의 역사'}
                        onClick={() => handleClick('소주의 역사')}
                    >
                        소주의 역사
                    </IntroduceTitle>
                </Link>
                <Link to='/story/beer' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '맥주의 역사'}
                        onClick={() => handleClick('맥주의 역사')}
                    >
                        맥주의 역사
                    </IntroduceTitle>
                </Link>
                <Link to='/story/makgeolli' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '막걸리 역사'}
                        onClick={() => handleClick('막걸리 역사')}
                    >  
                        막걸리 역사
                    </IntroduceTitle>
                </Link>
            </Introduce>
            <Summary>
                <HistoryText>
                    <HistoryTitle>막걸리 역사</HistoryTitle>
                    <HistoryContent>
                        막걸리는 대한민국에서 가장 오래된 술 입니다. 삼국시대부터 양조가 된거로 추정을하고 있으며 고려 시대 서적을 보면 탁주 이야기가 적혀져 있습니다. <br />
                        소주가 나타나기전에 대한민국 주류 시장은 탁주가 높은 점유율을 가지고 있었습니다. 하지만 60년대 70년대부터 주세법 개정으로 인하여 주류에 쌀이 금지가 되었습니다. <br />
                        이로 인해 막걸리의 점유율은 낮아졌으며 희석주 소주와 맥주의 등장으로 인기가 식어갔습니다. <br /> 
                    </HistoryContent>
                </HistoryText>
                <HistoryText2>
                    <HistoryContent>
                        현재 100% 쌀로 만들고 있으며 21세기에 들어서 다시 인기를 되찾고 있습니다. 막걸리는 도수가 희석주보다 낮고 또한 영양 성분이 좋습니다. <br />
                        최근 수십년간 문화 전통에 관심이 많아지게 되었고 또한 젊은 세대에서 선호도가 증가가 되고 있습니다. <br />
                        2021년 대한민국 문화재청에서는 '막걸리 빚기'를 국가무형문화재 신규 종목으로 지정했는데, 국민의 제안을 수용하여 지정된 첫 번째 사례입니다. <br />
                        현재도 UNESCO 세계무형문화유산으로 등재하기 위한 노력을 하고 있습니다. 
                    </HistoryContent>
                </HistoryText2>
                <Link to="/guid/makgeolli">
                    <BeerGuide>막걸리 가이드 확인하기</BeerGuide>
                </Link>
            </Summary>
        </Container>
    );
}