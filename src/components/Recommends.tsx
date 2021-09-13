import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { img_url } from "../app/apis";
import { AppDispatch, RootState } from "../app/store";
import { getMovieId } from "../features/movieSlice";
import noImage from "../img/noImage.png";

function Recommends() {
  const { recommends } = useSelector((state: RootState) => state.movie);
  const [shortRecommend, setShortRecommend] = useState(recommends.slice(0, 8));
  let currIndex: number = 8;
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const handleShowMore = () => {
    if (shortRecommend.length + 9 < recommends.length) {
      currIndex += 8;
      setShortRecommend(recommends.slice(0, currIndex));
    } else if (shortRecommend.length < recommends.length) {
      setShortRecommend(recommends);
    }
  };

  const handleShowLess = () => {
    currIndex = 8;
    setShortRecommend(recommends.slice(0, 8));
  };

  const handleClick = (idMovie: number): void => {
    dispatch(getMovieId(idMovie));
    setTimeout(() => history.push(`/movie/${idMovie}`));
  };

  return (
    <Wrapper>
      <NameComponent>More Like This</NameComponent>
      <Container>
        {shortRecommend.map(
          (e: { backdrop_path: string; title: string; id: number }) => (
            <WrapMovie onMouseDown={() => handleClick(e.id)} key={e.id}>
              <Image
                src={e.backdrop_path ? img_url + e.backdrop_path : noImage}
                loading="lazy"
              />
              <Title className="title">{e.title}</Title>
            </WrapMovie>
          )
        )}
      </Container>
      {recommends.length > shortRecommend.length ? (
        <Show onClick={handleShowMore}>Show more</Show>
      ) : (
        <Show onClick={handleShowLess}>Show less</Show>
      )}
    </Wrapper>
  );
}

export default Recommends;

var Wrapper = styled.div`
    padding: 2rem 5rem;
    @media (max-width: 768px){
      padding: 2rem 1.5rem;
    }
  `,
  NameComponent = styled.h2`
    color: #fff;
    font-size: 2rem;
    margin-bottom: 2rem;
    @media (max-width: 768px){
      margin-bottom: 1rem;
    }
  `,
  WrapMovie = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:hover .title {
      bottom: 0;
    }
  `,
  Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `,
  Image = styled.img`
    width: 420px;
    height: 250px;
    object-fit: cover;
    @media (max-width: 768px){
      width: 150px;
      height: 120px;
      border-radius: 10px;
    }
  `,
  Title = styled.p`
    color: #fff;
    position: absolute;
    bottom: -20px;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    text-align: center;
    padding: 2px 0;
    transition: all 0.2s;
    @media (max-width: 768px){
      font-size: .6rem;
      bottom: 0;
    }
  `,
  Show = styled.button`
    padding: 0.5rem 1rem;
    background-color: #000;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    display: block;
    margin: 0.5rem auto 0;
  `;
