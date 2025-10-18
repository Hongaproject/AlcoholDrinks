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

// ----- 메인 제목 섹션 -----
const TitleMain = styled.div`
    width: 100%;
    max-width: 1000px; /* 최대 너비 제한 */
    margin: 0 auto;
    margin-top: 200px;
    margin-bottom: 150px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${device.laptop} {
        margin-top: 150px;
        margin-bottom: 100px;
    }
    @media ${device.tablet} {
        margin-top: 150px;
        margin-bottom: 80px;
    }
    @media ${device.mobile} {
        margin-top: 150px;
        margin-bottom: 50px;
    }
`;
const Title = styled.h1`
    font-size: 48px;
    text-align: center;

    @media ${device.laptop} {
        font-size: 40px;
    }
    @media ${device.mobile} {
        font-size: 32px;
    }
`;

// ----- 네비게이션 바 -----
const TitleNav = styled.nav`
    width: 800px;
    max-width: 100%; /* 부모 TitleMain에 맞춰 너비 유연하게 조정 */
    height: auto;
    border-bottom: 2px solid #000;
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;

    @media ${device.laptop} {
        margin-top: 80px;
        gap: 60px;
    }
    @media ${device.tablet} {
        margin-top: 60px;
        gap: 40px;
    }
    @media ${device.mobile} {
        margin-top: 40px;
        gap: 20px; /* 간격 더 줄임 */
        border-bottom: 1px solid #000; /* 모바일에서는 선 굵기 줄임 */
    }
`;
const TitleNavL = styled.div`
    font-size: 22px;
    padding-bottom: 20px;
    color: ${({ active }) => (active ? "#008810" : "#000")};
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */

    @media ${device.laptop} {
        font-size: 20px;
        padding-bottom: 15px;
    }
    @media ${device.mobile} {
        font-size: 16px;
        padding-bottom: 10px;
    }
`;

const TitleSub = styled.h2`
    font-size: 40px;
    text-align: center;
    margin-top: 150px;
    color: #008810;

    @media ${device.laptop} {
        font-size: 32px;
        margin-top: 100px;
    }
    @media ${device.mobile} {
        font-size: 24px;
        margin-top: 60px;
    }
`;

// ----- 본문 섹션 -----
const Introduce = styled.div`
    width: 100%;
    max-width: 800px; /* 내용의 최대 너비를 제한하여 가독성 확보 */
    height: 100%;
    margin: 0 auto;
    margin-bottom: 150px;
    box-sizing: border-box;
    /* desktop/laptop에서는 text-align: left가 기본 */

    @media ${device.laptop} {
        margin-bottom: 100px;
    }
    @media ${device.mobile} {
        margin-bottom: 80px;
        /* 모바일에서는 텍스트 중앙 정렬을 풀어주고, Left 정렬을 기본으로 합니다. */
    }
`;

const TextSection = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;

    @media ${device.laptop} {
        margin-top: 70px;
    }
    @media ${device.mobile} {
        margin-top: 50px;
    }
`;
const TitleSub2 = styled.h2`
    font-size: 48px;
    margin-bottom: 40px;
    text-align: left; /* 데스크톱/랩탑 기본 정렬 */

    @media ${device.laptop} {
        font-size: 40px;
        margin-bottom: 30px;
    }
    @media ${device.tablet} {
        font-size: 32px;
    }
    @media ${device.mobile} {
        font-size: 24px;
        margin-bottom: 20px;
    }
`;
const Content = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.6;
    display: block; /* 줄바꿈을 위해 block으로 변경 */

    @media ${device.laptop} {
        font-size: 18px;
    }
    @media ${device.mobile} {
        font-size: 15px;
        line-height: 1.5;
    }
`;

export default function SojuGuide() {
    return (
        <Container>
            <TitleMain>
                <Title>주류 상식 가이드</Title>
                <TitleNav>
                    <Link to="/guide/soju" style={{ textDecoration: "none" }}>
                        <TitleNavL active={true}>소주 가이드</TitleNavL>
                    </Link>
                    <Link to="/guide/beer" style={{ textDecoration: "none" }}>
                        <TitleNavL>맥주 가이드</TitleNavL>
                    </Link>
                    <Link
                        to="/guide/makgeolli"
                        style={{ textDecoration: "none" }}
                    >
                        <TitleNavL>막걸리 가이드</TitleNavL>
                    </Link>
                </TitleNav>
                <TitleSub>소주 상식 가이드</TitleSub>
            </TitleMain>
            <Introduce>
                <TextSection aria-labelledby="소주의 역사">
                    {/* TitleSub2는 이 섹션에 포함되지 않으므로, 이 부분을 텍스트와 분리했습니다. */}
                    <Content aria-describedby="소주의 역사 설명">
                        우리가 알던 소주가 아닌 증류주 방식인 소주가
                        나타났습니다. <br /> 증류주는 10세기경 페르시아에서 처음
                        만들어졌고 몽골이 대제국을 지배하면서 고려 후기에
                        우리나라에 소주가 들어오게 되었습니다.
                        <br />
                        일본 정벌을 위해 안동, 제주, 개성에 주둔했었는데 그로
                        인해 안동, 제주, 개성에서 소주 제조법이 발달하게 되어
                        현재까지도 그 전통을 유지하여 유명합니다. <br /> <br />
                        소주는 일본에서 탄생한 조주 방식입니다. 우리나라에
                        들어왔을때는 일제강점기 초기인 1910년대이며 주세법
                        발표와 허가증을 만들어서 주류 업체들이 나타나기
                        시작했습니다. <br />
                        단식 증류기로 소주를 만들었었는데 연속식증류기가 발명된
                        후, 소주를 대량 생산할 수 있게 되었으며 1919년에 최초로
                        희석식 소주 공장이 세워지게 되었습니다. <br />
                        낮은 생산 가격을 무기로 대중 사이에 퍼져나갈수
                        있었습니다.
                    </Content>
                </TextSection>
                <TextSection aria-labelledby="취급 상식">
                    <TitleSub2 id="취급 상식">소주 취급 상식</TitleSub2>
                    <Content aria-describedby="취급 상식 설명">
                        1. 소주를 개봉할 때에는 뚜껑의 위쪽 부분만 엄지와 검지를
                        이용하여(개봉 시 주의) 반시계 방향으로 회전시켜 주세요.{" "}
                        <br />
                        2. 보관 할 때에는 고온 다습한 환경은 피해 주시고,
                        직사광선을 피해 그늘지고 환기가 잘 되는 서늘한 곳에 보관
                        바랍니다. <br />
                        3. 소주에 함유된 스테비아 - 설탕의 200~300배 감미도를
                        가지고 있으면서 칼로리는 거의 없는 특징을 가지고
                        있습니다. <br />
                        4. 소주가 화학주다? - 아닙니다. 소주는 쌀, 보리, 고구마,
                        타피오카와 같은 곡물을 이용해서 발효하고 증류해서
                        만들어집니다.
                    </Content>
                </TextSection>
                <TextSection aria-labelledby="공병 재사용 법">
                    <TitleSub2 id="공병 재사용 법">
                        자원 절약을 위해 꼭 지켜주세요 - 공병 재사용 법{" "}
                    </TitleSub2>
                    <Content aria-describedby="공병 재사용 법 설명">
                        - 내용물을 깨끗이 비워주세요. <br />- 담배꽁초, 참기름
                        등 이물질을 넣지 말아주세요. <br />
                        - 빈병을 깨뜨리지 말아주세요. <br />
                        - 색상별 제품별로 분리해 주세요. <br />
                        - 빈병에 병뚜껑을 씌워 주세요. <br />* 이는 재사용을
                        어렵게 하는 원인이 되며, 자원절약과 환경보호를 가로막는
                        걸림돌이 됩니다.
                    </Content>
                </TextSection>
            </Introduce>
        </Container>
    );
}
