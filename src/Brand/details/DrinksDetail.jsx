import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import Comments from "../comment/Comments";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const IntroduceTitle = styled.div`
    width: 295px;
    height: 75px;
    font-size: 48px;

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        font-size: 2.75rem;
    }
`;

const Outline = styled.div`
    width: calc(100% - 600px);
    height: 100%;
    margin: auto;
    margin-top: 160px;

    @media (max-width: 768px) {
        width: 90%;
        margin-top: 80px;
    }
`;
const Product = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 60px;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const ProductImg = styled.img`
    width: 300px;
    height: 350px;
    object-fit: contain;
`;
const ProductDiv = styled.div`
    width: 350px;
    height: 80px;

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;
const ProductImgTitle = styled.h1`
    font-size: 48px;
    margin-top: 90px;
    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;
const ProductImgCompany = styled.span`
    font-size: 20px;
    padding: 10px 0;
    display: flex;
    color: #909090;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const ProductContent = styled.div`
    width: 500px;
    height: 100px;
    display: flex;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
`;
const ProductCTS = styled.div`
    width: 150px;
    height: 60px;
    margin-right: 30px;
`;

const ProductCTitle = styled.h2`
    font-size: 24px;
    text-align: center;
`;

const ProductCSpan = styled.span`
    font-size: 18px;
    color: #909090;
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
`;

const Section = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 130px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin-top: 280px;
        padding: 0 20px;
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
`;
const SectionIntroduce = styled.div`
    width: calc(100% - 600px);
    height: 100%;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 160px;

    @media (max-width: 768px) {
        width: 90%;
        text-align: center;
    }
`;

const SectionTitle = styled.h2`
    font-size: 48px;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const SectionSpan = styled.span`
    font-size: 20px;
    margin-top: 60px;
    display: block;
    line-height: 1.4;
    white-space: pre-line;
`;

const Form = styled.form`
    width: calc(100% - 600px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto;
    margin-bottom: 160px;
    margin-top: 80px;

    @media (max-width: 768px) {
        width: 90%;
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
                        <SectionTitle>{alcoholItem.name}</SectionTitle>
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
