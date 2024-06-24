import styled from "styled-components"
import '../Font/Font.css'



const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #e3e3e3;
`

const Nav = styled.div`
    width: calc(100% - 220px);
    margin: 0 auto;
    height: 100px;
    background-color: beige;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled.div`
    width: 360px;
    height: 50px;
    background-color: cadetblue;
    font-family: 'Jeju Hallasan';
    font-size: 3rem;
`


const MenuList = styled.ul`
    height: 50px;
    
`

const MenuItem = styled.li`
    height: 50px;
    background-color: coral;
    font-size: 1.25rem;
    line-height: 55px;
    padding: 0 50px;
    display: inline-block;
    
`


const SearchLogin = styled.div`
    background-color: aqua;
    height: 50px;
`

const SearchImg = styled.div`
    vertical-align: middle;
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    line-height: 55px;
`

const LoginButton = styled.button`
    font-size: 1.25rem;
    border: 0;
    vertical-align: middle;
    height: 24px;
    background: none;
    line-height: 38px;
`




export default function Header () {
    return(
        <Container>
            <Nav>
                <Logo>
                    대한민국 모든 주류
                </Logo>
                <MenuList>
                    <MenuItem>
                        Story
                    </MenuItem>
                    <MenuItem>
                        Brand
                    </MenuItem>
                    <MenuItem>
                        Company
                    </MenuItem>
                    <MenuItem>
                        Alcohol Guide
                    </MenuItem>
                </MenuList>
                <SearchLogin>
                    <SearchImg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                    </SearchImg>
                    <LoginButton>
                        Login
                    </LoginButton>
                </SearchLogin>
            </Nav>
        </Container>
    )
}