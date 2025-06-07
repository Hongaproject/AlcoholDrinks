import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const TitleMain = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 250px;
    margin-bottom: 150px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    text-align: center;
`;
const TitleNav = styled.nav`
    width: 800px;
    height: auto;
    border-bottom: 2px solid #000;
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
`;
const TitleNavL = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#008810" : "#000")};
`;

const TitleSub = styled.h2`
    font-size: 40px;
    text-align: center;
    margin-top: 150px;
    color: #008810;
`;

const TitleDes = styled.h1`
    font-size: 20px;
    text-align: center;
    margin-top: 70px;
    line-height: 2;
`;

const SojuGuide = styled.button`
    width: 400px;
    height: 85px;
    background-color: #cbeaa2;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 70px;
    border-radius: 204px;
    border: none;
`;

export default function SojuStory() {
    return (
        <Container>
            <TitleMain>
                <Title>주류의 역사</Title>
                <TitleNav>
                    <Link to="/story/soju" style={{ textDecoration: "none" }}>
                        <TitleNavL active={true}>소주</TitleNavL>
                    </Link>
                    <Link to="/story/beer" style={{ textDecoration: "none" }}>
                        <TitleNavL>맥주</TitleNavL>
                    </Link>
                    <Link
                        to="/story/makgeolli"
                        style={{ textDecoration: "none" }}
                    >
                        <TitleNavL>막걸리</TitleNavL>
                    </Link>
                </TitleNav>
                <TitleSub>소주</TitleSub>
                <TitleDes>
                    처음에는 우리가 알던 소주가 아닌 증류주 방식인 소주가
                    나타났습니다. <br /> 증류주는 10세기경 페르시아에서 처음
                    만들어졌고 몽골이 대제국을 지배하면서 고려 후기에 우리나라에
                    소주가 들어오게 되었습니다.
                    <br />
                    몽골군이 일본 정벌을 위해 안동, 제주, 개성에 주둔했었는데
                    그로 인해 안동, 제주, 개성에서 소주 제조법이 발달하게 되어
                    현재까지도 그 전통을 유지하여 유명합니다.
                </TitleDes>
                <TitleDes>
                    희석식 소주는 일본에서 탄생한 조주 방식입니다. <br />{" "}
                    우리나라에 들어왔을때는 일제강점기 초기인 1910년대이며
                    주세법 발표와 허가증을 만들어서 주류 업체들이 나타나기
                    시작했습니다. <br />
                    단식 증류기로 소주를 만들었었는데 연속식증류기가 발명된 후,
                    소주를 대량 생산할 수 있게 되었으며 1919년에 최초로 희석식
                    소주 공장이 세워지게 되었습니다. <br />
                    낮은 생산 가격을 무기로 대중 사이에 퍼져나갈수 있었습니다.
                </TitleDes>
                <Link to="/guide/soju" aria-label="소주 가이드 페이지로 이동">
                    <SojuGuide>소주 가이드 확인하기</SojuGuide>
                </Link>
            </TitleMain>
        </Container>
    );
}
