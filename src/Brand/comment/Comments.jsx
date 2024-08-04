import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import styled from "styled-components";
import Text from "./Text";

const Container = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 80px;
`

export default function Comments ({category, productId}) {
    const [texts, setTexts] = useState([]);
    const fetchTexts = async() => {
        if(!productId) return;
        const textsQuery = query(
            collection(db, "texts"),
            where("productId", "==", productId),
            where("category", "==", category),
            orderBy("createdAT", "desc"),
            limit(10)
        );
        const spanshot = await getDocs(textsQuery);
        const texts = spanshot.docs.map((doc) => {
            const {text, createdAT, username, userId} = doc.data();
            return{
                text, createdAT, username, userId, id: doc.id,
            };
        });
        setTexts(texts);
    }

    useEffect(() => {
        fetchTexts();
    }, [category, productId]);

    return(
        <Container>
            {texts.map((text) => <Text key={text.id} {...text} />)}
        </Container>
    )
}
