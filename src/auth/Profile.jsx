import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const Section = styled.div`
    
`
const UserImg = styled.label`
    
`

const User = styled.img`
    
`
const UserName = styled.h1`
    
`
const Store = styled.div`
    
`
const Comment = styled.div`
    
`
const LogOut = styled.div`
    cursor: pointer;
    margin-top: 30px;
`


export default function Profile () {
    
    const navigate = useNavigate();

    const Logout = () => {
        const ok = window.confirm("로그아웃을 하시겠습니까?");
        if(ok) {
            auth.signOut();
            navigate("/");
        }
    }
    return(
        <Container>
            <Link to='/' style={{ textDecoration: "none", color: "#000" }}>
                뒤로가기
            </Link>
            <LogOut onClick={Logout}>
                로그아웃
            </LogOut>
            <Section>
                <UserImg>
                    <User />
                </UserImg>
                <UserName></UserName>
                <Store></Store>
                <Comment></Comment>
            </Section>
        </Container>
    );
}