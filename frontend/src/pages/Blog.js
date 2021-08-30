import React from 'react';
import {
	BlogContainer,
	PageTitle,
	BlogItemContainer,
	BlogItemImage,
	BlogItemTextContainer,
	BlogItemImageContainer,
	BlogItemTitle,
	BlogItemAuthor,
	ReadMoreBtn,
	BlogItemTextPara,
	ReadMoreBtnContainer,
} from '../components/Blog/StyledComponents';

const BlogItem = () => {
	return (
		<BlogItemContainer>
			<BlogItemImageContainer>
				<BlogItemImage src='https://images.ctfassets.net/59guugfpviax/3pXKlg1xSAf0zZw6XkaD6r/98f114dd7d99fa8a591a3241618adcd8/WhatsApp_Image_2020-04-07_at_16.49.45.jpeg?w=1400' />
			</BlogItemImageContainer>
			<BlogItemTextContainer>
				<BlogItemTitle>ALERT! KYLE SHANAHAN IS NOT A RB SAVIOR!</BlogItemTitle>
				<BlogItemAuthor>
					by <span>Mic Stulken</span>
				</BlogItemAuthor>
				<BlogItemTextPara>
					Kyle Shanahan has been lauded as a ground game savant and one of the greatest offensive
					minds in the NFL for the better part of the past decade. His success is most notably due
					to…
				</BlogItemTextPara>
				<ReadMoreBtnContainer>
					<ReadMoreBtn>Read More</ReadMoreBtn>
				</ReadMoreBtnContainer>
			</BlogItemTextContainer>
		</BlogItemContainer>
	);
};

export default function Blog() {
	return (
		<BlogContainer>
			<PageTitle>BLOG</PageTitle>
			{[1, 3, 4, 5, 1].map((it, index) => (
				<BlogItem key={index} />
			))}
		</BlogContainer>
	);
}
