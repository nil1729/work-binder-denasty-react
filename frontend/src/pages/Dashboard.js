import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAlert } from '../store/actions/alerts';
import { getAuthorOnlyBlogs } from '../store/actions/blogs';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import {
	PostsContainer,
	PageTitle,
	BlogItemContainer,
	BlogItemImage,
	BlogItemTextContainer,
	BlogItemImageContainer,
	BlogItemTitle,
	BlogItemAuthor,
	ReadMoreBtn,
	IconWrapper,
	LeftIcons,
	RightIcons,
	DashBoardHeader,
	BlogItemTextPara,
	DashBoardHeaderTitle,
	DashBoardTitle,
	ReadMoreBtnContainer,
} from '../components/Dashboard/styledComponents';

function extractContent(s) {
	var span = document.createElement('span');
	span.innerHTML = s;
	return span.textContent || span.innerText;
}

const BlogItem = ({ blogData }) => {
	return (
		<BlogItemContainer>
			<BlogItemImageContainer>
				{/* <BlogItemImage src={blogData.coverPhotoURL} /> */}
				<LazyLoadImage src={blogData.coverPhotoURL} width={'100%'} height={'100%'} effect='blur' />
			</BlogItemImageContainer>
			<BlogItemTextContainer>
				<BlogItemTitle>
					{blogData.title}
					<BlogItemAuthor>date</BlogItemAuthor>
				</BlogItemTitle>

				<IconWrapper>
					<LeftIcons>
						<FavoriteBorderIcon style={{ color: 'red', cursor: 'pointer' }} />
						<span style={{ marginRight: '15px' }}>13213</span>
						<TextsmsOutlinedIcon style={{ color: 'blue', cursor: 'pointer' }} />
						<span>13213</span>
					</LeftIcons>
					<RightIcons>
						<EditIcon
							style={{
								color: 'orange',
								cursor: 'pointer',
								marginRight: '15px',
							}}
						/>
						<DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
					</RightIcons>
				</IconWrapper>
			</BlogItemTextContainer>
		</BlogItemContainer>
	);
};

function Dashboard({ getAuthorOnlyBlogs }) {
	const [blogFetching, setBlogFetching] = useState(true);
	const [blogList, setBlogList] = useState([]);

	useEffect(() => {
		setBlogFetching(true);
		getAuthorOnlyBlogs()
			.then((data) => {
				setBlogFetching(false);
				setBlogList(data.data);
			})
			.catch((err) => {
				// window.location.reload();
			});
	}, []);

	return (
		<PostsContainer>
			<DashBoardHeader>
				<div>
					<DashBoardHeaderTitle>Hello User</DashBoardHeaderTitle>
					<BlogItemAuthor>how is today?</BlogItemAuthor>
				</div>
				<ReadMoreBtnContainer>
					<ReadMoreBtn to={`/Create_blog`}>Post</ReadMoreBtn>
				</ReadMoreBtnContainer>
			</DashBoardHeader>
			<div>
				<DashBoardTitle>Active Posts</DashBoardTitle>
			</div>

			{blogFetching ? (
				<PageTitle>
					<CircularProgress size={60} />
				</PageTitle>
			) : (
				blogList.map((item) => <BlogItem key={item.id} blogData={item} />)
			)}
		</PostsContainer>
	);
}

export default connect(null, { addAlert, getAuthorOnlyBlogs })(Dashboard);
