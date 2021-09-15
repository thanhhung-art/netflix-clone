import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../app/store";
import { fetchCategories } from "../features/categorySlice";
import Movies from "./Movies";
import arrowLeft from "../img/pre.png";
import arrowRight from "../img/nxt.png";

function Categorys() {
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClickNext = (index: number): void => {
    const containers = document.getElementsByClassName("container");
    const containerWidth = containers[index].getBoundingClientRect().width;
    
    containers[index].scrollLeft += containerWidth;
  };

  const handleClickPrev = (index: number): void => {
    const containers = document.getElementsByClassName("container");
    const containerWidth = containers[index].getBoundingClientRect().width;
    
    containers[index].scrollLeft -= containerWidth;
  };

  return (
    <Container>
      {categories.map((e: { id: number; name: string }, i: number) => (
        <Wrapper key={e.id}>
          <Title>{e.name}</Title>
          <ArrowButton 
            left right={false}
            src={arrowLeft} 
            onClick={() => handleClickPrev(i)} 
          />
          <Movies idCategory={e.id} index={i}/>
          <ArrowButton 
            right left={false} 
            src={arrowRight} 
            onClick={() => handleClickNext(i)}/>
        </Wrapper>
      ))}
    </Container>
  );
}

export default Categorys;

interface ArrowArgs {
  left: boolean;
  right: boolean;
  src: string;
}

var Container = styled.div``,
  Wrapper = styled.div`
    position: relative;
  `,
  Title = styled.h2`
    margin-bottom: 1rem;
    @media (max-width: 768px){
      margin-bottom: .5rem;
      font-size: 1rem;
    }
  `,
  ArrowButton = styled.img<ArrowArgs>`
    position: absolute;
    left: ${(props) => props.left && "-40px"};
    right: ${(props) => props.right && "-40px"};
    width: 30px;
    height: 30px;
    object-fit: cover;
    z-index: 1;
    top: 50%;
    transform: translateY(-140%);
    cursor: pointer;
    opacity: 0;
    transition: opacity .2s;
    :hover {
        opacity: 1;
    };
    @media (max-width: 768px) {
      display: none;
    }
  `;
