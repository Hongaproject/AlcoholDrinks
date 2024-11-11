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
const SojuGuide = styled.button`
    width: 310px;
    height: 58px;
    background-color: #000;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    margin-top: 70px;
`

export default function SojuStory () {

    const location = useLocation(); 
    const [activeTitle, setActiveTitle] = useState(''); 

    useEffect(() => {
        switch (location.pathname) {
            case '/story/soju':
                setActiveTitle('소주의 역사');
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
                <HistoryText aria-labelledby="소주의 역사">
                    <HistoryTitle id="소주의 역사">소주의 역사</HistoryTitle>
                    <HistoryContent>
                        처음에는 우리가 알던 소주가 아닌 증류주 방식인 소주가 나타났습니다. <br/ > 증류주는 10세기경 페르시아에서 처음 만들어졌고 몽골이 대제국을 지배하면서 고려 후기에 우리나라에 소주가 들어오게 되었습니다.<br />
                        몽골군이 일본 정벌을 위해 안동, 제주, 개성에 주둔했었는데 그로 인해 안동, 제주, 개성에서 소주 제조법이 발달하게 되어 현재까지도 그 전통을 유지하여 유명합니다.  
                    </HistoryContent>
                </HistoryText>
                <HistoryText2>
                    <HistoryContent>
                        희석식 소주는 일본에서 탄생한 조주 방식입니다. 우리나라에 들어왔을때는 일제강점기 초기인 1910년대이며 주세법 발표와 허가증을 만들어서 주류 업체들이 나타나기 시작했습니다. <br />
                        단식 증류기로 소주를 만들었었는데 연속식증류기가 발명된 후, 소주를 대량 생산할 수 있게 되었으며 1919년에 최초로 희석식 소주 공장이 세워지게 되었습니다. <br />
                        낮은 생산 가격을 무기로 대중 사이에 퍼져나갈수 있었습니다.
                    </HistoryContent>
                </HistoryText2>
                <Link to="/guide/soju" aria-label="소주 가이드 페이지로 이동">
                    <SojuGuide>소주 가이드 확인하기</SojuGuide>
                </Link>
            </Summary>
        </Container>
    );
}