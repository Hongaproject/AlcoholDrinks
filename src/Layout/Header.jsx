import styled from "styled-components";
import '../Font/Font.css'
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Container = styled.div`
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 10px 20px rgba(0, 0, 13, 0.07);
    position: relative;
    z-index: 1;
`;

const Nav = styled.div`
    width: calc(100% - 220px);
    margin: 0 auto;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    z-index: 2;
`;

const Logo = styled.div`
    width: 360px;
    height: 50px;
    font-family: 'Jeju Hallasan';
    font-size: 3rem;
    color: #000;
`;

const MenuList = styled.ul`
    width: 600px;
    height: 50px;
    color: black;
    line-height: 50px; 
    margin: 0 auto;
    text-align: center;
`;

const MenuItem = styled.li`
    float: left;
    width: 140px;
    position: relative;
    cursor: pointer;
    color: #000;
    &:hover{
        border-bottom: 2px solid #000;
    }
`;

const SearchLogin = styled.div`
    height: 50px;
`;

const SearchImg = styled.div`
    vertical-align: middle;
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    line-height: 55px;
    margin-right: 10px;
    cursor: pointer;
`;

const LoginButton = styled.button`
    font-size: 1.25rem;
    border: 0;
    vertical-align: middle;
    height: 24px;
    background: none;
    line-height: 38px;
    cursor: pointer;
`;

const Modal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;  // 모달의 z-index를 높게 설정
`;

const ModalContent = styled.div`
    background-color: #fff;
    width: 1200px;
    height: 800px;
    padding: 15px;
    text-align: center;
`;
const ContentSearch = styled.div`
    width: 100%;
    height: 100px;
    margin-top: 30px;
`

const ContentInput = styled.input`
    width: 400px;
    height: 50px;
    border-radius: 30px;
    border: 0;
    background-color: #e7e7e7;
    font-size: 20px;
    padding-left: 30px;
`

const ContentSearchClose = styled.button`
    position: absolute;
    top: 9.5%;
    right: 15.8%;
    width: 64px;
    height: 64px;
    background-color: #f6921f;
    border-radius: 50px;
    border: 0;
    cursor: pointer;
`
const ContentsRecently = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 중앙 정렬 */
`
const RecentlyText = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
`
const ContentsBoxes = styled.div`
    display: flex;
    flex-wrap: wrap; /* 여러 줄로 나눠서 배치 */
    gap: 20px; /* 항목 간의 간격 */
`

const ContentsBox = styled.div`
    flex: 1 1 auto; /* 필요한 공간만 차지하도록 설정 */
    max-width: 200px; /* 최대 너비 설정 */
    display: flex; /* 내부 요소를 가로로 배치 */
    flex-direction: column; /* 내부 요소를 세로 방향으로 배치 */
    align-items: center; /* 중앙 정렬 */
    padding: 8px; /* 패딩 추가 */
    border: 1px solid #ddd; /* 테두리 추가 */
    border-radius: 4px; /* 모서리 둥글게 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    background-color: #fff; /* 배경 색상 */
    margin-bottom: 20px;
`;

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
    border-bottom: 1px solid #ddd; /* 이미지와 텍스트 구분을 위한 테두리 */
`;

const ProductImgName = styled.h2`
    font-size: 22px;
    color: #000;
    text-align: center;
    margin-top: 30px;
`;

const ProductImgCompany = styled.span`
    color: #909090;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default function Header() {
    const [modalOpen, setModalOpen] = useState(false); // 모달 창 열고 닫기
    const modalBackground = useRef(); // 모달 창 뒷배경 참조

    const modalClick = (e) => { 
        if (e.target === modalBackground.current) { // 함수 내부에서 클릭 된 대상이 동일한지 확인
            setModalOpen(false); // 맞다면 닫는다.
        }
    };  // 모달 창 배경을 클릭하면 모달 창이 닫히도록 하는 기능을 구현

    const [search, setSearch] = useState(''); // 검색 내용 받아오기
    const [brandData, setBrandData] = useState([]); // 데이터 저장하는 부분
    const [filterBrand, setFilterBrand] = useState([]); // 필터링 된 데이터 저장

    useEffect(() => {
        // 여러 JSON 파일에서 데이터를 가져오는 비동기 작업
        const jsonData = async () => {
            try {
                const res = await Promise.all([
                    axios.get('/db/brandsoju.json'),
                    axios.get('/db/brandbeer.json'),
                    axios.get('/db/brandliquor.json'),
                    axios.get('/db/brandmakgeolli.json'),
                    axios.get('/db/brandnew.json')
                ]);
                
                console.log(res);
                // 각 응답에서 데이터를 추출하여 병합
                const sojuData = res[0].data.soju;
                const beerData = res[1].data.beer;
                const liquorData = res[2].data.liquor;
                const makgeolliData = res[3].data.makgeolli;
                const newData = res[4].data.new;


                // 모든 데이터를 하나의 배열로 병합
                const mergeData = [
                    ...sojuData,
                    ...beerData,
                    ...liquorData,
                    ...makgeolliData,
                    ...newData
                ];

                // const mergeData = res.flatMap(response => 
                //     Object.values(response.data).flat()
                // );

                // 상태에 병합된 데이터 저장
                setBrandData(mergeData);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };

        jsonData();
    }, []);

     const searchChange = (e) => {
        const text = e.target.value;
        setSearch(text);

        if(text){
            // 입력 값에 따라 데이터를 필터링
            const filtered = brandData.filter((item) =>
                item.name && item.name.toLowerCase().includes(text.toLowerCase()) // 유효성 검사 및 대소문자 무시
            );
            setFilterBrand(filtered);
        } else {
            setFilterBrand([]);
        }
     }


    return (
        <Container>
            <Nav>
                <Link to='/' style={{ textDecoration: "none" }}>
                    <Logo>
                        대한민국 모든 주류
                    </Logo>
                </Link>
                <MenuList>
                    <MenuItem>
                        <Link to='/story' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Story
                        </Link>   
                    </MenuItem>
                    <MenuItem>
                        <Link to='/brand/soju' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Brand
                        </Link>   
                    </MenuItem>
                    <MenuItem>
                        <Link to='/company' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Company
                        </Link> 
                    </MenuItem>
                    <MenuItem>
                        <Link to='/guide' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Alcohol Guide
                        </Link> 
                    </MenuItem>
                </MenuList>
                <SearchLogin>
                    <SearchImg onClick={() => setModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                    </SearchImg>
                    <Link to='#' style={{ textDecoration: "none" }}>
                        <LoginButton>
                            Login
                        </LoginButton>
                    </Link>
                </SearchLogin>
            </Nav>
            {
                modalOpen &&
                    <Modal ref={modalBackground} onClick={modalClick} >
                        <ModalContent>
                            <ContentSearch>
                                <ContentInput type="text" placeholder="원하시는 상품 이름을 검색해주세요." value={search} onChange={searchChange}/>
                                <ContentSearchClose onClick={() => setModalOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 50 50"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path></svg>
                                </ContentSearchClose>
                            </ContentSearch>
                            <ContentsRecently>
                                <RecentlyText>최근 본 상품</RecentlyText>
                                <ContentsBoxes>
                                    <ContentsBox>1</ContentsBox>
                                    <ContentsBox>2</ContentsBox>
                                    <ContentsBox>3</ContentsBox>
                                    <ContentsBox>4</ContentsBox>
                                </ContentsBoxes>
                                <ContentsBoxes>
                                    {
                                        filterBrand.map((item) => (
                                            <ContentsBox key={item.id}>
                                                <ProductImg src={item.url} alt={item.name} />
                                                <ProductImgName>{item.name}</ProductImgName>
                                                <ProductImgCompany>{item.company}</ProductImgCompany>
                                                <ProductImgCompany>{item.new}</ProductImgCompany>
                                            </ContentsBox>
                                        ))
                                    }
                                </ContentsBoxes>
                            </ContentsRecently>
                        </ModalContent>
                    </Modal>
            }
        </Container>
    );
}
