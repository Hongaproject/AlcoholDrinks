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
    color: ${({ active }) => (active ? "#0066D3" : "#000")};
`;

const TitleSub = styled.h2`
    font-size: 40px;
    text-align: center;
    margin-top: 150px;
    color: #0066d3;
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
    background-color: #c0deff;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 70px;
    border-radius: 204px;
    border: none;
`;

export default function MakgeolliStory() {
    return (
        <Container>
            <TitleMain>
                <Title>주류의 역사</Title>
                <TitleNav>
                    <Link to="/story/soju" style={{ textDecoration: "none" }}>
                        <TitleNavL>소주</TitleNavL>
                    </Link>
                    <Link to="/story/beer" style={{ textDecoration: "none" }}>
                        <TitleNavL>맥주</TitleNavL>
                    </Link>
                    <Link
                        to="/story/makgeolli"
                        style={{ textDecoration: "none" }}
                    >
                        <TitleNavL active={true}>막걸리</TitleNavL>
                    </Link>
                </TitleNav>
                <TitleSub>막걸리</TitleSub>
                <TitleDes>
                    막걸리는 대한민국에서 가장 오래된 술 입니다. 삼국시대부터
                    양조가 된거로 추정을하고 있으며 고려 시대 서적을 보면 탁주
                    이야기가 적혀져 있습니다. <br />
                    소주가 나타나기전에 대한민국 주류 시장은 탁주가 높은
                    점유율을 가지고 있었습니다. 하지만 60년대 70년대부터 주세법
                    개정으로 인하여 주류에 쌀이 금지가 되었습니다. <br />
                    이로 인해 막걸리의 점유율은 낮아졌으며 희석주 소주와 맥주의
                    등장으로 인기가 식어갔습니다. <br />
                </TitleDes>
                <TitleDes>
                    현재 100% 쌀로 만들고 있으며 21세기에 들어서 다시 인기를
                    되찾고 있습니다. 막걸리는 도수가 희석주보다 낮고 또한 영양
                    성분이 좋습니다. <br />
                    최근 수십년간 문화 전통에 관심이 많아지게 되었고 또한 젊은
                    세대에서 선호도가 증가가 되고 있습니다. <br />
                    2021년 대한민국 문화재청에서는 '막걸리 빚기'를
                    국가무형문화재 신규 종목으로 지정했는데, 국민의 제안을
                    수용하여 지정된 첫 번째 사례입니다. <br />
                    현재도 UNESCO 세계무형문화유산으로 등재하기 위한 노력을 하고
                    있습니다.
                </TitleDes>
                <Link to="/guide/soju" aria-label="막걸리 가이드 페이지로 이동">
                    <SojuGuide>막걸리 가이드 확인하기</SojuGuide>
                </Link>
            </TitleMain>
        </Container>
    );
}
