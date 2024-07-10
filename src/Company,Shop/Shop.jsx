import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const IntroduceTitle = styled.h1`
    width: 295px;
    height: 75px;
    font-size: 48px;
    margin-left: 200px;
    margin-top: 160px;
    margin-bottom: 100px;
`

const CompanyMove = styled.span`
    float: right;
    font-size: 20px;
    margin-right: 200px;
    margin-top: 60px;
`

const Notification = styled.span`
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Outline = styled.div`
    width: calc(100% - 400px);
    height: 100%;
    margin: 0 auto;
    margin-top: 187px;
    margin-bottom: 180px;
    display: flex;
    flex-wrap: wrap;
    gap: 70px;
`
const Shops = styled.div`
    width: 600px;
    height: 200px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
    margin-bottom: 80px;
    cursor: pointer;
`

const ShopImg = styled.img`  
    width: 600px;
    height: 200px;
    object-fit: contain;
`
const ShopTitle = styled.h2`
    font-size: 24px;
    margin-top: 20px;
`
const ShopHomepage = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;
`
const ShopTel = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;
`

export default function Shop () {

    const [shopImg, setShopImg] = useState([]);

    const shopImgApi = async() => {
        const res = await axios.get("/db/shop.json");
        setShopImg(res.data.shop);
    }

    useState(() => {
        shopImgApi();
    }, []);

    return(
        <Container>
            <Link to='/company' style={{ textDecoration: "none", color: "#000" }}>
                <CompanyMove>회사소개 구경하기</CompanyMove>
            </Link>
            <IntroduceTitle>판매처 소개</IntroduceTitle>
            <Notification>전통주를 제외한 주류/담배등은 관령 법령에 의거하여 인터넷 쇼핑몰에서는 판매가 불가합니다.</Notification>
            <Sidebtn />
            <Outline>
                {
                    shopImg.slice(0,8).map((item)=> (
                        <Shops key={item.id} onClick={()=> window.open(`${item.homepage}`)}>
                            <ShopImg src={item.url}/>
                            <ShopTitle>{item.name}</ShopTitle>
                            <ShopHomepage>{item.homepage}</ShopHomepage>
                            <ShopTel>{item.tel}</ShopTel>
                        </Shops>
                    ))
                }
            </Outline>
        </Container>
    );
}