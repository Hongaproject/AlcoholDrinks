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

const Introduce = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 150px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0 20px;
    }
`;
const TextSection = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;
`;
const TitleSub2 = styled.h2`
    font-size: 48px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        text-align: center;
        font-size: 2rem;
    }
`;
const Content = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.6;
`;

export default function MakgeolliGuide() {
    return (
        <Container>
            <TitleMain>
                <Title>막걸리 상식 가이드</Title>
                <TitleNav>
                    <Link to="/guide/soju" style={{ textDecoration: "none" }}>
                        <TitleNavL>소주</TitleNavL>
                    </Link>
                    <Link to="/guide/beer" style={{ textDecoration: "none" }}>
                        <TitleNavL>맥주</TitleNavL>
                    </Link>
                    <Link
                        to="/guide/makgeolli"
                        style={{ textDecoration: "none" }}
                    >
                        <TitleNavL active={true}>막걸리</TitleNavL>
                    </Link>
                </TitleNav>
                <TitleSub>막걸리의 역사</TitleSub>
                <Introduce>
                    <TextSection aria-labelledby="막걸리의 역사">
                        <Content aria-describedby="막걸리의 역사 설명">
                            막걸리의 '막'은 '마구'의 줄임말로 특정한 규칙없이
                            대충이라는 의미와 부사의 형태로 '지금 바로'라는
                            의미를 지니고 있다. <br />
                            <br />
                            고려 시대
                            <br />
                            “고려에는 찹쌀이 없어 멥쌀과 누룩으로 술을 빚는다”는
                            기록이 있고, 이어 “술맛이 독하여 쉽게 취하고 빨리
                            깬다”는 기록도 있다. 이렇게 술이 독하다는 것은 고려
                            시대에 이미 밑술을 이용하여 도수가 높은 술을
                            제조하고 있었음을 의미하는 것이다. 또한
                            〈고려도경〉에서는 “일반적으로 고려 사람들은 술을
                            즐긴다. 그러나 서민들은 양온서에서 빚는 좋은 술을
                            얻기 어려워서 맛이 박(薄)하고 빛깔이 진한 것을 마셔
                            별로 취하지 않는다”라고 기록되어 있다. <br />
                            <br />
                            조선 시대
                            <br />
                            고려 시대의 술 빚기가 그대로 조선 초기로 전해지나
                            시대가 지날수록 술 빚는 원료의 양에서 큰 차이를
                            보이게 된다. 고려 시대에는 국가의 큰 행사를 위해
                            사찰 등에서 대량으로 빚었던 술이 조선 시대로
                            넘어오면서 불교를 배척하는 정책이 시행되고, 일반
                            가정에서 직접 술을 빚어 제례 등에 사용하면서 술을
                            빚는 원료의 양이 점점 줄어들고 멥쌀보다는 찹쌀의
                            사용 비중이 높아져 막걸리의 감칠맛이 좀 더 커지게
                            된다.
                            <br />
                            <br />
                            일제강점기 <br />
                            1909년 이전에는 대부분 집에서 술을 빚었으며 손님을
                            대접하거나 제례에 사용되어 왔다. 그러던 것이 1909년
                            주세법을 제정·공포하여 수백, 수천 년간 내려오던
                            전통적인 술 제조법들이 주세법이라는 틀 안에 갇히게
                            된 것이다. 전통적으로 빚어오던 술이 ‘밀주’로
                            취급받으며 점차 사라졌고 술 제조장은 점차 대형화하게
                            되었다. 1916년 주세령 시행으로 가양주는 자취를
                            감추게 되며, 급기야 1934년 자가용 양조면허가
                            폐지되면서 전통적으로 이어내려온 우리 술의 맥이
                            끊기고 말았다. <br />
                            <br />
                            해방후 <br />
                            국가에서는 쌀로 술을 빚는 것을 제한하게 되고 1965년
                            ‘양곡관리법’ 시행으로 쌀을 이용한 술 제조가
                            금지되었다. 결국 막걸리는 쌀이 아닌 보리로, 다시
                            옥수수와 밀가루로 빚을 수밖에 없게 되었습니다. 또한
                            외국에서 맥주와 위스키 등 다양한 주류들이 들어오기
                            시작했으며 막걸리대신 위스키와 희석식 소주가 우리
                            생활 속의 술로 자리를 잡게 되었습니다.
                            <br />
                            <br />
                            현재 <br />
                            젊은 세대들이 전통주에 관심을 가지게 되면서 전통주의
                            매출이 증가했으며 더 나가아 2021년 대한민국
                            문화재청에서는 '막걸리 빚기'를 국가무형문화재 신규
                            종목으로 지정했는데, 국민의 제안을 수용하여 지정된
                            첫 번째 사례입니다. 현재도 UNESCO
                            세계무형문화유산으로 등재하기 위한 노력을 하고
                            있습니다.
                        </Content>
                    </TextSection>
                    <TextSection aria-labelledby="취급 상식">
                        <Title id="취급 상식">취급 상식</Title>
                        <Content aria-describedby="취급 상식 설명">
                            1. 생막걸리 - 살균을 따로 거치지 않아 효모가
                            살아있는 막걸리를 뜻한다. 유통기한이 짧다는 특징을
                            가진다. <br />
                            2. 보관 기간 - 가정에서 마시는 막걸리라면 맨눈으로
                            봤을 때 술의 상태가 괜찮고 간장 냄새 같은 이취가
                            나지 않으면 마셔도 별 문제가 없다는 게 전문가들의
                            견해다. <br />
                            3. 보관방법 - 0~10℃ 이하에서 냉장 보관, 세워서
                            보관하기 만약 누워서 보관하게 되면 효모에 의해
                            생성되는 탄산가스가 병뚜껑으로 배출되지 못하고
                            내용물과 새어 나올수도 있다. <br />
                        </Content>
                    </TextSection>
                    <TextSection aria-labelledby="공병 재사용 법">
                        <Title id="공병 재사용 법">
                            자원 절약을 위해 꼭 지켜주세요 - 공병 재사용 법{" "}
                        </Title>
                        <Content aria-describedby="공병 재사용 법 설명">
                            - 내용물을 깨끗이 비워주세요. <br />- 담배꽁초,
                            참기름 등 이물질을 넣지 말아주세요. <br />
                            - 빈병에 병뚜껑을 씌워 주세요. <br />* 이는 재사용을
                            어렵게 하는 원인이 되며, 자원절약과 환경보호를
                            가로막는 걸림돌이 됩니다.
                        </Content>
                    </TextSection>
                </Introduce>
            </TitleMain>
        </Container>
    );
}
