import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const PostsContainer = styled.div`
  max-width: 900px;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: 95%;
    margin-top: 1.5rem;
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

export const DashBoardHeader = styled.div`
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  margin: 1.5rem;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
  }
`;

export const BlogItemContainer = styled.div`
  display: flex;
  height: 260px;
  margin: 20px 0px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    width: 95%;
  }
`;

export const BlogItemImage = styled.img`
  height: 100%;
  width: 100%;
`;

export const BlogItemTextContainer = styled.div`
  padding: 20px 30px;
  flex: 0.9;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    padding: 20px 15px;
  }
`;

export const BlogItemImageContainer = styled.div`
  flex: 0.8;
  height: 100%;
`;

export const BlogItemTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: black;
  font-family: "Nunito Sans", sans-serif;
  line-height: 30px;
  padding-right: 10px;
  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 27px;
  }
`;

export const BlogItemAuthor = styled.h6`
  font-size: 14px;
  font-weight: 300;
  color: #242629;
  opacity: 50%;
  font-family: "Nunito Sans", sans-serif;
  margin-bottom: 10px;
  span {
    color: #753eca;
  }
`;

export const ReadMoreBtn = styled(LinkR)`
  color: white;
  background-color: #753eca;
  font-family: "Nunito Sans", sans-serif;
  outline: none;
  box-shadow: none;
  padding: 9px 45px;
  text-decoration: none;
  font-size: 15px;
  border-radius: 25px;
`;

export const ReadMoreBtnContainer = styled.div`
  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const BlogItemTextPara = styled.h3`
  font-size: 16px;
  color: #646268;
  line-height: 20px;
  font-family: "Nunito Sans", sans-serif;
  @media (max-width: 600px) {
  }
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
export const LeftIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const RightIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
