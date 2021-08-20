import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const BlogContainer = styled.div`
	width: 800px;
	margin: auto;
	margin-top: 3rem;
	@media (max-width: 600px) {
		width: 95%;
		margin-top: 1.5rem;
	}
`;

export const PageTitle = styled.h1`
	font-family: 'Nunito Sans', sans-serif;
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
	justify-content: center;
	align-items: center;
	height: 260px;
	border-radius: 10px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	margin-bottom: 2.2rem;
	overflow: hidden;

	@media (max-width: 600px) {
		flex-direction: column;
		height: auto;
		width: 95%;
		margin: 0 auto 2.3rem;
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
	@media (max-width: 600px) {
		padding: 20px 30px 30px;
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
	font-family: 'Nunito Sans', sans-serif;
	line-height: 30px;
	@media (max-width: 600px) {
		font-size: 20px;
		line-height: 27px;
	}
`;

export const BlogItemAuthor = styled.h6`
	font-size: 14px;
	font-weight: 300;
	color: black;
	font-family: 'Nunito Sans', sans-serif;
	margin-bottom: 10px;
	span {
		color: #753eca;
	}
`;

export const ReadMoreBtn = styled(LinkR)`
	color: white;
	background-color: #753eca;
	font-family: 'Nunito Sans', sans-serif;
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

export const BlogItemTextPara = styled.p`
	font-size: 16px;
	margin-bottom: 20px;
	color: #646268;
	line-height: 20px;
	font-family: 'Nunito Sans', sans-serif;
	@media (max-width: 600px) {
		margin-bottom: 25px;
	}
`;
