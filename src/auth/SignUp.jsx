import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // firebase.js 파일에서 auth 가져오기
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
    background-color: #e3f2fd;
`;

const SignupModal = styled.div`
    width: 450px;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    font-size: 48px;
`;

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
    const { submitSignUp, err, isLoading, setErr } = useUserContext(); // Context에서 회원가입 함수 가져옴

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
    };

    // 회원가입 폼 제출 시 호출되는 함수
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        if (
            isLoading ||
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        )
            return;

        if (password !== confirmPassword) {
            setErr("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (password.length < 6) {
            setErr("비밀번호는 6자 이상이어야 합니다.");
            return;
        }

        try {
            const user = await submitSignUp(name, email, password);
            if (user) {
                navigate("/login");
            }
        } catch (error) {
            setErr("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <Container>
            <SignupModal>
                <Title>회원가입</Title>
                <Form onSubmit={onSubmit} aria-label="회원가입 작성 폼">
                    <Input
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        aria-label="이메일 입력"
                    />
                    <Input
                        type="password"
                        placeholder="비밀번호 6자 이상 입력해주세요."
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        aria-label="비밀번호 입력"
                    />
                    <Input
                        type="password"
                        placeholder="비밀번호 확인"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        required
                        aria-label="비밀번호 확인"
                    />
                    <Input
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        aria-label="닉네임 입력"
                    />
                    <Input
                        type="submit"
                        value={isLoading ? "Loading..." : "회원가입"}
                        aria-label={isLoading ? "회원가입 진행 중" : "회원가입"}
                    />
                </Form>
                {err !== "" ? (
                    <Error role="alert" aria-label="assertive">
                        {err}
                    </Error>
                ) : null}
            </SignupModal>
        </Container>
    );
}
