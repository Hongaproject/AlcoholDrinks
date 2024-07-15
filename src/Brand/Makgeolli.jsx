import styled from "styled-components";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebtn from "../Section/Sidebtn";

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

const Outline = styled.div`
    width: calc(100% - 440px);
    height: 100%;
    margin: 0 auto;
    margin-bottom: 180px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

const Product = styled.div`
    width: 23%;
    margin-top: 90px;
    border: 1px solid #EBEAEC;
    box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
    border-radius: 20px;
`

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
`
const ProductImgName = styled.h1`
    font-size: 32px;
    color: #000;
    text-align: center;
    margin-top: 30px;
`
const ProductImgPrice = styled.span`
    font-size: 20px;
    color: #909090;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    margin: 20px 0;
`;

export default function Makgeolli () {
    
    const [makgeolliImg, setMakgeolliImg] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    const imgAPi = async(page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get('/db/brandmakgeolli.json');
            const data = res.data.makgeolli.map(item => ({ ...item, category: 'makgeolli' }));

            const newMakgeolli = data.slice((page - 1) * 8, page * 8);
            setMakgeolliImg(prevSojuImg => [...prevSojuImg, ...newMakgeolli]);
        } catch (error) {
            console.error('막걸리 데이터를 가져오는 중 오류 발생ta:', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        imgAPi(page);
    }, [page]);


    const location = useLocation();
    const [activeTitle, setActiveTitle] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case '/brand/makgeolli':
                setActiveTitle('막걸리');
                break;
            default:
                setActiveTitle('');
        }
    }, [location.pathname]);

    const handleClick = (title) => {
        setActiveTitle(title);
    };

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setPage(prevPage => prevPage + 1);
                }
            });
        }, { threshold: 1.0 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);


    return(
        <Container>
            <Introduce>
                <Link to='/brand/soju' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '소주'}
                        onClick={() => handleClick('소주')}
                    >
                        소주
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/beer' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '맥주'}
                        onClick={() => handleClick('맥주')}
                    >
                        맥주
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/liquor' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '증류주'}
                        onClick={() => handleClick('증류주')}
                    >
                        증류주
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/makgeolli' style={{ textDecoration: "none", color: "#000"}}>
                    <IntroduceTitle
                        active={activeTitle === '막걸리'}
                        onClick={() => handleClick('막걸리')}
                    >  
                        막걸리
                    </IntroduceTitle>
                </Link>
                <Link to='/brand/new' style={{ textDecoration: "none", color: "#000" }}>
                    <IntroduceTitle
                        active={activeTitle === '신제품'}
                        onClick={() => handleClick('신제품')}
                    >
                        신제품
                    </IntroduceTitle>
                </Link>
            </Introduce>
            <Sidebtn />
            <Outline>
                {
                    makgeolliImg.map((item)=>(
                        <Product key={item.id}>\
                            <Link to={`/brand/detail/${item.category}/${item.id}`} style={{ textDecoration: "none", color: "#000" }}>
                                <ProductImg src={item.url}/>
                                <ProductImgName>{item.name}</ProductImgName>
                                <ProductImgPrice>{item.company}</ProductImgPrice>
                            </Link>
                        </Product>
                    ))
                }
            </Outline>
            {loading && (
                <Loader>
                    <img src="/img/Spinner.gif" alt="Loading..." />
                </Loader>
            )}
            <div ref={loader} style={{ height: '100px', background: 'transparent' }}></div>
        </Container>
    );
}