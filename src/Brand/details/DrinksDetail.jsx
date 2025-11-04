import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import Comments from "../comment/Comments";
import { device } from "../../breakpoints";

const Container = styled.div`
    width: 100%;
    height: 100%;
    /* 배경이 컨테이너 크기에 맞춰져 있는지 확인 */
`;

const IntroduceTitle = styled.div`
    width: 100%;
    max-width: 1280px; /* 데스크톱 최대 너비 */
    height: 75px;
    font-size: 48px;
    margin: 0 auto;
    padding-left: 40px; /* 좌측 여백 추가 */
    box-sizing: border-box;

    @media ${device.laptop} {
        font-size: 44px;
        padding-left: 30px;
    }
    @media ${device.tablet} {
        /* 태블릿 이하에서는 중앙 정렬 */
        text-align: center;
        font-size: 38px;
        padding-left: 0;
        height: auto;
    }
    @media ${device.mobile} {
        font-size: 32px;
    }
`;

const Outline = styled.div`
    /* 중앙 정렬을 위해 calc 대신 max-width와 margin: auto 사용 */
    width: 100%;
    max-width: 1200px; /* 중앙 컨텐츠 영역 최대 너비 */
    height: 100%;
    margin: auto;
    margin-top: 160px;
    padding: 0 40px; /* 좌우 패딩으로 컨텐츠가 벽에 붙는 것 방지 */
    box-sizing: border-box;

    @media ${device.laptop} {
        max-width: 1000px;
        margin-top: 120px;
        padding: 0 30px;
    }
    @media ${device.tablet} {
        max-width: 700px;
        margin-top: 120px;
        padding: 0 20px;
    }
    @media ${device.mobile} {
        max-width: 450px;
        margin-top: 120px;
        padding: 0 15px;
    }
`;
const Product = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 60px;
    display: flex;
    gap: 80px; /* 이미지와 정보 사이 간격 */

    @media ${device.laptop} {
        gap: 40px;
        margin-top: 50px;
    }
    @media ${device.tablet} {
        /* 태블릿에서는 세로 방향으로 변경 */
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 40px;
    }
    @media ${device.mobile} {
        margin-top: 30px;
        gap: 20px;
    }
`;

const ProductImg = styled.img`
    width: 300px;
    height: 350px;
    object-fit: contain;

    @media ${device.laptop} {
        width: 250px;
        height: 300px;
    }
    @media ${device.tablet} {
        width: 200px;
        height: 250px;
    }
    @media ${device.mobile} {
        width: 210px;
        height: 240px;
    }
`;

const ProductDiv = styled.div`
    /* 고정 너비 350px 대신 flex 성질 부여 */
    width: 100%;
    flex-grow: 1; /* 남은 공간을 채우도록 함 */
    height: 80px;

    @media ${device.tablet} {
        width: 100%;
        text-align: center;
        height: auto;
    }
`;
const ProductImgTitle = styled.h1`
    font-size: 48px;
    margin-top: 90px;
    text-align: left; /* 데스크톱 기본 정렬 */

    @media ${device.laptop} {
        font-size: 40px;
        margin-top: 70px;
    }
    @media ${device.tablet} {
        font-size: 32px;
        margin-top: 20px;
        text-align: center;
    }
    @media ${device.mobile} {
        font-size: 24px;
        margin-top: 10px;
    }
`;
const ProductImgCompany = styled.span`
    font-size: 20px;
    padding: 10px 0;
    display: flex;
    color: #909090;
    margin-bottom: 30px;
    justify-content: flex-start; /* 데스크톱 기본 정렬 */

    @media ${device.laptop} {
        font-size: 18px;
    }
    @media ${device.tablet} {
        justify-content: center;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const ProductContent = styled.div`
    /* 고정 너비 500px 대신 유동적으로 변경 */
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap; /* 내용이 넘치면 줄바꿈 */

    @media ${device.tablet} {
        justify-content: center;
        align-items: center;
        height: auto;
        margin-top: 20px;
        gap: 10px; /* 모바일/태블릿에서 요소 간 간격 추가 */
    }
`;
const ProductCTS = styled.div`
    width: 150px;
    height: 60px;
    margin-right: 30px;

    @media ${device.laptop} {
        width: 130px;
        margin-right: 20px;
    }
    @media ${device.mobile} {
        width: 120px; /* 모바일에서 2열 배치 가능하도록 너비 조정 */
        margin-right: 10px;
        height: 50px;
    }
`;

const ProductCTitle = styled.h2`
    font-size: 24px;
    text-align: center;

    @media ${device.laptop} {
        font-size: 20px;
    }
    @media ${device.mobile} {
        font-size: 16px;
    }
`;

const ProductCSpan = styled.span`
    font-size: 18px;
    color: #909090;
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: center;

    @media ${device.laptop} {
        font-size: 16px;
    }
    @media ${device.mobile} {
        font-size: 14px;
        padding: 5px 0;
    }
`;

const Section = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 130px;
    box-sizing: border-box;

    @media ${device.laptop} {
        margin-top: 100px;
    }
    @media ${device.tablet} {
        /* 원본의 280px은 너무 크므로 80px로 조정 */
        margin-top: 80px;
    }
    @media ${device.mobile} {
        margin-top: 80px;
    }
`;

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

    @media ${device.laptop} {
        width: 200px;
        height: 70px;
        font-size: 28px;
    }
    @media ${device.mobile} {
        width: 180px;
        height: 60px;
        font-size: 24px;
    }
`;
const SectionIntroduce = styled.div`
    /* 중앙 정렬 및 유동 너비 */
    width: 100%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 160px;
    padding: 0 40px;
    box-sizing: border-box;

    @media ${device.laptop} {
        max-width: 900px;
        margin-top: 60px;
        margin-bottom: 120px;
        padding: 0 30px;
    }
    @media ${device.tablet} {
        max-width: 700px;
        margin-top: 40px;
        margin-bottom: 100px;
        text-align: center;
        padding: 0 20px;
    }
    @media ${device.mobile} {
        max-width: 450px;
        margin-top: 80px;
        margin-bottom: 0px;
        padding: 0 15px;
    }
`;

const SectionSpan = styled.span`
    font-size: 20px;
    margin-top: 60px;
    display: block;
    line-height: 1.4;
    white-space: pre-line;
    text-align: left; /* 텍스트는 항상 왼쪽 정렬 유지 (SectionIntroduce의 text-align: center를 덮음) */

    @media ${device.laptop} {
        font-size: 18px;
        margin-top: 40px;
    }
    @media ${device.mobile} {
        font-size: 16px;
        margin-top: 30px;
    }
`;

const Form = styled.form`
    /* 중앙 정렬 및 유동 너비 */
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto;
    margin-bottom: 160px;
    margin-top: 80px;
    padding: 0 40px;
    box-sizing: border-box;

    @media ${device.laptop} {
        max-width: 900px;
        margin-bottom: 120px;
        margin-top: 60px;
        padding: 0 30px;
    }
    @media ${device.tablet} {
        max-width: 700px;
        margin-bottom: 100px;
        margin-top: 40px;
        padding: 0 20px;
    }
    @media ${device.mobile} {
        max-width: 450px;
        margin-bottom: 80px;
        margin-top: 30px;
        padding: 0 15px;
    }
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: #000;
    border: 1px solid #000;
    resize: none;
    height: 100px; /* 높이 고정 */
    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;

export default function DrinksDetail() {
    const { category, id } = useParams(); // URL 매개변수에서 category, id 가져오기
    const [alcoholItem, setAlcoholItem] = useState(null); // 선택한 제품 데이터
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Firestore에서 단일 아이템 불러오기
    const fetchAlcoholItem = async () => {
        try {
            // ✅ 문서 참조
            const docRef = doc(db, "brandlistdata", `brand${category}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // ✅ 해당 카테고리 배열에서 해당 ID 아이템 찾기
                const items = docSnap.data().data[category];
                const foundItem = items.find(
                    (item) => item.id === parseInt(id, 10),
                );

                if (foundItem) {
                    setAlcoholItem(foundItem);
                } else {
                    console.error(
                        `❌ ${id}에 해당하는 제품을 찾을 수 없습니다.`,
                    );
                }
            } else {
                console.error(
                    `❌ Firestore에서 ${category} 문서를 찾을 수 없습니다.`,
                );
            }
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchAlcoholItem();
    }, [category, id]);

    // ✅ 상품평 텍스트 변경
    const onTextChange = (e) => {
        setText(e.target.value);
    };

    // ✅ 상품평 등록
    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            alert("로그인 후 이용하실 수 있습니다.");
            navigate("/login");
            return;
        }

        if (isLoading || text.trim() === "" || text.length > 100) return;

        try {
            setIsLoading(true);
            await addDoc(collection(db, "texts"), {
                text,
                createdAT: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
                productId: id,
                category,
            });
            setText(""); // 입력창 초기화
        } catch (err) {
            console.error("상품평 저장 오류:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // 이미지 에러 처리
    const imgError = (e) => {
        e.target.src = "/imgnone.png";
    };

    return (
        <Container>
            <Outline role="region" aria-labelledby="세부페이지">
                <IntroduceTitle id="세부페이지">세부페이지</IntroduceTitle>

                {alcoholItem ? (
                    <Product>
                        <ProductImg
                            src={alcoholItem.url}
                            alt={`${alcoholItem.name} 이미지`}
                            onError={imgError}
                        />
                        <ProductDiv>
                            <ProductImgTitle>
                                {alcoholItem.name}
                            </ProductImgTitle>
                            <ProductImgCompany>
                                {alcoholItem.company}
                            </ProductImgCompany>

                            <ProductContent>
                                <ProductCTS>
                                    <ProductCTitle>국가/지역</ProductCTitle>
                                    <ProductCSpan>
                                        {alcoholItem.country}
                                    </ProductCSpan>
                                </ProductCTS>
                                <ProductCTS>
                                    <ProductCTitle>스타일</ProductCTitle>
                                    <ProductCSpan>
                                        {alcoholItem.style}
                                    </ProductCSpan>
                                </ProductCTS>
                                <ProductCTS>
                                    <ProductCTitle>도수</ProductCTitle>
                                    <ProductCSpan>
                                        {alcoholItem.alcohol}
                                    </ProductCSpan>
                                </ProductCTS>
                                <ProductCTS>
                                    <ProductCTitle>용량</ProductCTitle>
                                    <ProductCSpan>
                                        {alcoholItem.netw}
                                    </ProductCSpan>
                                </ProductCTS>
                            </ProductContent>
                        </ProductDiv>
                    </Product>
                ) : (
                    <p role="status" aria-live="polite">
                        로딩 중...
                    </p>
                )}
            </Outline>

            <Section role="region" aria-labelledby="상품 설명">
                <SectionSub id="상품 설명">상품 설명</SectionSub>
                {alcoholItem ? (
                    <SectionIntroduce>
                        <SectionSpan>{alcoholItem.discription}</SectionSpan>
                    </SectionIntroduce>
                ) : (
                    <p role="status" aria-live="polite">
                        로딩 중...
                    </p>
                )}
            </Section>

            <Section role="region" aria-labelledby="상품평">
                <SectionSub id="상품평">상품평</SectionSub>
                {/* ✅ 기존 코멘트 컴포넌트 */}
                {alcoholItem && <Comments category={category} productId={id} />}
                <Form onSubmit={onSubmit} aria-label="상품평 작성 폼">
                    <TextArea
                        placeholder="100자 내외로 글을 작성해 주세요."
                        value={text}
                        onChange={onTextChange}
                        required
                        aria-label="상품평 작성"
                    />
                    <SubmitBtn
                        type="submit"
                        value={isLoading ? "...Loading" : "등록"}
                    />
                </Form>
            </Section>
        </Container>
    );
}
