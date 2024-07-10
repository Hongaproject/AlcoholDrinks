import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebtn from "../Section/Sidebtn";

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const ShopMove = styled.span`
    float: right;
    font-size: 20px;
    margin-right: 200px;
    margin-top: 60px;
`
const IntroduceTitle = styled.h1`
    width: 295px;
    height: 75px;
    font-size: 48px;
    margin-left: 200px;
    margin-top: 160px;
`

const Outline = styled.div`
    width: calc(100% - 400px);
    height: 100%;
    margin: 0 auto;
    margin-top: 250px;
    margin-bottom: 180px;
    display: flex;
    flex-wrap: wrap;
    gap: 70px;
`
const Companys = styled.div`
    width: 600px;
    height: 200px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
    margin-bottom: 70px;
    cursor: pointer;
`

const CompanyImg = styled.img`  
    width: 600px;
    height: 200px;
    object-fit: contain;
`
const CompanyTitle = styled.h2`
    font-size: 24px;
    margin-top: 20px;
`
const CompanyHomepage = styled.span`
    font-size: 18px;
    margin-top: 12px;
    display: block;
`

export default function Company () {

    const [companyImg, setCompanyImg] = useState([]);

    const companyImgApi = async() => {
        const res = await axios.get("/db/company.json");
        setCompanyImg(res.data.company);
    }

    useState(() => {
        companyImgApi();
    }, []);

    return(
        <Container>
            <IntroduceTitle>주류 회사 소개</IntroduceTitle>
            <Link to='/shop' style={{ textDecoration: "none", color: "#000" }}>
                <ShopMove>판매처 구경하기</ShopMove>
            </Link>
            <Sidebtn />
            <Outline>
                {
                    companyImg.slice(0,8).map((item)=> (
                        <Companys key={item.id} onClick={()=> window.open(`${item.homepage}`)}>
                            <CompanyImg src={item.url}/>
                            <CompanyTitle>{item.name}</CompanyTitle>
                            <CompanyHomepage>{item.homepage}</CompanyHomepage>
                        </Companys>
                    ))
                }
            </Outline>
        </Container>
    );
}