import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #d7ebfa;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 1200px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* 패딩과 보더를 포함한 전체 너비 계산 */
    font-size: 16px; /* 폰트 크기 지정 */
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 200px; /* 높이 설정 */
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* 패딩과 보더를 포함한 전체 너비 계산 */
    overflow: auto; /* 컨텐츠가 넘칠 경우 스크롤 */
    resize: none; /* 사용자가 크기를 조정하지 못하게 함 */
    font-size: 16px; /* 폰트 크기 지정 */
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

export default function ServiceMail() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            e.target,
            process.env.REACT_APP_EMAILJS_USER_ID
        )
        .then((result) => {
            alert('이메일 전송에 성공했습니다.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            })
        }, (error) => {
            alert('이메일 전송에 실패했습니다.');
        })
    }

    return (
        <Background>
            <Container>
                <Title>문의 사항 - 실제로 메일이 전송됩니다!</Title>
                <Form onSubmit={onSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="이름을 입력해주세요."
                        value={formData.name}
                        onChange={onChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해주세요."
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="폰 번호를 입력해주세요. 필수는 아닙니다."
                        value={formData.phone}
                        onChange={onChange}
                    />
                    <TextArea
                        name="message"
                        placeholder="메세지를 입력해주세요."
                        value={formData.message}
                        onChange={onChange}
                        required
                    />
                    <Button type="submit">Send</Button>
                </Form>
            </Container>
        </Background>
    );
}
