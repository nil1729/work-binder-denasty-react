import React, { useState, useEffect } from 'react';
import {
	BlogContainer,
	PageTitle,
	BlogItemContainer,
	BlogItemImage,
	BlogItemTextContainer,
	BlogItemImageContainer,
	BlogItemTitle,
	BlogItemAuthor,
	BlogItemTextPara,
	BlogItemImageTextContainer,
	BlogItemImageText,
	BlogItemImageWrapper,
} from '../components/BlogDetails/StyledComponents';
import { connect } from 'react-redux';
import { addAlert } from '../store/actions/alerts';
import { getBlog } from '../store/actions/blogs';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import ReplyForm from './ReplyForm';

function Blog({ getBlog }) {
	const [blogFetching, setBlogFetching] = useState(true);
	const [blogData, setBlogData] = useState({});
	const { id } = useParams();
	const { title = '', user = {}, coverPhoto = {}, body = '' } = blogData;

	useEffect(() => {
		getBlog(id).then((data) => {
			setBlogFetching(false);
			setBlogData(data.data);
		});
	}, [id]);

	function extractContent(s) {
		return { __html: `${s}` };
	}

	const BlogItem = () => {
		return (
			<BlogItemContainer>
				<BlogItemTitle>{title}</BlogItemTitle>
				<BlogItemAuthor>
					by <span>{user.name}</span>
				</BlogItemAuthor>
				<BlogItemImageContainer>
					<BlogItemImageWrapper>
						<BlogItemImage src={coverPhoto.publicURL} />
					</BlogItemImageWrapper>
					<BlogItemImageTextContainer>
						<BlogItemImageText>{coverPhoto.fileId}</BlogItemImageText>
					</BlogItemImageTextContainer>
				</BlogItemImageContainer>
				<BlogItemTextContainer>
					<BlogItemTextPara dangerouslySetInnerHTML={extractContent(body)}></BlogItemTextPara>
				</BlogItemTextContainer>
			</BlogItemContainer>
		);
	};

	return (
		<BlogContainer>
			{blogFetching ? (
				<PageTitle>
					<CircularProgress size={60} />
				</PageTitle>
			) : (
				<BlogItem />
			)}
			{!blogFetching && (
				<BlogItemContainer>
					<ReplyForm blogId={blogData._id} />
				</BlogItemContainer>
			)}
		</BlogContainer>
	);
}

export default connect(null, { addAlert, getBlog })(Blog);
