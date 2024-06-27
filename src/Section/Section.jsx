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
                                        transform: `translateX(${-1100 * imgArr}px)`,
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
        </Container>
    )
}