import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 180px;
    position: fixed;
    z-index: 1;
    margin-left: 65px;
`;
const TopBtn = styled.button`
    width: 64px;
    height: 64px;
    border-radius: 50px;
    cursor: pointer;
    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        bottom: 0;
        margin-left: 16px;
        margin-bottom: 16px;
    }
`;

const ServiceBtn = styled.button`
    width: 64px;
    height: 64px;
    border-radius: 50px;
    display: block;
    margin-top: 35px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: none;
    }
`;

export default function Sidebtn() {
    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Container>
            <TopBtn
                onClick={moveTop}
                aria-label="최상단으로 이동"
                role="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 8 8"
                >
                    <path fill="currentColor" d="M3.97 0L1 3h2v5h2V3h2z" />
                </svg>
            </TopBtn>
            <Link to={"/mail"}>
                <ServiceBtn aria-label="메일 보내기" role="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 32 32"
                    >
                        <path
                            fill="currentColor"
                            d="M26.07 3.996a2.974 2.974 0 0 0-.933.223h-.004c-.285.113-1.64.683-3.7 1.547l-7.382 3.109c-5.297 2.23-10.504 4.426-10.504 4.426l.062-.024s-.359.118-.734.375a2.03 2.03 0 0 0-.586.567c-.184.27-.332.683-.277 1.11c.09.722.558 1.155.894 1.394c.34.242.664.355.664.355h.008l4.883 1.645c.219.703 1.488 4.875 1.793 5.836c.18.574.355.933.574 1.207c.106.14.23.257.379.351a1.119 1.119 0 0 0 .246.106l-.05-.012c.015.004.027.016.038.02c.04.011.067.015.118.023c.773.234 1.394-.246 1.394-.246l.035-.028l2.883-2.625l4.832 3.707l.11.047c1.007.442 2.027.196 2.566-.238c.543-.437.754-.996.754-.996l.035-.09l3.734-19.129c.106-.472.133-.914.016-1.343a1.807 1.807 0 0 0-.781-1.047a1.872 1.872 0 0 0-1.067-.27m-.101 2.05c-.004.063.008.056-.02.177v.011l-3.699 18.93c-.016.027-.043.086-.117.145c-.078.062-.14.101-.465-.028l-5.91-4.531l-3.57 3.254l.75-4.79l9.656-9c.398-.37.265-.448.265-.448c.028-.454-.601-.133-.601-.133l-12.176 7.543l-.004-.02l-5.836-1.965v-.004l-.015-.003a.27.27 0 0 0 .03-.012l.032-.016l.031-.011s5.211-2.196 10.508-4.426c2.652-1.117 5.324-2.242 7.379-3.11a807.312 807.312 0 0 1 3.66-1.53c.082-.032.043-.032.102-.032z"
                        />
                    </svg>
                </ServiceBtn>
            </Link>
        </Container>
    );
}
