import { collection, getDocs, limit, orderBy, query, where, startAfter, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import styled from "styled-components";
import Text from "./Text";

const Container = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 80px;
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    @media (max-width: 768px) {
        margin-top: 80px;
    }
`;

const PaginationButton = styled.button`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const PageNumber = styled.span`
    font-size: 18px;
    margin: 0 10px;
`;

export default function Comments({ category, productId }) {
    
    const [texts, setTexts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastVisible, setLastVisible] = useState(null);
    const [totalPages, setTotalPages] = useState(1); 
    const textsPerPage = 10;

    // 전체 텍스트 개수 가져오는 함수
    const fetchTotalTextsCount = async () => {
        const textsQuery = query(
            collection(db, "texts"),
            where("productId", "==", productId),
            where("category", "==", category)
        );
        const snapshot = await getCountFromServer(textsQuery);
        return snapshot.data().count;
    };

    // 페이지를 따라 텍스트를 가져오는 함수
    const fetchTexts = async (page) => {
        if (!productId) return;
        
        let textsQuery = query(
            collection(db, "texts"),
            where("productId", "==", productId),
            where("category", "==", category),
            orderBy("createdAT", "asc"),
            limit(textsPerPage)
        );

        if (page > 1 && lastVisible) {
            textsQuery = query(textsQuery, startAfter(lastVisible));
        }

        const snapshot = await getDocs(textsQuery);
        const newTexts = snapshot.docs.map((doc) => {
            const { text, createdAT, username, userId } = doc.data();
            return {
                text, createdAT, username, userId, id: doc.id,
            };
        });
        
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setTexts(newTexts);
    };

    // 페이지와 관련된 데이터를 초기화하는 useEffect
    useEffect(() => {
        const initializePagination = async () => {
            const totalCount = await fetchTotalTextsCount();
            const calculatedTotalPages = Math.ceil(totalCount / textsPerPage);
            setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
            fetchTexts(currentPage);
        };
        initializePagination();
    }, [category, productId, currentPage]);

    // 이전 페이지로 이동하는 함수
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지로 이동하는 함수
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Container>
            {texts.map((text) => <Text key={text.id} {...text} />)}
            <PaginationControls>
                <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                    이전
                </PaginationButton>
                <PageNumber>{currentPage} / {totalPages}</PageNumber>
                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                    다음
                </PaginationButton>
            </PaginationControls>
        </Container>
    );
}
