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

const BeerGuide = styled.button`
    width: 310px;
    height: 58px;
    background-color: #000;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    margin-top: 70px;
`


export default function BeerStory () {

    const location = useLocation(); 
    const [activeTitle, setActiveTitle] = useState(''); 

    useEffect(() => {
        switch (location.pathname) {
            case '/story/beer':
                setActiveTitle('맥주의 역사');
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
                <HistoryText aria-labelledby="beer-history-title">
                    <HistoryTitle id="beer-history-title">맥주의 역사</HistoryTitle>
                    <HistoryContent>
                        맥주는 B.C 4000년경 중동 지방의 티그리스, 유프라테스 강 유역에서 수메르 민족이 최초로 제조하였던 것으로 알려져 있습니다.<br />
                        현재 고대 이집트를 탐사하고 있는 고고학자들이 새로운 정보를 알아내고 있습니다. 고대 이집트 당시 대형 양조장이 있었다고 합니다. <br />
                        현재 우리가 아는 맥주 제조방법은 독일에서 시작되었으며 독일로 여행을 가신다면 몇백년 된 양조장들을 구경할 수 있습니다.
                    </HistoryContent>
                </HistoryText>
                <HistoryText2>
                    <HistoryContent>
                        19세기 맥주에 큰 변화가 왔었습니다. 맥주의 대량 생산을 가능하게 해줬으며, 카를 폰 린데 독일인이 냉동기를 제작하여 계절에 상관없이 양조를 가능하게 했다. <br />
                        루이 파스퇴르 프랑스인이 술이 효모의 작용에 의해 생성된다는 사실과 열처리 살균법을 개발하여 오랫동안 보관이 가능하게 되었습니다. <br />
                        이후 에밀 한센 덴마크인이 파스퇴르의 이론을 응용해 효모의 순수배양법을 개발하면서 맥주의 품질을 높였습니다. <br />
                        80년대 이후 맥주 고유의 신선도를 유지하면서 장기 유통을 할 수 있는 첨단 비열처리 공법이 개발되면서 소비자들은 더욱 신선한 맥주를 즐길 수 있게 되었습니다.
                    </HistoryContent>
                </HistoryText2>
                <Link to="/guide/beer" aria-label="맥주 가이드 페이지로 이동">
                    <BeerGuide>맥주 가이드 확인하기</BeerGuide>
                </Link>
            </Summary>
        </Container>
    );
}