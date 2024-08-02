import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import styled from "styled-components";
import Text from "./Text";

const Container = styled.div`
    
`

export default function Comments () {
    const [texts, setTexts] = useState([]);
    const fetchTexts = async() => {
        const textsQuery = query(
            collection(db, "texts"),
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
    }, []);

    return(
        <Container>
            {texts.map((text) => <Text key={text.id} {...text} />)}
        </Container>
    )
}
