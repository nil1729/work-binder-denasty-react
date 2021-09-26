import React, { useState } from 'react';
import Logo from '../images/logo-white-bg.svg';

// Styled Components
import {
	HomeContainer,
	ImageContainer,
	LogoImage,
	PageBodyText,
	PageTitle,
	FeatureBtn,
	FeatureBtnContainer,
} from '../components/Home/StyledComponents';

const Home = () => {
	return (
		<HomeContainer>
			<ImageContainer>
				<LogoImage src={Logo} />
			</ImageContainer>
			<PageTitle>dynasty tools</PageTitle>
			<PageBodyText>
				Introducing our cutting-edge, Dynasty Trade Calculator, Rankings and Tier Builder Tool.
				Created to help you dominate your dynasty fantasy football leagues.
			</PageBodyText>
			<FeatureBtnContainer>
				<FeatureBtn to='/trade_calculator'>trade calculator</FeatureBtn>
				<FeatureBtn to='/rankings'>dynamic rankings</FeatureBtn>
				<FeatureBtn to='/question'>tier builder tool</FeatureBtn>
				<FeatureBtn to='/blog'>dynasty articles</FeatureBtn>
			</FeatureBtnContainer>
		</HomeContainer>
	);
};

export default Home;
