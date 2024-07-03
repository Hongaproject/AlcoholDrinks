import styled from "styled-components";
import dummy from "../brandsoju.json";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Introduce = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 160px;
`
const IntroduceTitle = styled.h1`
    width: 230px;
    height: 80px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.active ? '#87CEEB' : '#FFFFFF')}; /* SkyBlue when active */
    box-shadow: 5px 3px 0px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-right: 70px;
    font-size: 32px;
    cursor: pointer;
    transition: background 0.3s ease;
    color: #000;
`;



export default function Soju () {
    
    // console.log(dummy);
    const [sojuImg, setSojuImg] = useState([]);

    const imgAPi = async() => {
        const res = await axios.get('/db/brandsoju.json');
        console.log(res.data.soju[0].url);
        setSojuImg(res.data.soju);
    }

    useEffect(() => {
        imgAPi();
    }, [])

    return(
        <div>
            {
                dummy.soju.map((v)=> (
                    <div key={v.id}>
                        {v.name} 
                        {v.price}
                        {v.url}
                        <img src={v.url} alt="" />
                    </div>
                ))
            }
            {
                sojuImg.map((a) => (
                    <div key={a.id}>
                        {a.name}
                        {a.price}
                        {a.url}
                        <img src={a.url} alt="" />
                    </div>
                ))
            }
        </div>
    );
}