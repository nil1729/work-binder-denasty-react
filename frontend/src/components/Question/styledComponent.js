import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const DraggableItem = styled.li`
  height: 50px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 7px;
  margin-bottom: 15px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.pageBackground};
  cursor: pointer;
`;
export const NumberColumn = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  user-select: none;
`;
export const IdColumn = styled.h2`
  font-family: $primary-font;
  text-align: right;
  font-weight: 600;
  font-size: 25px;
  color: ${(props) => props.theme.primaryColor};
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ThreeDots = styled.div`
  flex-basis: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
`;
export const BodyText = styled.div`
  margin-left: 20px;
  font-family: $primary-font;
  user-select: none;
`;
export const Icons = styled.div`
  height: 4.5px;
  width: 4.5px;
  background-color: rgba(128, 128, 128, 0.746);
  border-radius: 50%;
  margin-bottom: 3px;
`;
