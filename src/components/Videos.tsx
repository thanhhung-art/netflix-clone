import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../app/store";

type Clips = {
  key: string;
  id: number;
};

function Videos() {
  const { movieClips } = useSelector((state: RootState) => state.movie);

  return (
    <Container>
      <NameComponent>Video Clips</NameComponent>
      <FramesWrap>
        {movieClips.slice(0, 8).map((data: Clips, i: number) => (
          <Frame
            src={`https://youtube.com/embed/${data.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            key={i}
          ></Frame>
        ))}
      </FramesWrap>
    </Container>
  );
}

export default Videos;

var Container = styled.section`
    background: #333;
    padding: 3rem 5rem;
    @media (max-width: 768px){
      padding: 3rem 1.5rem;
    }
  `,
  NameComponent = styled.h2`
    color: #fff;
    margin-bottom: 2rem;
    font-size: 2rem;
    @media (max-width: 768px){
      margin-bottom: 1rem;
    }
  `,
  FramesWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @media (max-width: 768px){
      flex-direction: column;
    }
  `,
  Frame = styled.iframe`
    width: 420px;
    height: 250px;
    @media (max-width: 768px){
      width: 100%;
      height: 180px;
    }
  `;
