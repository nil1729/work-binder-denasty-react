import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const HomeContainer = styled.div`
	width: 800px;
	margin: auto;
	text-align: center;
	margin-top: 1rem;
	@media (max-width: 600px) {
		width: 96%;
		margin-top: 1.5rem;
	}
`;

export const ImageContainer = styled.div``;

export const LogoImage = styled.img``;

export const PageTitle = styled.h2`
	font-family: 'Nunito Sans', sans-serif;
	font-size: 55px;
	font-weight: 500;
	text-align: center;
	color: #753eca;
	text-transform: uppercase;
	@media (max-width: 600px) {
		font-size: 40px;
	}
`;

export const PageBodyText = styled.p`
	font-size: 16px;
	margin-bottom: 20px;
	color: #8e7d7d;
	line-height: 20px;
	font-family: 'Nunito Sans', sans-serif;
	width: 80%;
	margin: 5px auto 2rem;
	line-height: 22px;
	@media (max-width: 600px) {
		width: 100%;
		margin: 8px auto 2rem;
	}
`;

export const FeatureBtn = styled(LinkR)`
	color: white;
	background-color: #753eca;
	font-family: 'Nunito Sans', sans-serif;
	outline: none;
	box-shadow: none;
	padding: 9px 45px;
	text-decoration: none;
	font-size: 15px;
	border-radius: 25px;
	display: block;
	text-transform: capitalize;
	margin: 10px auto;
	width: 35%;
	@media (max-width: 600px) {
		width: 60%;
		margin: 9px auto;
	}
`;

export const FeatureBtnContainer = styled.div`
	${'' /* display: fle */}
	@media (max-width: 600px) {
		text-align: center;
	}
`;
