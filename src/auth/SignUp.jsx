import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";  // firebase.js 파일에서 auth 가져오기
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import { useUserContext } from "./Context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const Container = styled.div`
    height: 100vh; 
    width: 100vw; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E3F2FD;
`;

const SignupModal = styled.div`
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

export default function SignUp() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();  
    const {submitSignUp, err, isLoading, setErr} = useUserContext(); // Context에서 회원가입 함수 가져옴

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    const checkEmailAvailability = async (email) => {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const checkNameAvailability = async (name) => {
        const q = query(collection(db, "users"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    // 회원가입 폼 제출 시 호출되는 함수
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        if (isLoading || name === "" || email === "" || password === "" || confirmPassword === "") return;

        if (password !== confirmPassword) {
            setErr("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (password.length < 6) {
            setErr("비밀번호는 6자 이상이어야 합니다.");
            return;
        }

        try {
            const emailExists = await checkEmailAvailability(email);
            if (emailExists) {
                setErr("이미 사용 중인 이메일입니다.");
                return;
            }

            const nameExists = await checkNameAvailability(name);
            if (nameExists) {
                setErr("이미 사용 중인 닉네임입니다.");
                return;
            }

            const user = await submitSignUp(name, email, password);
            if(user){
                navigate('/login');
            }
        } catch (error) {   
            setErr("회원가입 중 오류가 발생했습니다.");
        }

    }  

    return (
        <Container>
            <SignupModal>
                <Title>회원가입</Title>
                <Form onSubmit={onSubmit}>
                    <Input type="email" placeholder="이메일을 입력해주세요." name="email" value={email} onChange={onChange} required />
                    <Input type="password" placeholder="비밀번호 6자 이상 입력해주세요." name="password" value={password} onChange={onChange} required />
                    <Input type="password" placeholder="비밀번호 확인" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
                    <Input type="text" placeholder="닉네임을 입력해주세요." name="name" value={name} onChange={onChange} required />
                    <Input type="submit" value={isLoading ? "Loading..." : "회원가입"} />    
                </Form>
                {err !== "" ? <Error>{err}</Error> : null}
            </SignupModal>
        </Container>
    );
}
