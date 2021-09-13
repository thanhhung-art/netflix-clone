import styled from "styled-components";
import Categorys from "../components/Categorys";

function Home() {
    return (
        <>
            <Wrapper>
                <Header>
                    <Title>Movies</Title>
                    <Text>Categorys move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</Text>
                </Header>
                <Categorys />
            </Wrapper>
        </>
    )
}

export default Home;

var
Wrapper = styled.div`
    padding: 0 3rem;
    background-color: #282828;
    color: #fff;
    @media (max-width: 768px){
        padding: 0 1.5rem;
    }
`,
Header = styled.header`
    padding-top: 7rem;
    margin-bottom: 4rem;
    @media (max-width: 768px) {
        padding-top: 9rem;
    }
`,
Title = styled.h1`
    font-size: 3rem;
    margin-bottom: .5rem;
    @media (max-width: 768px){
        font-size: 2.5rem;
    }
`,
Text = styled.p`
    font-size: 1.3rem;
    max-width: 940px;
    @media (max-width: 768px){
        font-size: 1rem;
    }
`;
