import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { movie_detail_http, original_img_url } from "../app/apis";
import { RootState } from "../app/store";
import Recommends from "../components/Recommends";
import Videos from "../components/Videos";

type args = {
  backdrop_path: string;
  original_title: string;
  overview: string;
  genres: [];
  runtime: number;
  tagline: string;
  status: string;
  release_date: string;
  homepage: string;
}

function About() {
  const { id, recommends, movieClips } = useSelector((state: RootState) => state.movie);
  const [info, setInfo] = useState<args | null>(null);

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    const movie_url = `${movie_detail_http}/${id}?api_key=${key}&language=en-US`;

    const getInfo = async () => {
      fetch(movie_url)
        .then((res) => res.json())
        .then((data) => {
          setInfo(data);
          sessionStorage.setItem("movie",JSON.stringify(data));
        })
        .catch((err) => console.log(err));
    };
    //const saved = JSON.parse(sessionStorage.getItem("movie") || "");
    getInfo();
    
  },[id]);

  return (
    <>
    {info && (
      <Wrapper key={1}>
        <Header src={original_img_url + info?.backdrop_path}>
          <Background>
            <Title>{info.original_title}</Title>
            {info.tagline !== "" && (
              <Tagline><i>#{info.tagline}</i></Tagline>
            )}
            <Genres>
              {info.genres.map((e: {id: number; name: string}) => (
                <Genre>{e.name}</Genre>
              ))}
            </Genres>
            <Overview>{info.overview}</Overview>
            {info.runtime > 0 && (
              <Time> Time: {info.runtime} minutes</Time>
            )}
            {info.status === "Released" ? (
              <ReleaseDate>Released: {info.release_date}</ReleaseDate>
            ) : (
              <ReleaseDate>Release date: {info.release_date}</ReleaseDate>
            )}
            {info.homepage && (
              <Homepage rel="_blank" href={info.homepage}>Go to home page movie</Homepage>
            )}
          </Background>
        </Header>
        {movieClips.length > 0 && <Videos />}
        {recommends.length > 0 && <Recommends />}  
      </Wrapper>
      )}
    </>
  );
}

export default About;

var
Wrapper = styled.div`
  background-color: #333;
`,
Header = styled.section`
  height: 100vh;
  background: url(${({src}: {src: string}) => src}) no-repeat center;
  background-size: cover;
  transition: background .5s;
`,
Background = styled.div`
  position: absolute;
  width: 800px;
  height: 100vh;
  background: rgb(24, 24, 24);
  background: linear-gradient(
    90deg,
    rgba(24, 24, 24, 1),
    rgba(24, 24, 24, 0) 100%
  );
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 5rem;
  padding-bottom: 2rem;
  @media (max-width: 768px){
    width: 100vw;
    padding-left: 1rem;
    margin-top: 1rem;

  }
`,
Title = styled.h1`
  font-size: 3rem;
  @media (max-width: 768px){
    font-size: 1.2rem;
  }
`,
Tagline = styled.p`
  color: #b8aeae;
`,
Genres = styled.div`
  margin: 2rem 0;
  @media (max-width: 768px){
    margin: .5rem 0;
  }
`,
Genre = styled.span`
  margin-right: 1rem;
  color: #b8aeae;
`,
Overview = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 1rem;
  @media (max-width: 768px){
    font-size: .9rem;
    margin-bottom: .5rem;
  }
`,
Time = styled.p`
  margin-bottom: 1rem;
  @media (max-width: 768px){
    font-size: .8rem;
    margin-bottom: .5rem;
  }
`,
ReleaseDate = styled.p`
  margin-bottom: 1rem;
  @media (max-width: 768px){
    font-size: .8rem;
    margin-bottom: .5rem;
  }
`,
Homepage = styled.a`
  color: #5f5fca;
  text-decoration: none;
  @media (max-width: 768px){
    font-size: .8rem;
  } 
`;