import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Introduce = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 160px;
`
const IntroduceTitle = styled.h1`
    width: 230px;
    height: 80px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.active ? '#87CEEB' : '#FFFFFF')}; /* SkyBlue when active */
    box-shadow: 5px 3px 0px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-right: 70px;
    font-size: 32px;
    cursor: pointer;
    transition: background 0.3s ease;
    color: #000;
`;


const Summary = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 180px;
`
const SummaryText = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;
`
const SummaryTitle = styled.h1`
    font-size: 48px;
    margin-bottom: 20px;
`
const SummaryContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;
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
                <IntroduceTitle
                    active={activeTitle === '개요'}
                    onClick={() => handleClick('개요')}
                >
                    <Link to='/story' style={{ textDecoration: "none", color: "#000"}}>
                        개요
                    </Link>
                </IntroduceTitle>
                <IntroduceTitle
                    active={activeTitle === '소주의 역사'}
                    onClick={() => handleClick('소주의 역사')}
                >
                    <Link to='/story/soju' style={{ textDecoration: "none", color: "#000"}}>
                        소주의 역사
                    </Link>
                </IntroduceTitle>
                <IntroduceTitle
                    active={activeTitle === '맥주의 역사'}
                    onClick={() => handleClick('맥주의 역사')}
                >
                    <Link to='/story/beer' style={{ textDecoration: "none", color: "#000"}}>
                        맥주의 역사
                    </Link>
                </IntroduceTitle>
                <IntroduceTitle
                    active={activeTitle === '막걸리 역사'}
                    onClick={() => handleClick('막걸리 역사')}
                >  
                    <Link to='/story/makgeolli' style={{ textDecoration: "none", color: "#000"}}>
                        막걸리 역사
                    </Link>
                </IntroduceTitle>
            </Introduce>
        </Container>
    );
}