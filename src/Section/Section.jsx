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
    width: 1100px;
    height: 600px;
    display: flex;
    border: 1px solid #000;
    align-items: center;
    overflow: hidden;
    margin: 0 50px;
`
const Img = styled.div`
    width: 1000px;
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
export default function Section () {
    const example = ['1','2','3','4','5'];

    return(
        <Container>
            <ImgSlice>
                <Slide>
                    <Show>
                        {
                            example.map((item, index) => (
                                <Img key={index}>{item}</Img>
                            ))
                        }
                    </Show>
                </Slide>
            </ImgSlice>
        </Container>
    )
}