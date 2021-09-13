import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { img_url, movie_discover } from "../app/apis";
import { AppDispatch } from "../app/store";

import {
  getMovieId,
  GetRecommendsMovie,
  GetVideoClips,
} from "../features/movieSlice";
import noImage from "../img/noImage.png";
import { Link } from "react-router-dom";

interface args {
  original_title: string;
  title: string;
  backdrop_path: string;
  id: number;
}

function Movies({ idCategory, index }: { idCategory: number; index: number }) {
  const [movies, setMovies] = useState([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    const page: number = Math.floor(Math.random() * 3) + 1;
    const moviesUrl = `${movie_discover}api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${idCategory}&with_watch_monetization_types=flatrate`;

    const getMovies = async () => {
      fetch(moviesUrl)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          const saved = JSON.parse(sessionStorage.getItem("movies") || "");
          if (saved.length < 19)
            sessionStorage.setItem(
              "movies",
              JSON.stringify([...saved, data.results])
            );
        })
        .catch((err) => console.log(err));
    };

    const saved = JSON.parse(sessionStorage.getItem("movies") || "");

    if (saved.length < 19) {
      getMovies();
    } else {
      setMovies(saved[index]);
    }
  }, [idCategory, index]);

  const handleClick = (id: number): void => {
    dispatch(getMovieId(id));
    dispatch(GetVideoClips(id));
    dispatch(GetRecommendsMovie(id));
  };

  return (
    <Container>
      <Wrapper className="container">
        {movies.map((e: args) => (
          <Link 
            onClick={() => handleClick(e.id)} 
            to={`/movie/${e.id}`} 
            key={e.id}
            style={{color: "#fff", textDecoration: "none"}}
          >
            <Container2 >
              <Image
                src={e.backdrop_path ? img_url + e.backdrop_path : noImage}
                loading="lazy"
              />
              <Title>{e.title}</Title>
            </Container2>
          </Link>
        ))}
      </Wrapper>
    </Container>
  );
}

export default Movies;

var Container = styled.div`
    padding-bottom: 4rem;
    @media (max-width: 768px){
      padding-bottom: 2rem;
    }
  `,
  Container2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
    min-width: 435px;
    @media (max-width: 1025px) {
      
    }
    @media screen and (max-width: 768px) {
      min-width: 150px;
      border-radius: 1rem;
      gap: .4rem;
    }
  `,
  Wrapper = styled.div`
    display: flex;
    gap: 10px;
    overflow: auto;
    cursor: pointer;
    scrollbar-width: none;
    position: relative;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    &:empty {
      height: 200px;
    }
  `,
  Title = styled.p`
    font-size: 1rem;
    text-align: center;
    @media (max-width: 768px){
      font-size: .8rem;
    }
  `,
  Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    @media (max-width: 768px){
      height: 100px;
      border-radius: 10px;
    }
  `;
