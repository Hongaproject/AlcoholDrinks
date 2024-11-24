import styled from "styled-components";
import { auth, db } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    border: 1px solid rgba(20, 19, 19, 0.5);
    border-radius: 15px;
    width: calc(100% - 600px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto;

    @media (max-width: 768px) {
        width: 90%;
        grid-template-columns: 1fr;
        text-align: center;
    }
`;
const Column = styled.div`
    padding: 20px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;
const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;
const Button = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
`;

const SaveButton = styled(Button)`
    background-color: #1d9bf0;
`;

export default function Text({ username, text, userId, id }) {
    const [isEditMod, setIsEditMod] = useState(false);
    const [editText, setEditText] = useState(text);

    const user = auth.currentUser; // 인증된 사용자 정보

    // 텍스트 삭제 함수
    const onDelete = async () => {
        const ok = window.confirm("삭제 하시겠습니까?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "texts", id));
        } catch (err) {
            console.log(err);
        }
    };

    // 텍스트 수정 함수
    const onEdit = async () => {
        if (user?.uid !== userId) return;
        setIsEditMod(true);
    };

    // 텍스트 수정 취소 함수
    const onCancel = () => {
        setIsEditMod(false);
    };

    // 텍스트 저장 함수
    const onSave = async () => {
        if (user?.uid !== userId) return;
        try {
            const docRef = doc(db, "texts", id);
            await updateDoc(docRef, { text: editText });
            setIsEditMod(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Column>
                <Username aria-label="작성자 이름">{username}</Username>
                <Payload>
                    {isEditMod ? (
                        <>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                aria-label="텍스트 편집"
                            />
                        </>
                    ) : (
                        <p aria-live="polite">{text}</p>
                    )}
                </Payload>
                {user?.uid === userId ? (
                    <>
                        <Button onClick={onDelete} aria-label="텍스트 삭제">
                            Delete
                        </Button>
                        {isEditMod ? (
                            <>
                                <Button
                                    onClick={onCancel}
                                    aria-label="수정 취소"
                                >
                                    Cancle
                                </Button>
                                <SaveButton
                                    onClick={onSave}
                                    aria-label="수정 내용 저장"
                                >
                                    Save
                                </SaveButton>
                            </>
                        ) : (
                            <Button onClick={onEdit} aria-label="댓글 수정">
                                Edit
                            </Button>
                        )}
                    </>
                ) : null}
            </Column>
        </Container>
    );
}
