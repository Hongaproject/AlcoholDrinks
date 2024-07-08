import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const IntroduceTitle = styled.div`
    width: 295px;
    height: 75px;
    font-size: 48px;
`

const Outline = styled.div`
    width: calc(100% - 600px);
    height: 100%;
    margin: auto;
    margin-top: 160px;
`
const Product = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 60px;
    display: flex;
`

const ProductImg = styled.img`
    width: 300px;
    height: 350px;
    object-fit: contain;
`
const ProductDiv = styled.div`
    width: 300px;
    height: 80px;
`
const ProductImgTitle = styled.h1`
    font-size: 48px;
    margin-top: 90px;
`
const ProductImgCompany = styled.span`
    font-size: 20px;
    padding: 10px 0;
    display: flex;
    color: #909090;
    margin-bottom: 30px;
`

const ProductContent = styled.div`
    width: 500px;
    height: 100px;
    display: flex;
`
const ProductCTS = styled.div`
    width: 110px;
    height: 60px;
    margin-right: 30px;
`

const ProductCTitle = styled.h2`
    font-size: 24px;
    text-align: center;
`

const ProductCSpan = styled.span`
    font-size: 18px;
    color: #909090;
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
`

const Section = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 130px;
`

const SectionSub = styled.h1`
    width: 230px;
    height: 80px;
    border: 1px solid #000;
    box-shadow: 5px 3px 0px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
`
const SectionIntroduce = styled.div`
    width: calc(100% - 600px);
    height: 100%;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 160px;
`

const SectionTitle = styled.h2`
    font-size: 48px;
`

const SectionSpan = styled.span`
    font-size: 20px;
    margin-top: 60px;
    display: block;
    line-height: 1.4;
    white-space: pre-line;
`



export default function SojuDetail() {
    // URL 매개변수에서 id 가져오기
    const { id } = useParams();
    // 소주 데이터를 저장할 상태
    const [sojuData, setSojuData] = useState([]);
    // 특정 소주 항목을 저장할 상태
    const [sojuItem, setSojuItem] = useState(null);

    // 엔드포인트에서 JSON 데이터 가져오기
    const fetchSojuData = async () => {
        try {
            const res = await axios.get('/db/brandsoju.json');
            setSojuData(res.data.soju);
        } catch (error) {
            console.error('소주 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchSojuData();
    }, []);

    // id를 기반으로 특정 소주 항목 필터링
    useEffect(() => {
        if (sojuData.length > 0) {
            const foundItem = sojuData.find((item) => item.id === parseInt(id));
            setSojuItem(foundItem);
        }
    }, [id, sojuData]);

    return (
        <Container>
            <Outline>
                <IntroduceTitle>세부페이지</IntroduceTitle>
                    {sojuItem ? (
                        <Product>
                            <ProductImg src={sojuItem.url} alt={sojuItem.name} />
                            <ProductDiv>
                                <ProductImgTitle>{sojuItem.name}</ProductImgTitle>
                                <ProductImgCompany>{sojuItem.company}</ProductImgCompany>
                                <ProductContent>
                                    <ProductCTS>
                                        <ProductCTitle>국가/지역</ProductCTitle>
                                        <ProductCSpan>{sojuItem.country}</ProductCSpan>
                                    </ProductCTS>
                                    <ProductCTS>
                                        <ProductCTitle>스타일</ProductCTitle>
                                        <ProductCSpan>{sojuItem.style}</ProductCSpan>
                                    </ProductCTS>
                                    <ProductCTS>
                                        <ProductCTitle>도수</ProductCTitle>
                                        <ProductCSpan>{sojuItem.alcohol}</ProductCSpan>
                                    </ProductCTS>
                                    <ProductCTS>
                                        <ProductCTitle>용량</ProductCTitle>
                                        <ProductCSpan>{sojuItem.netw}</ProductCSpan>
                                    </ProductCTS>
                                </ProductContent>
                            </ProductDiv>
                        </Product>
                    ) : (
                        <p>로딩 중...</p>
                    )}
            </Outline>
            <Section>
                <SectionSub>상품 설명</SectionSub>
                {
                    sojuItem ? (
                        <SectionIntroduce>
                            <SectionTitle>{sojuItem.name}</SectionTitle>
                            <SectionSpan>{sojuItem.discription}</SectionSpan>
                        </SectionIntroduce>
                    ) : (
                        <p>로딩 중...</p>
                    )
                }
            </Section>
        </Container>
    );
}
