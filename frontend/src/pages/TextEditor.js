import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUser } from '../store/actions/auth';
import checker from '../components/utils/checkFields';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from '../components/TextEditor/index.module.scss';
import { DropzoneArea } from 'material-ui-dropzone';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import { addAlert } from '../store/actions/alerts';
import { createNewBlog } from '../store/actions/blogs';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		fontFamily: 'Nunito Sans ',
		marginBottom: theme.spacing(8),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		fontFamily: 'Nunito Sans',
	},
	my_font: {
		fontFamily: 'Nunito Sans',
		letterSpacing: '0.3px',
		fontSize: '17px',
	},
	btn_container: {
		width: '100%',
		textAlign: 'center',
	},
	submit: {
		fontFamily: 'Nunito Sans',
		color: '#FFFFFF',
		fontSize: '18px',
		outline: 'none',
		cursor: 'pointer',
		background: '#753eca',
		border: 'none',
		borderRadius: '20px',
		marginTop: '1rem',
		padding: '8px 20px',
		fontWeight: '300',
		width: '35%',
		'&:hover': {
			background: '#5b30a0',
			transition: 'all 0.3s',
		},
	},
}));

const TextEditor = ({ addAlert, createNewBlog }) => {
	const history = useHistory();
	const classes = useStyles();
	//   const [array, setArray] = useState("");
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	const [convertedContent, setConvertedContent] = useState(null);
	// Set Login initials Form state
	const [submitted, setSubmitted] = useState(false);
	const [userInput, setUserInput] = useState({ blog_title: '' });
	const [wrongUserInput, setWrongUserInput] = useState({ email: false });
	const [attempt, setAttempt] = useState(0);
	const [coverPhoto, setCoverPhoto] = useState([]);

	// On change handler
	const onChange = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	// on submit handler
	const submitHandler = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		// Validate title
		if (!userInput.blog_title || userInput.blog_title.trim().length === 0) {
			addAlert('warning', 'Please add a Blog Title');
		}

		// validate blog body
		const blogBody = convertContentToHTML();
		if (!blogBody || blogBody.trim().length === 0 || blogBody.length < 100) {
			addAlert('warning', 'Please add a some text');
		}

		// validate cover photo
		const blogCoverPhoto = coverPhoto[0];
		if (!blogCoverPhoto) {
			addAlert('warning', 'Please add a cover photo');
		}

		// call redux action with data
		const isSuccess = await createNewBlog(userInput.blog_title, blogBody, blogCoverPhoto);
		if (isSuccess) {
			return history.push('/blogs');
		} else {
			setSubmitted(false);
		}
	};

	const handleEditorChange = (state) => {
		setEditorState(state);
	};

	const convertContentToHTML = () => {
		return convertToHTML(editorState.getCurrentContent());
	};

	const handleFiles = (files) => {
		setCoverPhoto(files);
	};

	return (
		<Container component='main' maxWidth='md'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography
					component='h1'
					variant='h5'
					style={{
						fontFamily: 'Nunito Sans',
						fontSize: '32px',
						color: '#753eca',
					}}
				>
					Create New Blog
				</Typography>
				<form className={classes.form} onSubmit={submitHandler}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='blog_title'
						label='Blog Title'
						disabled={submitted}
						name='blog_title'
						type='text'
						onChange={onChange}
						value={userInput.blog_title}
						autoFocus
						inputProps={{
							className: classes.my_font,
						}}
					/>
					<Editor
						editorState={editorState}
						onEditorStateChange={handleEditorChange}
						wrapperClassName={styles.wrapper_class}
						editorClassName={styles.editor_class}
						toolbarClassName={styles.toolbar_class}
					/>
					<DropzoneArea
						onChange={handleFiles}
						filesLimit={1}
						acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
						dropzoneText='Drag and Drop an Image'
						dropzoneParagraphClass='dropzone_text'
						Icon={AddPhotoAlternateOutlinedIcon}
					/>
					<div className={classes.btn_container}>
						<button
							type='submit'
							variant='contained'
							className={classes.submit}
							disabled={submitted}
						>
							{' '}
							{submitted ? 'Uploading ...' : 'Submit'}
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
};

export default connect(null, { addAlert, createNewBlog })(TextEditor);
