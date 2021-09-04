import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const BlogContainer = styled.div`
  width: 800px;
  margin: auto;
  margin-top: 3rem;
  @media (max-width: 600px) {
    width: 95%;
    margin-top: 1.5rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #753eca;
  }
`;

export const PageTitle = styled.h1`
  font-family: "Nunito Sans", sans-serif;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
  color: #753eca;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
  }
`;

export const BlogItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 2.2rem;
  flex-wrap: wrap;
  width: 90%;
  overflow: hidden;
  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
  }
`;

export const BlogItemImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const BlogItemTextContainer = styled.div`
  flex: 0.9;
  height: 100%;
  @media (max-width: 600px) {
  }
`;

export const BlogItemImageContainer = styled.div`
  flex: 0.8;
  height: 100%;
  width: 100%;
`;
export const BlogItemImageWrapper = styled.div`
  height: 500px;
`;

export const BlogItemTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;

  font-family: "Nunito Sans", sans-serif;
  line-height: 30px;
  @media (max-width: 600px) {
    font-size: 30px;
    line-height: 27px;
  }
`;

export const BlogItemAuthor = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: black;
  font-family: "Nunito Sans", sans-serif;
  margin-bottom: 10px;
  span {
    color: #753eca;
  }
`;

export const BlogItemTextPara = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #242629;
  line-height: 26px;
  font-family: "Nunito Sans", sans-serif;
  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
  h1 {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 26px;

    font-weight: 500;
  }
  h3 {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 500;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 23px;
    font-weight: 500;
    color: #242629;
  }
`;
export const BlogItemImageTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BlogItemImageText = styled.div`
  widdth: 80%;
  font-size: 15px;
  color: #242629;
  line-height: 26px;
  opacity: 40%;
  text-align: center;
  flex-wrap: wrap;
  margin: 10px auto;
  padding: 0 20px;
  font-family: "Nunito Sans", sans-serif;
`;
