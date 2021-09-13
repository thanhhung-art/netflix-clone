
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";


function Navbar() {
    return (
        <Container>
            <Container2>
                <Link to="/">
                    <Logo src={logo} />
                </Link>
                <Container3 className="wrapButtons">
                    <Title>UNLIMITED TV SHOW & MOVIES</Title>
                    <Button join={true}>JOIN NOW</Button>
                    <Button join={false}>SIGN IN</Button>
                </Container3>
            </Container2>
        </Container>
    )
}

export default Navbar;

var 
Container = styled.nav`
    position: fixed;
    width: 100vw;
    background: #101111;
    padding: .5rem 3rem;
    z-index: 999;
    @media (max-width: 768px){
        padding: .8rem 1.5rem;
    }
`,
Container2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px){
        gap: 10px;
    }
`,
Container3 = styled.div`
    @media (max-width: 768px){
        display: flex;
    }
`,
Logo = styled.img`
    height: 35px;
    object-fit: cover;
    @media (max-width: 768px){
        height: 25px;
}
`,
Title = styled.h2`
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    display: inline-block;
    margin-right: 1rem;
    @media (max-width: 768px) {
        display: none;
    }
`,
Button = styled.button<{join: boolean}>`
    padding: .5rem;
    background-color: ${props => props.join ? "#ec1818": "transparent"};
    border: ${props => props.join ? "none" : "1px solid #fff"};
    margin-right: ${props => props.join ? "1rem": "0"};
    color: #fff;
    cursor: pointer;
`;