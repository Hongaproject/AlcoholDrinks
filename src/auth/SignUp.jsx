import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";  // firebase.js 파일에서 auth 가져오기
import { FirebaseError } from "firebase/app";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();  
    
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setIsLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/login');
        } catch (e) {
            if (e instanceof FirebaseError) {
                setErr(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>회원가입 🙌</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="이름을 입력해주세요." name="name" value={name} onChange={onChange} required />
                <input type="email" placeholder="이메일을 입력해주세요." name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="비밀번호 6자 이상 입력해주세요." name="password" value={password} onChange={onChange} required />
                <input type="submit" value={isLoading ? "Loading..." : "회원가입"} />    
            </form>
            {err !== "" ? <div>{err}</div> : null}
        </div>
    );
}
