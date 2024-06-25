import styled from "styled-components"
import '../Font/Font.css'

const Container = styled.div`
    width: 100%;
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
    position: sticky;
`

const Logo = styled.div`
    width: 360px;
    height: 50px;
    background-color: cadetblue;
    font-family: 'Jeju Hallasan';
    font-size: 3rem;
`

const MenuList = styled.ul`
    width:600px;
	height:50px;
	background: #ccc;
	color:black;
	line-height: 50px; 
	margin:0 auto;
	text-align: center;
`
const MenuItem = styled.li`
    float:left;
	width:140px;
	position:relative;
    cursor: pointer;
    &:hover{
        & > ul {
            display: block;
        }
    }
`
const MenuDrop = styled.ul`
    font-size: 1.25rem;
    display: none;
    position: absolute;
    background-color: skyblue;
    width: 130px;
`
const MenuItemDrop = styled.li`
    &:hover{
        background-color: coral;
        transition: ease 1s;
    }
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
                        <MenuDrop>
                            <MenuItemDrop>
                                1
                            </MenuItemDrop>
                            <MenuItemDrop>
                                2
                            </MenuItemDrop>
                        </MenuDrop>
                    </MenuItem>
                    <MenuItem>
                        Brand
                        <MenuDrop>
                            <MenuItemDrop>
                                1
                            </MenuItemDrop>
                            <MenuItemDrop>
                                2
                            </MenuItemDrop>
                        </MenuDrop>
                    </MenuItem>
                    <MenuItem>
                        Company
                        <MenuDrop>
                            <MenuItemDrop>
                                1
                            </MenuItemDrop>
                            <MenuItemDrop>
                                2
                            </MenuItemDrop>
                        </MenuDrop>
                    </MenuItem>
                    <MenuItem>
                        Alcohol Guide
                        <MenuDrop>
                            <MenuItemDrop>
                                1
                            </MenuItemDrop>
                            <MenuItemDrop>
                                2
                            </MenuItemDrop>
                        </MenuDrop>
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