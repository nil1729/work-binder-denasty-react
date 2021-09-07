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
  BlogItemTextPara,
  BlogItemImageTextContainer,
  BlogItemImageText,
  BlogItemImageWrapper,
} from "../components/BlogDetails/StyledComponents";
import { connect } from "react-redux";
import { addAlert } from "../store/actions/alerts";
import { getBlog } from "../store/actions/blogs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReplyForm from "./ReplyForm";
function Blog({ getBlog }) {
  const [blogFetching, setBlogFetching] = useState(true);
  const [blogDatas, setBlogDatas] = useState({});
  const { id } = useParams();
  const { title = "", user = {}, coverPhoto = {}, body = "" } = blogDatas;
  console.log(id);
  useEffect(() => {
    getBlog(id).then((data) => {
      console.log(data.data.body);
      setBlogFetching(false);
      setBlogDatas(data.data);
    });
  }, [id]);

  function extractContent(s) {
    // var span = document.createElement("span");
    // // span.innerHTML = s;
    // span.dangerouslySetInnerHTML = { __html: s };
    // return span.textContent || span.innerHTML;
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
          {/* <LazyLoadImage
                src={coverPhoto.publicURL}
                width="100%"
                height="100%"
                effect="blur"
          /> */}
          <BlogItemImageTextContainer>
            <BlogItemImageText>{coverPhoto.fileId}</BlogItemImageText>
          </BlogItemImageTextContainer>
        </BlogItemImageContainer>
        <BlogItemTextContainer>
          <BlogItemTextPara
            dangerouslySetInnerHTML={extractContent(body)}
          ></BlogItemTextPara>
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
      <BlogItemContainer>
        <ReplyForm />
      </BlogItemContainer>
    </BlogContainer>
  );
}

export default connect(null, { addAlert, getBlog })(Blog);
