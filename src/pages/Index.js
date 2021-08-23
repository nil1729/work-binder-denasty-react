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
				<FeatureBtn>trade calculator</FeatureBtn>
				<FeatureBtn>dynamic rankings</FeatureBtn>
				<FeatureBtn>tier builder tool</FeatureBtn>
				<FeatureBtn>dynasty articles</FeatureBtn>
			</FeatureBtnContainer>
		</HomeContainer>
	);
};

export default Home;
