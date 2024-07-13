import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: 64px;
    margin-top: 150px;
`

const Introduce = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 150px;
`
const HistoryText = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;
`
const HistoryTitle = styled.h2`
    font-size: 48px;
    margin-bottom: 40px;
`
const HistoryContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 1.4;
`
const CommonSenseText = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 90px;
`
const CommonSenseTitle = styled.h2`
    font-size: 48px;
    margin-bottom: 40px;
`
const CommonSenseContent = styled.span`
    font-size: 20px;
    color: #909090;
    line-height: 2;
`

export default function SojuGuide () {
    return(
        <Container>
            <MainTitle>소주상식 가이드</MainTitle>
            <Introduce>
                <HistoryText>
                    <HistoryTitle>소주의 역사</HistoryTitle>
                    <HistoryContent>
                        우리가 알던 소주가 아닌 증류주 방식인 소주가 나타났습니다. <br/ > 증류주는 10세기경 페르시아에서 처음 만들어졌고 몽골이 대제국을 지배하면서 고려 후기에 우리나라에 소주가 들어오게 되었습니다.<br />
                        일본 정벌을 위해 안동, 제주, 개성에 주둔했었는데 그로 인해 안동, 제주, 개성에서 소주 제조법이 발달하게 되어 현재까지도 그 전통을 유지하여 유명합니다. <br /> <br />
                        소주는 일본에서 탄생한 조주 방식입니다. 우리나라에 들어왔을때는 일제강점기 초기인 1910년대이며 주세법 발표와 허가증을 만들어서 주류 업체들이 나타나기 시작했습니다. <br />
                        단식 증류기로 소주를 만들었었는데 연속식증류기가 발명된 후, 소주를 대량 생산할 수 있게 되었으며 1919년에 최초로 희석식 소주 공장이 세워지게 되었습니다. <br />
                        낮은 생산 가격을 무기로 대중 사이에 퍼져나갈수 있었습니다. 
                    </HistoryContent>
                </HistoryText>
                <CommonSenseText>
                    <CommonSenseTitle>취급 상식</CommonSenseTitle>
                    <CommonSenseContent>
                        1. 소주를 개봉할 때에는 뚜껑의 위쪽 부분만 엄지와 검지를 이용하여(개봉 시 주의) 반시계 방향으로 회전시켜 주세요. <br />
                        2. 보관 할 때에는 고온 다습한 환경은 피해 주시고, 직사광선을 피해 그늘지고 환기가 잘 되는 서늘한 곳에 보관 바랍니다. <br />
                        3. 소주에 함유된 스테비아 - 설탕의 200~300배 감미도를 가지고 있으면서 칼로리는 거의 없는 특징을 가지고 있습니다. <br />
                        4. 소주가 화학주다? - 아닙니다. 소주는 쌀, 보리, 고구마, 타피오카와 같은 곡물을 이용해서 발효하고 증류해서 만들어집니다. 
                    </CommonSenseContent>
                </CommonSenseText>
                <CommonSenseText>
                    <CommonSenseTitle>자원 절약을 위해 꼭 지켜주세요 - 공병 재사용 법 </CommonSenseTitle>
                    <CommonSenseContent>
                        - 내용물을 깨끗이 비워주세요. <br />
                        - 담배꽁초, 참기름 등 이물질을 넣지 말아주세요. <br />
                        - 빈병을 깨뜨리지 말아주세요. <br />
                        - 색상별 제품별로 분리해 주세요. <br />
                        - 빈병에 병뚜껑을 씌워 주세요. <br />
                        * 이는 재사용을 어렵게 하는 원인이 되며, 자원절약과 환경보호를 가로막는 걸림돌이 됩니다.
                    </CommonSenseContent>
                </CommonSenseText>
            </Introduce>
        </Container>
    );
}