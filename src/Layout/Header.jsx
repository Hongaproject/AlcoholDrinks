import styled from "styled-components";
import '../Font/Font.css'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUserContext } from "../auth/Context/UserContext";

const Container = styled.div`
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 10px 20px rgba(0, 0, 13, 0.07);
    position: relative;
    z-index: 1;
`;

const Nav = styled.div`
    width: 100%; 
    max-width: 1200px; 
    margin: 0 auto;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    z-index: 2;
    white-space: nowrap; 
`;

const Logo = styled.div`
    width: 100%; /* 너비를 %로 변경 */
    max-width: 360px; /* 최대 너비 설정 */
    height: 50px;
    font-family: 'Jeju Hallasan';
    font-size: 3rem; /* 기본 폰트 크기 */
    color: #000;

    @media (max-width: 768px) {
        font-size: 2rem; /* 작은 화면에서 폰트 크기 조정 */
        line-height: 50px;
    }
`;

const MenuList = styled.ul`
    flex: 1;
    max-width: 600px;
    height: auto; /* 자동 높이로 변경 */
    color: black;
    line-height: 50px;
    display: flex; /* flexbox로 변경 */
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 중앙 정렬 */
    list-style: none;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; /* 메뉴가 열릴 때만 보이게 설정 */
        flex-direction: column; /* 세로 방향으로 정렬 */
        position: absolute; /* 위치를 절대적으로 설정 */
        top: 100%; /* 네비게이션 바 아래로 배치 */
        left: 0;
        background: white; /* 배경 색상 설정 */
        width: 100%; /* 전체 너비 */
        z-index: 1; /* 다른 요소 위에 보이도록 설정 */
    }
`;

const MenuItem = styled.li`
    margin: 0 20px; /* 항목 사이의 간격 설정 */
    position: relative;
    cursor: pointer;
    color: #000;

    &::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: #000;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.3s ease;
    }

    ${(props) => props.active && `
        &::after {
            width: 80%;
        }
    `}

    @media (max-width: 768px) {
        margin: 10px 0; /* 모바일에서는 간격을 줄임 */
        text-align: center; /* 중앙 정렬 */
        &:hover {
            background-color: lightgray; /* 호버 시 연한 회색 배경 */
            transition: background-color 1s ease;
            border-radius: 15px
        }
    }
`;

const HamburgerButton = styled.div`
    display: none; /* 기본적으로 숨김 */
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: flex; /* 모바일에서 보여짐 */
        margin-left: 80px;
    }

    div {
        height: 3px;
        background: black;
        transition: all 0.3s ease;
    }
`;



const SearchLogin = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
`;

const SearchImg = styled.div`
    display: flex; 
    align-items: center;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;
`;

const LoginButton = styled.button`
    font-size: 1.25rem;
    border: 0;
    height: 24px;
    background: none;
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
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 1200px; /* 최대 너비 설정 */
    height: 800px;
    padding: 15px;
    text-align: center;
`;

const ContentSearch = styled.div`
    width: 100%;
    height: 100px;
    margin-top: 30px;
`;

const ContentInput = styled.input`
    width: 100%;
    max-width: 400px; /* 최대 너비 설정 */
    height: 50px;
    border-radius: 30px;
    border: 0;
    background-color: #e7e7e7;
    font-size: 20px;
    padding-left: 30px;
`;

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
`;

const ContentsRecently = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentsBoxes = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const ContentsBox = styled.div`
    flex: 1 1 auto;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    margin-bottom: 20px;
`;

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 100%;
    max-width: 210px; /* 최대 너비 설정 */
    height: 254px;
    object-fit: contain;
    border-bottom: 1px solid #ddd;
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

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const AvatarUpload = styled.label`
    width: 40px;
    overflow: hidden;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 50px;
    }
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
                

                // 상태에 병합된 데이터 저장
                setBrandData(mergeData);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };

        jsonData();
    }, []);

    // 검색 입력 값에 따라 데이터를 필터링하는 함수
    const searchChange = (e) => {
        const value = e.target.value.trim().toLowerCase();
        setSearch(value);

        // 입력 값이 존해하는 경우
        if(value){
            // 입력 값에 따라 데이터를 필터링
            const filtered = brandData.filter((item) => {
                const name = item.name ? item.name.toLowerCase() : ''; // 시작 부분이 입력 값과 일치하는지 확인
                // 입력 값으로 시작하는 항목만 필터링
                return name.startsWith(value);
            });
            setFilterBrand(filtered);
        } else {
            setFilterBrand([]);
        }
    }

    const {user} = useUserContext(); // Context에서 사용자 정보 가져옴

    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false); // 메뉴 열기 상태 관리

    const toggleMenu = () => {
        setIsOpen(!isOpen); // 메뉴 상태 토글
    };


    return (
        <Container>
            <Nav>
                <Link to='/' style={{ textDecoration: "none" }}>
                    <Logo>
                        대한민국 모든 주류
                    </Logo>
                </Link>
                <HamburgerButton onClick={toggleMenu}>
                    <div />
                    <div />
                    <div />
                </HamburgerButton>
                <MenuList isOpen={isOpen}>
                    <MenuItem active={location.pathname === '/story'}>
                        <Link to='/story' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Story
                        </Link>
                    </MenuItem>
                    <MenuItem active={location.pathname === '/brand/soju'}>
                        <Link to='/brand/soju' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Brand
                        </Link>
                    </MenuItem>
                    <MenuItem active={location.pathname === '/company'}>
                        <Link to='/company' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Company
                        </Link>
                    </MenuItem>
                    <MenuItem active={location.pathname === '/guide'}>
                        <Link to='/guide' style={{ textDecoration: "none", color: "#000", padding: "15px 20px" }}>
                            Guide
                        </Link>
                    </MenuItem>
                </MenuList>

                <SearchLogin>
                    <SearchImg onClick={() => setModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                    </SearchImg>
                    {
                        user ? (
                            <Link to='/profile' style={{ textDecoration: "none" }}>
                                <AvatarUpload>
                                {
                                    user.photoURL ? (
                                        <ProfileImage src={user.photoURL} alt="Profile" />
                                    ) : (
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                        </svg>
                                    )
                                }   
                                </AvatarUpload>
                        </Link>
                        ) : (
                            <Link to='/login' style={{ textDecoration: "none" }}>
                                <LoginButton>
                                    Login
                                </LoginButton>
                            </Link>
                        )
                    }
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
