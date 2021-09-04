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
} from "../components/BlogDetails/StyledComponents";
import { connect } from "react-redux";
import { addAlert } from "../store/actions/alerts";
import { getBlog } from "../store/actions/blogs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Blog({ getBlog }) {
  const [blogFetching, setBlogFetching] = useState(true);
  const [blogDatas, setBlogDatas] = useState({});
  const { id } = useParams();
  const { title = "", user = {}, coverPhoto = {}, body = "" } = blogDatas;
  console.log(id);
  useEffect(() => {
    getBlog(id).then((data) => {
      console.log(data);
      setBlogFetching(false);
      setBlogDatas(data.data);
    });
  }, [id]);

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  const BlogItem = () => {
    return (
      <BlogItemContainer>
        <BlogItemTitle>{title}</BlogItemTitle>
        <BlogItemAuthor>
          by <span>{user.name}</span>
        </BlogItemAuthor>
        <BlogItemImageContainer>
          <BlogItemImage src={coverPhoto.publicURL} />
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
          <BlogItemTextPara>{extractContent(body)}</BlogItemTextPara>
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
        // blogList.map((item) => <BlogItem key={item.id} blogData={item} />)
        // <BlogItem blogData={blogList}/>
      )}
    </BlogContainer>
  );
}

export default connect(null, { addAlert, getBlog })(Blog);
