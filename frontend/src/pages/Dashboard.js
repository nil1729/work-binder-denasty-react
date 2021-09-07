import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addAlert } from "../store/actions/alerts";
import { getAllBlogs } from "../store/actions/blogs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
  ReadMoreBtnContainer,
} from "../components/Dashboard/styledComponents";
import ReplyForm from "../components/Dashboard/ReplyForm";
function extractContent(s) {
  var span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent || span.innerText;
}

const BlogItem = ({ blogData }) => {
  return (
    <BlogItemContainer>
      <BlogItemImageContainer>
        {/* <BlogItemImage src={blogData.coverPhotoURL} /> */}
        <LazyLoadImage
          src={blogData.coverPhotoURL}
          width={"100%"}
          height={"100%"}
          effect="blur"
        />
      </BlogItemImageContainer>
      <BlogItemTextContainer>
        <BlogItemTitle>
          {blogData.title}
          <BlogItemAuthor>date</BlogItemAuthor>
        </BlogItemTitle>

        <IconWrapper>
          <LeftIcons>
            <FavoriteBorderIcon style={{ color: "red", cursor: "pointer" }} />
            <span style={{ marginRight: "15px" }}>13213</span>
            <TextsmsOutlinedIcon style={{ color: "blue", cursor: "pointer" }} />
            <span>13213</span>
          </LeftIcons>
          <RightIcons>
            <EditIcon
              style={{
                color: "orange",
                cursor: "pointer",
                marginRight: "15px",
              }}
            />
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
          </RightIcons>
        </IconWrapper>
      </BlogItemTextContainer>
    </BlogItemContainer>
  );
};

function Dashboard({ getAllBlogs }) {
  const [blogFetching, setBlogFetching] = useState(true);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    setBlogFetching(true);
    getAllBlogs()
      .then((data) => {
        setBlogFetching(false);
        setBlogList(data.data);
      })
      .catch((err) => {
        window.location.reload();
      });
  }, []);

  return (
    <div>
      <DashBoardHeader>
        <div>
          <h1 style={{ margin: "0" }}>Hello User</h1>
          <BlogItemAuthor>how is today?</BlogItemAuthor>
        </div>
        <ReadMoreBtnContainer>
          <ReadMoreBtn to={`/Create_blog`}>Post</ReadMoreBtn>
        </ReadMoreBtnContainer>
      </DashBoardHeader>
      <PostsContainer>
        <div>
          <h2 style={{ marin: "15px 0" }}>Active Posts</h2>
        </div>

        {blogFetching ? (
          <PageTitle>
            <CircularProgress size={60} />
          </PageTitle>
        ) : (
          blogList.map((item) => <BlogItem key={item.id} blogData={item} />)
        )}

        <div>
          <ReplyForm />
        </div>
      </PostsContainer>
    </div>
  );
}

export default connect(null, { addAlert, getAllBlogs })(Dashboard);
