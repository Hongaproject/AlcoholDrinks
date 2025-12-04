import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../breakpoints";
import useCloudinaryImages from "../hooks/useCloudinaryImages";

const Container = styled.div`
    height: 180px;
    position: fixed;
    z-index: 1;
    margin-left: 0px;
`;

// 두 버튼에 동일하게 적용할 기본 이미지 스타일 (48x48)
const StyledButtonImage = styled.img`
    width: 48px;
    height: 48px;
    object-fit: contain;
    cursor: pointer;
    display: block; // block으로 설정하여 마진이 제대로 적용되도록 함

    @media ${device.mobile} {
        display: none;
    }
    @media ${device.tablet} {
        display: none;
    }
    @media ${device.laptop} {
        display: none;
    }
`;

// 메일 버튼 (순서가 첫 번째이므로 추가 마진 없음)
const MailImageButton = styled(StyledButtonImage)``;

// 최상단 이동 버튼 (순서가 두 번째이므로 기존 서비스 버튼의 마진을 적용)
const TopImageButton = styled(StyledButtonImage)`
    margin-top: 35px;
`;

export default function Sidebtn() {
    // imageSrc[0] = "mail_o4igxr", imageSrc[1] = "top_rnbo0g"
    const { imageSrc, loading, error } = useCloudinaryImages([
        "mail_o4igxr",
        "top_rnbo0g",
    ]);
    if (loading) return <p>이미지를 불러오는 중...</p>;
    if (error) return <p>에러: {error}</p>;

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Container>
            {/* 1. 메일 전송 버튼 (순서 반전 적용, imageSrc[0] 사용) */}
            <Link to={"/mail"}>
                {imageSrc[0] && (
                    <MailImageButton
                        src={imageSrc[0]}
                        alt="메일 보내기"
                        aria-label="메일 보내기"
                        role="button"
                    />
                )}
            </Link>

            {/* 2. 최상단 이동 버튼 (순서 반전 적용, imageSrc[1] 사용) */}
            {imageSrc[1] && (
                <TopImageButton
                    src={imageSrc[1]}
                    alt="최상단으로 이동"
                    onClick={moveTop}
                    aria-label="최상단으로 이동"
                    role="button"
                />
            )}
        </Container>
    );
}
