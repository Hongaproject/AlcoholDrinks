import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";

const Container = styled.div`
    height: 100vh; 
    width: 100vw; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E3F2FD;
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
    a {
        color: #1d9bf0;
    }
`

export default function Login() {
    // Firebase를 사용해서 로그인 구현
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigator = useNavigate();
    
    const onChange = (e) => {
        const {name, value} = e.target;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async(e) => {  
        e.preventDefault();
        setErr("");
        if(isLoading || email === "" || password === "") return;
        try{
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigator('/');
        } catch(e){
            if(e instanceof FirebaseError){
                setErr(e.message);
            }
        } finally{
            setIsLoading(false);
        }
    }

    return(
        <Container>
            <LoginModal>
                <Title>Login 🙌</Title>
                <Form onSubmit={onSubmit}>
                    <Input type="email" placeholder="이메일을 입력해주세요." name="email" value={email} onChange={onChange} required />
                    <Input type="password" placeholder="비밀번호 6자 이상 입력해주세요." name="password" value={password} onChange={onChange} required />
                    <Input type="submit" value={isLoading ? "Loading..." : "Login"} />    
                </Form>
                {err !== "" ? <Error>{err}</Error> : null}
                <Switcher>
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </Switcher>
            </LoginModal>
        </Container>
    );
}