
import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'


 export const Nav = styled.nav`
 background : #753ECA;
 height: 87px;
// margin-top : -80px;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 1rem;
 position: sticky;
 top : 0;
 z-index;10;

 @media screen and (max-width: 628px){
     transition: 0.8s all ease;
    
     border-radius:0 0 15px 15px;
 }
`
 export const NavbarContainer = styled.div`
 display: flex;
 justify-content: space-between;
 height: 88px;
 z-index: 1;
 width: 100%;
 padding: 0 24px;
 max-width: 1440px;
`

export const NavLogo = styled(LinkR)`
width :200px;
height : 100px;
justify-self: flex-start;
cursor: pointer;
display: flex;
align-items: center;
margin-left: 105px;
margin-bottom : 10px;
font-weight: bold;
text-decoration:none;
`
export const MobileIcon = styled.div`
display:none;

@media screen and (max-width: 628px) {
    display: block;
    position: absolute:
    top:0;
    right: 0;
    transform : translate(-100%, 60%);
    font-size : 1.8 rem;
    cursor: pointer;
    color : #2D3649;
    margin-bottom:18px;
    
}
`

export const NavMenu =styled.ul`
display:flex;
align-items: center;
list-style:none;
text-align:right;

@media screen and (max-width : 628px) {
    display:none;
}
`
export const NavItem = styled.li`
height: 21px;
`
export const NavLinks =styled (LinkS)`
color:#000;
display: flex;
align-items: right;
text-decoration: none;
padding: 10px;
margin-right : 50px;
height: 21px;
cursor: pointer;
font-family: 'Nunito Sans', sans-serif;
`
