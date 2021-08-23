import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const PPR_Container = styled.div`
	width: 800px;
	margin: auto;
	margin-top: 2rem;
	@media (max-width: 600px) {
		width: 95%;
		margin-top: 1.5rem;
	}
`;

export const PageTitle = styled.h2`
	font-family: 'Nunito Sans', sans-serif;
	font-size: 45px;
	font-weight: 500;
	text-align: center;
	color: #753eca;
	text-transform: uppercase;
	margin-bottom: 1rem;
	@media (max-width: 600px) {
		font-size: 40px;
	}
`;

export const TabBtnContainer = styled.div``;

export const TabBtn = styled.div`
	width: 100%;
	text-align: center;
	padding: 8px 0;
	font-size: 17px;
	border-radius: 20px;
	cursor: pointer;
	height: 100%;
`;
