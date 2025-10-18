import { Link } from "react-router-dom";
import styled from "styled-components";
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

    @media ${device.laptop} {
        margin-top: 150px;
    }
    @media ${device.tablet} {
        margin-top: 150px;
    }
    @media ${device.mobile} {
        margin-top: 150px;
    }
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

    @media ${device.laptop} {
        max-width: 780px;
    }
    @media ${device.tablet} {
        max-width: 700px;
    }
    @media ${device.mobile} {
        max-width: 380px;
    }
`;
const TitleNavL = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#C98B20" : "#000")};
`;

const TitleSub = styled.h2`
    font-size: 40px;
    text-align: center;
    margin-top: 150px;
    color: #c98b20;
`;

const TitleDes = styled.p`
    font-size: 20px;
    text-align: center;
    margin-top: 70px;
    line-height: 2;

    @media ${device.laptop} {
        font-size: 24px;
    }
`;

const BeerGuide = styled.button`
    width: 400px;
    height: 85px;
    background-color: #eacaa2;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 70px;
    border-radius: 204px;
    border: none;
`;

export default function BeerStory() {
    return (
        <Container>
            <TitleMain>
                <Title>주류의 역사</Title>
                <TitleNav>
                    <Link to="/story/soju" style={{ textDecoration: "none" }}>
                        <TitleNavL>소주</TitleNavL>
                    </Link>
                    <Link to="/story/beer" style={{ textDecoration: "none" }}>
                        <TitleNavL active={true}>맥주</TitleNavL>
                    </Link>
                    <Link
                        to="/story/makgeolli"
                        style={{ textDecoration: "none" }}
                    >
                        <TitleNavL>막걸리</TitleNavL>
                    </Link>
                </TitleNav>
                <TitleSub>맥주</TitleSub>
                <TitleDes>
                    맥주는 B.C 4000년경 중동 지방의 티그리스, 유프라테스 강
                    유역에서 수메르 민족이 최초로 제조하였던 것으로 알려져
                    있습니다.
                    <br />
                    현재 고대 이집트를 탐사하고 있는 고고학자들이 새로운 정보를
                    알아내고 있습니다. 고대 이집트 당시 대형 양조장이 있었다고
                    합니다. <br />
                    현재 우리가 아는 맥주 제조방법은 독일에서 시작되었으며
                    독일로 여행을 가신다면 몇백년 된 양조장들을 구경할 수
                    있습니다.
                </TitleDes>
                <TitleDes>
                    19세기 맥주에 큰 변화가 왔었습니다. 맥주의 대량 생산과 카를
                    폰 린데라는 독일인이 냉동기를 제작하여 계절에 상관없이
                    양조를 가능하게 했습니다. <br />
                    루이 파스퇴르 프랑스인이 술이 효모의 작용에 의해 생성된다는
                    사실과 열처리 살균법을 개발하여 오랫동안 보관이 가능하게
                    되었습니다. <br />
                    이후 에밀 한센 덴마크인이 파스퇴르의 이론을 응용해 효모의
                    순수배양법을 개발하면서 맥주의 품질을 높였습니다. <br />
                    80년대 이후 맥주 고유의 신선도를 유지하면서 장기 유통을 할
                    수 있는 첨단 비열처리 공법이 개발되면서 소비자들은 더욱
                    신선한 맥주를 즐길 수 있게 되었습니다.
                </TitleDes>
                <Link to="/guide/beer" aria-label="맥주 가이드 페이지로 이동">
                    <BeerGuide>맥주 가이드 확인하기</BeerGuide>
                </Link>
            </TitleMain>
        </Container>
    );
}
