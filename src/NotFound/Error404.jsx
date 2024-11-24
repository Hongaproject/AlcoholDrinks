import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 4rem;
`;
const P = styled.p`
    font-size: 1rem;
    line-height: 1.4;
    margin-top: 30px;
`;

const Button = styled.button`
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    &:hover {
        background-color: #3a7cc2;
        transition: background-color 1s;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    }
`;

export default function Error404() {
    return (
        <Container>
            <Title>404 ERROR</Title>
            <P>
                페이지를 찾을 수 없습니다. <br />
                페이지의 주소를 잘못 입력하셨거나, <br />
                요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다
            </P>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button>홈으로 이동</Button>
            </Link>
        </Container>
    );
}
