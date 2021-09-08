import React, { useState, useEffect } from "react";
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
} from "../components/Blog/StyledComponents";
import { connect } from "react-redux";
import { addAlert } from "../store/actions/alerts";
import { getAllBlogs } from "../store/actions/blogs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
        <BlogItemTitle>{blogData.title}</BlogItemTitle>
        <BlogItemAuthor>
          by <span>{blogData.author_detail.name}</span>
        </BlogItemAuthor>
        <BlogItemTextPara>{extractContent(blogData.preview)}</BlogItemTextPara>
        <ReadMoreBtnContainer>
          <ReadMoreBtn to={`/blogs/${blogData.previewId}`}>
            Read More
          </ReadMoreBtn>
        </ReadMoreBtnContainer>
      </BlogItemTextContainer>
    </BlogItemContainer>
  );
};

function Blog({ getAllBlogs }) {
  const [blogFetching, setBlogFetching] = useState(true);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    setBlogFetching(true);
    getAllBlogs()
      .then((data) => {
        console.log(data);
        setBlogFetching(false);
        setBlogList(data.data);
      })
      .catch((err) => {
        // window.location.reload();
      });
  }, []);

  return (
    <BlogContainer>
      <PageTitle>BLOG</PageTitle>
      {blogFetching ? (
        <PageTitle>
          <CircularProgress size={60} />
        </PageTitle>
      ) : (
        blogList.map((item) => <BlogItem key={item.id} blogData={item} />)
      )}
    </BlogContainer>
  );
}

export default connect(null, { addAlert, getAllBlogs })(Blog);
