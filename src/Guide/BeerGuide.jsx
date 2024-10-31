import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: 64px;
    margin-top: 150px;

    @media (max-width: 768px) {
        text-align: center;
        font-size: 3rem;
    }
`

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
`
const TextSection = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;
`
const Title = styled.h2`
    font-size: 48px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        text-align: center;
        font-size: 2rem;
    }
`
const Content = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.6;
`

export default function BeerGuide () {
    
    return(
        <Container>
            <MainTitle>맥주상식 가이드</MainTitle>
            <Introduce>
                <TextSection>
                    <Title>맥주의 역사</Title>
                    <Content>
                        맥주는 B.C 4000년경 중동 지방의 티그리스, 유프라테스 강 유역에서 수메르 민족이 최초로 제조하였던 것으로 알려져 있습니다.<br />
                        현재 고대 이집트를 탐사하고 있는 고고학자들이 새로운 정보를 알아내고 있습니다. 고대 이집트 당시 대형 양조장이 있었다고 합니다. <br />
                        현재 우리가 아는 맥주 제조방법은 독일에서 시작되었으며 독일로 여행을 가신다면 몇백년 된 양조장들을 구경할 수 있습니다. <br /> <br/>
                        19세기 맥주에 큰 변화가 왔었습니다. 맥주의 대량 생산을 가능하게 해줬으며, 카를 폰 린데 독일인이 냉동기를 제작하여 계절에 상관없이 양조를 가능하게 했다. <br />
                        루이 파스퇴르 프랑스인이 술이 효모의 작용에 의해 생성된다는 사실과 열처리 살균법을 개발하여 오랫동안 보관이 가능하게 되었습니다. <br />
                        이후 에밀 한센 덴마크인이 파스퇴르의 이론을 응용해 효모의 순수배양법을 개발하면서 맥주의 품질을 높였습니다. <br />
                        80년대 이후 맥주 고유의 신선도를 유지하면서 장기 유통을 할 수 있는 첨단 비열처리 공법이 개발되면서 소비자들은 더욱 신선한 맥주를 즐길 수 있게 되었습니다.
                    </Content>
                </TextSection>
                <TextSection>
                    <Title>취급 상식</Title>
                    <Content>
                        1. 병맥주 - 오프너를 사용해서 개봉해주시고, 빨리 시원하게 드시려고 냉동실에 넣으면 병맥주가 터지니 절대 넣지 마십시오. <br />
                        2. 페트맥주 - 일반페트와 달리 맥주 맛을 위해 3중막 구조로 된 페트용기를 사용하고 있습니다. <br />
                        3. 생맥주 - 관리하기에 따라 맛이 달라질 수 있습니다. 과거에는 살균 처리 과정으로 인하여 생맥주, 병맥주로 나뉘게 되었지만 현재는 똑같은 맥주입니다.  <br />
                    </Content>
                </TextSection>
                <TextSection>
                    <Title>자원 절약을 위해 꼭 지켜주세요 - 공병 재사용 법 </Title>
                    <Content>
                        - 내용물을 깨끗이 비워주세요. <br />
                        - 담배꽁초, 참기름 등 이물질을 넣지 말아주세요. <br />
                        - 빈병을 깨뜨리지 말아주세요. <br />
                        - 색상별 제품별로 분리해 주세요. <br />
                        - 빈병에 병뚜껑을 씌워 주세요. <br />
                        * 이는 재사용을 어렵게 하는 원인이 되며, 자원절약과 환경보호를 가로막는 걸림돌이 됩니다.
                    </Content>
                </TextSection>
            </Introduce>
        </Container>
    );
}