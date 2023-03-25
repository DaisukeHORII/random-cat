import { useState, useEffect } from "react";
import { NextPage } from "next";
import styled from "@emotion/styled";

type CatImage = {
  id: string;
  url: string;
};

const IndexPage: NextPage = () => {
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCatImage = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://api.thecatapi.com/v1/images/search");
        const images = await res.json();
        console.log(images);
        setCatImage(images[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCatImage();
  }, []);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const images = await res.json();
      console.log(images);
      setCatImage(images[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoadingText isLoading={isLoading}>にゃうローディング</LoadingText>
      <ImageContainer>
        {catImage && (
          <CatImageElement
            src={catImage.url}
            alt="cat"
          />
        )}
        <ButtonContainer>
          <Button onClick={handleButtonClick}>もっと見る</Button>
        </ButtonContainer>
      </ImageContainer>
    </PageContainer>
  );
};

export default IndexPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const Button = styled.button`
  background-color: #ffcb6b;
  color: #333;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CatImageElement = styled.img`
  max-width: 50%;
  height: auto;
`;

const LoadingText = styled.p<{ isLoading: boolean }>`
  visibility: ${(props) => (props.isLoading ? "visible" : "hidden")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  color: #555;
  font-weight: bold;
`;
