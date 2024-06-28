import { useEffect, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #9d9d9d;
`
const ImgSlice = styled.div`
    width: 100%;
    height: 600px;
    background-color: #a9a97f;
`
// 이미지 슬라이드 예시
const Slide = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`
const Show = styled.div`
    width: 1500px;
    height: 600px;
    display: flex;
    border: 1px solid #000;
    align-items: center;
    overflow: hidden;
    margin: 0 50px;
`
const Img = styled.div`
    width: 1400px;
    height: 500px;
    flex-shrink: 0;
    text-align: center;
    margin: 0 50px;
    &:nth-child(1){
        background-color: aqua;
    }
    &:nth-child(2){
        background-color: #45d769;
    }
    &:nth-child(3){
        background-color: #232ea1;
    }
    &:nth-child(4){
        background-color: #bb1f84;
    }
    &:nth-child(5){
        background-color: #d6ce2d;
    }
` 


const Main = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    background-color: azure;
`
const SubTitle = styled.h1`
    font-size: 64px;
    text-align: center;
    align-items: center;
    margin-top: 50px;
    padding: 20px;
    &:after{
        content: "";
        display: block;
        width: 210px;
        border-bottom: 2px solid #000;
        margin: 10px auto;
    }
`

// soju
const SojuContainer = styled.div`
    width: 100%;
    height: 300px;
    background-color: antiquewhite;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Soju = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
`
const SojuImg = styled.div`
    width: 200px;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 5px ;
    float: left;
`
const SojuTitle = styled.h1`
    font-size: 36px;
    padding: 10px 0;
    position: absolute;
    top: 70%;
    left: 21%;
    transform: translate(-50%, -50%);
`
const SojuContent = styled.span`
    font-size: 18px;
    padding: 10px 0;
    position: absolute;
    top: 87%;
    left: 22.8%;
    transform: translate(-50%, -50%);
    color: #909090;
`

// beer
const BeerContainer = styled.div`
    width: 100%;
    height: 300px;
    background-color: #bf9864;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Beer = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    display:flex;
    flex-direction:row-reverse;
    align-items:center;
`
const BeerImg = styled.div`
    width: 200px;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 5px ;
    float: left;
`
const BeerTitle = styled.h1`
    font-size: 36px;
    padding: 10px 0;
    position: absolute;
    top: 70%;
    left: 79%;
    transform: translate(-50%, -50%);
`
const BeerContent = styled.span`
    font-size: 18px;
    padding: 10px 0;
    position: absolute;
    top: 87%;
    left: 77.2%;
    transform: translate(-50%, -50%);
    color: #909090;
`

// makgeolli
const MakgeolliC = styled.div`
    width: 100%;
    height: 500px;
    background-color: #855f2d;
    
`
const Makgeolli = styled.div`
    width: 100%;
    height: 300px;
    padding: 70px 0;
`
const MakgeolliImg = styled.div`
    width: 800px;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 5px ;
    margin: 0 auto;
`
const MakgeolliTitle = styled.h1`
    font-size: 36px;
    padding: 10px 0;
    text-align: center;
    margin-top: 20px;
`
const MakgeolliContent = styled.span`
    font-size: 18px;
    padding: 10px 0;
    color: #909090;
    text-align: center;
    justify-content: center;
    display: flex;
`

// liquorm, new
const LiquorNewC = styled.div`
    width: 100%;
    height: 500px;
    margin-top: 70px;
`
const LiquorNew = styled.div`
    width: 100%;
    height: 265px;
    display: flex;
    justify-content: space-around;
`
const LiquorImg = styled.div`
    width: 200px;
    height: 250px;
    background-color: #fff;
    flex-direction: column;
    box-shadow: 5px 5px 5px ;
`
const NewImg = styled.div`
    width: 200px;
    height: 250px;
    background-color: #fff;
    flex-direction: column;
    box-shadow: 5px 5px 5px ;
`
const LiquorNewText = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`
const LiquorNewTitle = styled.h1`
    font-size: 36px;
    padding: 10px 0;
    text-align: center;
`
const LiquorNewSpan = styled.span`
    font-size: 18px;
    padding: 10px 0;
    color: #909090;
    text-align: center;
    justify-content: center;
    display: flex;
`

export default function Section () {
    const example = ['1','2','3','4','5'];

    const [imgArr, setImgArr] = useState(0); 
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = example.length - 1;
    const MOVE_SLIDE_INDEX = 1; 

    const moveSlide = (value) => {
        if(value === 'next'){
            setImgArr((prevState) =>
                prevState < LAST_SLIDE_INDEX ? prevState + MOVE_SLIDE_INDEX : FIRST_SLIDE_INDEX
            )
        }
        if(value === 'prev'){
            setImgArr((prevState) =>
                prevState > FIRST_SLIDE_INDEX ? prevState - MOVE_SLIDE_INDEX : LAST_SLIDE_INDEX
            )
        }
    }

    useEffect(() => {
        const autoImg = setInterval(() => {
            moveSlide('next');
        }, 2000);

        return () => clearInterval(autoImg);
    }, [imgArr, example.length]);

    return(
        <Container>
            <ImgSlice>
                <Slide>
                    <button onClick={()=> moveSlide('prev')}>
                        뒤로
                    </button>
                    <Show>
                        {
                            example.map((item, index) => (
                                <Img 
                                    key={index} 
                                    style={{
                                        transform: `translateX(${-1500 * imgArr}px)`,
                                        transition: 'all 0.4s ease-in-out',
                                    }}>{item}
                                </Img>
                            ))
                        }
                    </Show>
                    <button onClick={()=> moveSlide('next')}>
                        다음
                    </button>
                </Slide>
            </ImgSlice>
            <Main>
                <SubTitle>주류 종류</SubTitle>
                <SojuContainer>
                    <Soju>
                        <SojuImg />
                        <SojuTitle>소주</SojuTitle>
                        <SojuContent>희석주 입니다.</SojuContent>
                    </Soju>
                </SojuContainer>
                <BeerContainer>
                    <Beer>
                        <BeerImg />
                        <BeerTitle>맥주</BeerTitle>
                        <BeerContent>곡료주 입니다.</BeerContent>
                    </Beer>
                </BeerContainer>
                <MakgeolliC>
                    <Makgeolli>
                        <MakgeolliImg />
                        <MakgeolliTitle>막걸리</MakgeolliTitle>
                        <MakgeolliContent>전통주 입니다.</MakgeolliContent>
                    </Makgeolli>
                </MakgeolliC>
                <LiquorNewC>
                    <LiquorNew>
                        <LiquorImg />
                        <NewImg />
                    </LiquorNew>
                    <LiquorNewText>
                        <LiquorNewTitle>증류주</LiquorNewTitle>
                        <LiquorNewTitle>신제품</LiquorNewTitle>
                    </LiquorNewText>
                    <LiquorNewText>
                        <LiquorNewSpan>증류주</LiquorNewSpan>
                        <LiquorNewSpan>신제품</LiquorNewSpan>
                    </LiquorNewText>
                </LiquorNewC>
            </Main>
        </Container>
    )
}