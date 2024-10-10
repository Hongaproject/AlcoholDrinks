import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 200px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        margin-top: 100px;
    }
`;

const CC = styled.div`
    width: 100%;
    max-width: 1000px; /* 최대 너비를 설정 */
    height: 120px;
    margin-top: 40px;
    display: flex; /* 중앙 정렬을 위한 추가 */
    flex-direction: column; /* 중앙 정렬을 위한 추가 */
    align-items: center; /* 중앙 정렬을 위한 추가 */
    justify-content: center; /* 중앙 정렬을 위한 추가 */
`;

const Copyright = styled.h1`
    color: #fff;
    text-align: center;
    font-size: 32px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        font-size: 1.75rem;
    }
`;

const Communication = styled.div`
    width: 100%;
    max-width: 300px; /* 최대 너비를 설정 */
    height: 48px;
    display: flex;
    justify-content: space-between; /* 균등 간격을 위한 추가 */
`;

const Email = styled.div`
    margin-right: 40px;
`
const GitHub = styled.div`
    margin-right: 40px;
`
const Blog = styled.div`
    margin-right: 40px;
`

export default function Footer () {
    
    return(
        <Container>
            <CC>
                <Copyright>© 2024 홍성원 All Rights Reserved.</Copyright>
                <Communication>
                    <Link to='mailto:tkwlscjq99@gmail.com' target="_blank" rel="noopener noreferrer">
                        <Email><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#fff" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"/></svg></Email>
                    </Link>
                    <Link to='https://github.com/Hongaproject' target="_blank" rel="noopener noreferrer">
                        <GitHub><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#fff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg></GitHub>
                    </Link>
                    <Link to='https://velog.io/@hongga/posts' target="_blank" rel="noopener noreferrer">
                        <Blog><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path fill="#fff" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z"/></svg></Blog>
                    </Link>
                </Communication>
            </CC>
        </Container>
    );
}