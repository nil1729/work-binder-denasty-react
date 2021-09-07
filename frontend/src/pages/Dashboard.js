import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAlert } from '../store/actions/alerts';
import { getAuthorOnlyBlogs, deleteBlogPost } from '../store/actions/blogs';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import {
	PostsContainer,
	IconWrapper,
	LeftIcons,
	RightIcons,
	DashBoardHeader,
	DashBoardHeaderTitle,
	DashBoardTitle,
	ReadMoreBtnContainer,
} from '../components/Dashboard/styledComponents';

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
} from '../components/Blog/StyledComponents';

function extractContent(s) {
	var span = document.createElement('span');
	span.innerHTML = s;
	return span.textContent || span.innerText;
}

const BlogItem = ({ blogData, deletePost }) => {
	return (
		<BlogItemContainer>
			<BlogItemImageContainer>
				{/* <BlogItemImage src={blogData.coverPhotoURL} /> */}
				<LazyLoadImage src={blogData.coverPhotoURL} width={'100%'} height={'100%'} effect='blur' />
			</BlogItemImageContainer>
			<BlogItemTextContainer>
				<BlogItemTitle>{blogData.title}</BlogItemTitle>
				<BlogItemAuthor>
					Published at <span>{moment(blogData.createdAt).format('Do MMM YYYY')}</span>
				</BlogItemAuthor>
				<BlogItemTextPara>{extractContent(blogData.preview)}</BlogItemTextPara>
				<ReadMoreBtnContainer>
					<ReadMoreBtn to={`/blogs/${blogData.previewId}`}>View</ReadMoreBtn>
					<IconWrapper>
						<CommentIcon color='primary' />
						<DeleteIcon
							color='error'
							style={{ marginLeft: '1.5rem' }}
							onClick={() => {
								deletePost(blogData.id);
							}}
						/>
					</IconWrapper>
				</ReadMoreBtnContainer>
			</BlogItemTextContainer>
		</BlogItemContainer>
	);
};

function Dashboard({ getAuthorOnlyBlogs, authState, deleteBlogPost }) {
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

	const deletePost = async (id) => {
		// remove the item from the current list of the App State
		// Then Call the redux to remove that item from the database
		/* await deleteBlogPost(id); */
		// Show a Alert to the user
	};

	return (
		<PostsContainer>
			<DashBoardHeader>
				<DashBoardHeaderTitle>
					Hello, {authState.user && authState.user.name.split(' ')[0]}
				</DashBoardHeaderTitle>
				<ReadMoreBtnContainer>
					<ReadMoreBtn to={`/Create_blog`}>Create New Post</ReadMoreBtn>
				</ReadMoreBtnContainer>
			</DashBoardHeader>
			<PageTitle>Active Posts</PageTitle>

			{blogFetching ? (
				<PageTitle>
					<CircularProgress size={60} />
				</PageTitle>
			) : (
				blogList.map((item) => <BlogItem key={item.id} blogData={item} deletePost={deletePost} />)
			)}
		</PostsContainer>
	);
}
const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
});
export default connect(mapStateToProps, { addAlert, getAuthorOnlyBlogs, deleteBlogPost })(
	Dashboard
);
