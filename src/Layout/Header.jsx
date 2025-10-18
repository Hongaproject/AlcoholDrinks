import styled from "styled-components";
import "../Font/Font.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../auth/Context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { device } from "../breakpoints";
import { FaUser } from "react-icons/fa";

const Container = styled.div`
    width: 100%;
    background: ${({ activePath }) =>
        activePath.startsWith("/story") ||
        activePath.startsWith("/brand") ||
        activePath.startsWith("/company") ||
        activePath.startsWith("/guide")
            ? "#344368"
            : "#ffffff"};
    box-shadow: 0px 10px 20px rgba(0, 0, 13, 0.07);
    position: relative;
    z-index: 1;
`;

const Nav = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    white-space: nowrap;

    box-sizing: border-box;
    padding: 0 40px;

    @media ${device.mobile} {
        height: auto;
        padding: 10px 0px;
        gap: 30px;
        justify-content: center;
        flex-wrap: nowrap;
    }
    @media ${device.tablet} {
        height: 80px;
        padding: 0 20px; /* ✅ 패딩을 주어도 너비가 100%를 초과하지 않습니다. */
    }

    @media ${device.laptop} {
        height: 100px;
        padding: 0 40px; /* ✅ 패딩을 주어도 너비가 100%를 초과하지 않습니다. */
    }
`;

const Logo = styled.div`
    width: 100%;
    max-width: 360px;
    height: 50px;
    font-family: "Jeju Hallasan";
    font-size: 3rem;
    color: ${({ activePath }) =>
        activePath.startsWith("/story") ||
        activePath.startsWith("/brand") ||
        activePath.startsWith("/company") ||
        activePath.startsWith("/guide")
            ? "#fff"
            : "#000"};

    @media ${device.mobile} {
        font-size: 1.75rem;
        line-height: 50px;
    }
    @media ${device.tablet} {
        font-size: 2.2rem; /* 👈 Tablet: Smaller font size */
        max-width: 250px;
        line-height: 50px;
    }
    @media ${device.laptop} {
        font-size: 2.5rem; /* 👈 Tablet: Smaller font size */
        max-width: 280px;
        line-height: 50px;
    }
`;
const LinkWrapper = styled(Link)`
    text-decoration: none;
    padding: 15px 20px;
    color: ${({ isMain }) => (isMain ? "#000" : "#fff")};

    @media ${device.tablet} {
        padding: 10px 15px; /* 👈 Tablet: Smaller padding */
        font-size: 0.95rem; /* 👈 Tablet: Slightly smaller text */
    }

    &:visited {
        color: ${({ isMain }) => (isMain ? "#000" : "#fff")};
    }
`;

const MenuList = styled.ul`
    flex: 1;
    width: 600px;
    height: auto;
    color: black;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    @media ${device.mobile} {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        align-items: center;
        display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
        border-top: 1px solid #ddd;
        z-index: 10;
        padding: 10px 0;
    }

    @media ${device.tablet} {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        align-items: center;
        display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
        border-top: 1px solid #ddd;
        z-index: 10;
        padding: 10px 0;
    }

    @media ${device.laptop} {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        align-items: center;
        display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
        border-top: 1px solid #ddd;
        z-index: 10;
        padding: 10px 0;
    }
`;

const MenuItem = styled.li`
    margin: 0 20px;
    position: relative;
    cursor: pointer;

    @media ${device.tablet} {
        margin: 0 10px; /* 👈 Tablet: Smaller margin between items */
    }

    &::after {
        content: "";
        display: block;
        width: 0;
        height: 2px;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.3s ease;
    }

    ${(props) =>
        props.active &&
        `
        &::after {
            width: 80%;
        }
    `}

    @media ${device.mobile} {
        margin: 10px 0;
        text-align: center;
        &:hover {
            background-color: lightgray;
            transition: background-color 1s ease;
            border-radius: 15px;
        }
    }

    @media ${device.tablet} {
        margin: 10px 0;
        text-align: center;
        font-size: 20px;
        &:hover {
            background-color: lightgray;
            transition: background-color 1s ease;
            border-radius: 15px;
        }
    }

    @media ${device.laptop} {
        margin: 10px 0;
        text-align: center;
        font-size: 24px; /* 👈 Tablet: Smaller font size */

        &:hover {
            background-color: lightgray;
            transition: background-color 1s ease;
            border-radius: 15px;
        }
    }
`;

// Nav의 오른쪽 끝 요소들을 묶어줄 새로운 Wrapper
const RightControls = styled.div`
    display: flex;
    align-items: center;
    gap: 12px; /* SearchLogin과 HamburgerButton 사이의 간격 */

    @media ${device.mobile} {
        gap: 12px; /* 모바일에서는 다시 원래대로 */
    }

    @media ${device.tablet} {
        gap: 8px;
    }
    @media ${device.laptop} {
        gap: 10px;
    }
`;

const HamburgerButton = styled.div`
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    cursor: pointer;

    @media ${device.mobile} {
        display: flex;
        order: 3;
        margin-left: 0;
    }

    @media ${device.tablet} {
        display: flex;
        order: 3;
        margin-left: 0;
    }

    @media ${device.laptop} {
        display: flex;
        order: 3;
        margin-left: 0;
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
    gap: 12px;

    @media ${device.tablet} {
        gap: 8px; /* 👈 Tablet: Reduce gap */
    }

    @media ${device.mobile} {
        order: 2;
    }
`;

const SearchImg = styled.div`
    display: flex;
    align-items: center;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;
    color: ${({ isMain }) => (isMain ? "#000" : "#fff")};

    @media ${device.tablet} {
        margin-right: 5px; /* 👈 Tablet: Reduce margin */
        svg {
            width: 22px;
            height: 22px;
        }
    }
`;

const LoginIcon = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ isMain }) => (isMain ? "#000" : "#fff")};

    svg {
        width: 24px;
        height: 24px;
    }

    @media ${device.tablet} {
        svg {
            width: 22px; /* 👈 Tablet: Slightly smaller icon */
            height: 22px;
        }
    }
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

    @media ${device.tablet} {
        width: 36px; /* 👈 Tablet: Smaller avatar */
        height: 36px;
    }
`;

const DefaultIcon = styled.div`
    color: ${({ isMain }) => (isMain ? "#000" : "#fff")};

    svg {
        width: 24px;
        height: 24px;
    }

    @media ${device.tablet} {
        svg {
            width: 22px; /* 👈 Tablet: Slightly smaller icon */
            height: 22px;
        }
    }
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
    max-width: 1200px;
    height: 800px;
    padding: 15px;
    text-align: center;
    border-radius: 20px;
    overflow-y: auto;

    @media ${device.mobile} {
        width: 90%;
        max-width: 400px;
        height: 60vh;
        padding: 20px;
        border-radius: 12px;
    }

    @media ${device.tablet} {
        max-width: 700px; /* 👈 Tablet: Adjust max width */
        height: 80vh; /* 👈 Tablet: Adjust height to viewport */
        padding: 15px;
    }
    @media ${device.laptop} {
        max-width: 700px; /* 👈 Tablet: Adjust max width */
        height: 80vh; /* 👈 Tablet: Adjust height to viewport */
        padding: 15px;
    }
`;

const ContentInput = styled.input`
    width: 100%;
    max-width: 400px;
    height: 50px;
    border-radius: 30px;
    border: 0;
    background-color: #e7e7e7;
    font-size: 20px;
    padding-left: 30px;

    @media ${device.mobile} {
        font-size: 16px;
        height: 45px;
        max-width: 280px;
    }

    @media ${device.tablet} {
        max-width: 350px; /* 👈 Tablet: Smaller max width */
        height: 45px;
        font-size: 18px;
    }

    @media ${device.laptop} {
        max-width: 350px; /* 👈 Tablet: Smaller max width */
        height: 45px;
        font-size: 18px;
    }
`;

const ContentSearch = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    @media ${device.mobile} {
        height: auto;
        margin-top: 10px;
    }

    @media ${device.tablet} {
        margin-top: 20px;
    }

    @media ${device.laptop} {
        margin-top: 20px;
    }
`;

const ContentSearchClose = styled.button`
    position: absolute;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #f6921f;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.mobile} {
        width: 36px;
        height: 36px;
        right: -5px;
        svg {
            width: 18px;
            height: 18px;
        }
    }

    @media ${device.tablet} {
        width: 40px; /* 👈 Tablet: Smaller button */
        height: 40px;
        right: 50px; /* 👈 Tablet: Adjust position relative to input */
        svg {
            width: 20px;
            height: 20px;
        }
    }

    @media ${device.laptop} {
        width: 40px; /* 👈 Tablet: Smaller button */
        height: 40px;
        right: 50px; /* 👈 Tablet: Adjust position relative to input */
        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

const ContentsRecently = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${device.mobile} {
        margin-top: 40px;
    }

    @media ${device.tablet} {
        margin-top: 30px;
    }

    @media ${device.laptop} {
        margin-top: 30px;
    }
`;

const ContentsBoxes = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    width: 100%;
    margin: 0 auto;

    @media ${device.mobile} {
        gap: 10px;
        max-width: 300px;
    }

    @media ${device.tablet} {
        gap: 15px; /* 👈 Tablet: Reduce gap */
        max-width: 650px; /* 👈 Tablet: Adjust max width for 3 items per row */
        justify-content: center; /* 👈 Tablet: Center items in modal */
    }

    @media ${device.laptop} {
        gap: 15px; /* 👈 Tablet: Reduce gap */
        max-width: 650px; /* 👈 Tablet: Adjust max width for 3 items per row */
        justify-content: center; /* 👈 Tablet: Center items in modal */
    }
`;

const ContentsBox = styled.div`
    flex: 1 1 auto;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 20px;

    @media ${device.mobile} {
        width: 130px;
        padding: 6px;
    }

    @media ${device.tablet} {
        width: calc(
            33.333% - 10px
        ); /* 👈 Tablet: 3 items per row with margin */
        min-width: 180px;
    }

    @media ${device.laptop} {
        width: calc(
            33.333% - 10px
        ); /* 👈 Tablet: 3 items per row with margin */
        min-width: 180px;
    }
`;

const ProductImg = styled.img`
    display: block;
    margin: auto;
    width: 210px;
    height: 254px;
    object-fit: contain;
    border-bottom: 1px solid #ddd;

    @media ${device.mobile} {
        width: 120px;
        height: 150px;
    }

    @media ${device.tablet} {
        width: 100%; /* 👈 Tablet: Full width of box */
        height: 180px; /* 👈 Tablet: Adjust height */
    }

    @media ${device.laptop} {
        width: 100%; /* 👈 Tablet: Full width of box */
        height: 180px; /* 👈 Tablet: Adjust height */
    }
`;

const ProductImgName = styled.h2`
    font-size: 22px;
    color: #000;
    text-align: center;
    margin-top: 30px;

    @media ${device.mobile} {
        font-size: 16px;
        margin-top: 20px;
    }

    @media ${device.tablet} {
        font-size: 18px; /* 👈 Tablet: Smaller font size */
        margin-top: 20px;
    }

    @media ${device.laptop} {
        font-size: 18px; /* 👈 Tablet: Smaller font size */
        margin-top: 20px;
    }
`;

const ProductImgCompany = styled.span`
    color: #909090;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
        font-size: 16px;
    }

    @media ${device.tablet} {
        font-size: 14px; /* 👈 Tablet: Smaller font size */
        padding: 10px 0;
    }

    @media ${device.laptop} {
        font-size: 14px; /* 👈 Tablet: Smaller font size */
        padding: 10px 0;
    }
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    @media ${device.tablet} {
        width: 36px;
        height: 36px;
    }
`;

export default function Header() {
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림 상태
    const modalBackground = useRef();
    const [search, setSearch] = useState(""); // 검색어 상태
    const [brandData, setBrandData] = useState([]); // Firestore 데이터 저장
    const [filterBrand, setFilterBrand] = useState([]); // 검색 결과 저장
    const { user } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // ✅ Firestore에서 모든 브랜드 데이터 가져오기
    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const docsSnapshot = await getDocs(
                    collection(db, "brandlistdata"),
                );
                let mergedData = [];

                docsSnapshot.forEach((docSnap) => {
                    const docId = docSnap.id.replace("brand", "").toLowerCase(); // soju, beer 등 카테고리 추출
                    const categoryData = docSnap.data().data[docId] || [];

                    const formattedData = categoryData.map((item) => ({
                        ...item,
                        category: docId, // ✅ 카테고리 추가
                    }));

                    mergedData = [...mergedData, ...formattedData];
                });

                setBrandData(mergedData);
            } catch (error) {
                console.error("❌ Firestore 데이터 불러오기 실패:", error);
            }
        };

        fetchBrandData();
    }, []);

    // ✅ 검색어 입력 시 필터링
    const searchChange = (e) => {
        const value = e.target.value.trim().toLowerCase();
        setSearch(value);

        if (value) {
            const filtered = brandData.filter((item) => {
                const name = item.name ? item.name.toLowerCase() : "";
                // ✅ brandnew 카테고리는 검색에서 제외
                return item.category !== "new" && name.startsWith(value);
            });
            setFilterBrand(filtered);
        } else {
            setFilterBrand([]);
        }
    };

    // ✅ 모달 클릭 시 닫기
    const modalClick = (e) => {
        if (e.target === modalBackground.current) {
            setModalOpen(false);
        }
    };

    // ✅ 햄버거 메뉴 토글
    const toggleMenu = () => setIsOpen(!isOpen);
    const handleMenuItemClick = () => setIsOpen(false);

    const isMainPage = location.pathname === "/";

    return (
        <Container activePath={location.pathname}>
            <Nav aria-label="주요 네비게이션">
                {/* 로고 */}
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Logo activePath={location.pathname}>
                        대한민국 모든 주류
                    </Logo>
                </Link>

                {/* 메뉴 리스트 */}
                <MenuList isOpen={isOpen}>
                    <MenuItem active={location.pathname.startsWith("/story")}>
                        <LinkWrapper
                            to="/story"
                            onClick={handleMenuItemClick}
                            isMain={isMainPage}
                            aria-current={
                                location.pathname === "/story"
                                    ? "page"
                                    : undefined
                            }
                        >
                            Story
                        </LinkWrapper>
                    </MenuItem>
                    <MenuItem active={location.pathname.startsWith("/brand")}>
                        <LinkWrapper
                            to="/brand/soju"
                            onClick={handleMenuItemClick}
                            isMain={isMainPage}
                            aria-current={
                                location.pathname === "/brand/soju"
                                    ? "page"
                                    : undefined
                            }
                        >
                            Brand
                        </LinkWrapper>
                    </MenuItem>
                    <MenuItem
                        active={
                            location.pathname.startsWith("/company") ||
                            location.pathname === "/shop"
                        }
                    >
                        <LinkWrapper
                            to="/company"
                            onClick={handleMenuItemClick}
                            isMain={isMainPage}
                            aria-current={
                                location.pathname.startsWith("/company") ||
                                location.pathname === "/shop"
                                    ? "page"
                                    : undefined
                            }
                        >
                            Company
                        </LinkWrapper>
                    </MenuItem>
                    <MenuItem active={location.pathname.startsWith("/guide")}>
                        <LinkWrapper
                            to="/guide"
                            onClick={handleMenuItemClick}
                            isMain={isMainPage}
                            aria-current={
                                location.pathname === "/guide"
                                    ? "page"
                                    : undefined
                            }
                        >
                            Guide
                        </LinkWrapper>
                    </MenuItem>
                </MenuList>

                <RightControls>
                    {/* 검색 및 로그인 */}
                    <SearchLogin>
                        <SearchImg
                            onClick={() => setModalOpen(true)}
                            aria-label="검색 모달 창 열기"
                            role="button"
                            isMain={isMainPage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                                />
                            </svg>
                        </SearchImg>

                        {user ? (
                            <Link
                                to="/profile"
                                style={{ textDecoration: "none" }}
                                aria-label="프로필"
                            >
                                <AvatarUpload>
                                    {user.photoURL ? (
                                        <ProfileImage
                                            src={user.photoURL}
                                            alt="프로필"
                                        />
                                    ) : (
                                        <DefaultIcon isMain={isMainPage}>
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                            </svg>
                                        </DefaultIcon>
                                    )}
                                </AvatarUpload>
                            </Link>
                        ) : (
                            <Link to="/login" aria-label="로그인 페이지로 이동">
                                <LoginIcon isMain={isMainPage}>
                                    <FaUser />
                                </LoginIcon>
                            </Link>
                        )}
                    </SearchLogin>

                    {/* 햄버거 메뉴 */}
                    <HamburgerButton
                        onClick={toggleMenu}
                        aria-label="메뉴 토글버튼"
                        aria-expanded={isOpen}
                        role="button"
                    >
                        <div />
                        <div />
                        <div />
                    </HamburgerButton>
                </RightControls>
            </Nav>

            {/* ✅ 검색 모달 */}
            {modalOpen && (
                <Modal
                    ref={modalBackground}
                    onClick={modalClick}
                    aria-modal="true"
                >
                    <ModalContent>
                        <ContentSearch>
                            <ContentInput
                                type="text"
                                placeholder="원하시는 상품 이름을 검색해주세요."
                                value={search}
                                onChange={searchChange}
                                aria-label="상품 검색"
                            />
                            <ContentSearchClose
                                onClick={() => setModalOpen(false)}
                                aria-label="검색 모달 창 닫기"
                                role="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 50 50"
                                >
                                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                                </svg>
                            </ContentSearchClose>
                        </ContentSearch>

                        {/* 검색 결과 */}
                        <ContentsRecently aria-label="검색한 상품">
                            <ContentsBoxes>
                                {filterBrand.map((item) => (
                                    <Link
                                        to={`/brand/detail/${item.category}/${item.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#000",
                                        }}
                                        key={item.id}
                                        aria-label={`${item.name}의 상세 페이지로 이동`}
                                        onClick={() => setModalOpen(false)}
                                    >
                                        <ContentsBox
                                            aria-label={`상품: ${item.name}`}
                                        >
                                            <ProductImg
                                                src={item.url}
                                                alt={item.name}
                                            />
                                            <ProductImgName>
                                                {item.name}
                                            </ProductImgName>
                                            <ProductImgCompany>
                                                {item.company}
                                            </ProductImgCompany>
                                        </ContentsBox>
                                    </Link>
                                ))}
                            </ContentsBoxes>
                        </ContentsRecently>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
}
