import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

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

    const onSubmit = async(e) => { // 사용자가 form이용하면 이때 작성해놓은 함수를 실행시킨다. 
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
        <div>
            <h1>Login 🙌</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="이메일을 입력해주세요." name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="비밀번호 6자 이상 입력해주세요." name="password" value={password} onChange={onChange} required />
                <input type="submit" value={isLoading ? "Loading..." : "Login"} />    
            </form>
            {err !== "" ? <div>{err}</div> : null}
            <div>
                계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </div>
        </div>
    );
}