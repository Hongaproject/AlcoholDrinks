import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { githubProvider, googleProvider } from "../firebase";
import styled from "styled-components";
import { useUserContext } from "./Context/UserContext";

const Container = styled.div`
    height: 100vh; 
    width: 100vw; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d7ebfa;
`;

const LoginModal = styled.div`
    width: 450px;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F3F3F3; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    border-radius: 10px; 
    box-sizing: border-box;
`;

const Title = styled.h1`
    font-size: 48px;
`

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 80%;
    font-size: 16px;
    box-sizing: border-box;

    
    &[type="submit"] {
    cursor: pointer;
    background-color: #aab4c3;
        &:hover {
        opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
    margin-top: 10px;
`;

const Switcher = styled.span`
    margin-top: 20px;
    margin-bottom: 15px;
    a {
        color: #1d9bf0;
    }
`

const Button = styled.span`
    margin-top: 10px;
    background-color: white;
    font-weight: 500;
    width: 80%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #8aa1c2;

    &:hover {
        opacity: 0.8;
    }
`;
const Logo = styled.img`
    height: 25px;
`;

const SignupLink = styled.span`
    color: #000;
    padding: 15px 20px;

    &:hover {
        text-decoration: underline;
    }
`;


export default function Login() {
    
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {submitOauth, submitLogin, err, isLoading} = useUserContext(); // Context에서 로그인 및 OAuth 함수 가져오기
    
    const onChange = (e) => {
        const {name, value} = e.target;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }

    // 로그인 폼 제출 시 호출되는 함수 
    const onSubmit = async(e) => {  
        e.preventDefault();
        const user = await submitLogin(email, password);
        if(user){
            navigate('/');
        }
    }

    // OAuth 제공 로그인 시 호출되는 함수
    const onClick = async(provider) => {
        const user = await submitOauth(provider);
        if(user){
            navigate('/');
        }
    }

    return(
        <Container>
            <LoginModal>
                <Title>Login</Title>
                <Form onSubmit={onSubmit}>  
                    <Input type="email" placeholder="이메일을 입력해주세요." name="email" value={email} onChange={onChange} required />
                    <Input type="password" placeholder="비밀번호 6자 이상 입력해주세요." name="password" value={password} onChange={onChange} required />
                    <Input type="submit" value={isLoading ? "Loading..." : "Login"} />    
                </Form>
                {err !== "" ? <Error>{err}</Error> : null}
                <Switcher>
                    계정이 없으신가요? <Link to="/signup" style={{ textDecoration: "none" }}><SignupLink>회원가입</SignupLink></Link>
                </Switcher>
                <Button onClick={() => onClick(googleProvider)}>
                    <Logo /> 구글 로그인
                </Button>
                <Button onClick={() => onClick(githubProvider)}>
                    <Logo /> 깃허브 로그인
                </Button>
            </LoginModal>
        </Container>
    );
}