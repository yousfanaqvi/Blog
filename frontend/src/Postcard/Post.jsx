import React from 'react'
import { useLocation } from "react-router-dom";
import draftToMarkdown from 'draftjs-to-markdown';
import MarkdownPreview from "@uiw/react-markdown-preview";
import "./Postcard.css"
function Post() {
    const { state } = useLocation();
    console.log(JSON.parse(state.post.postBody))
    const title=state.post.title;
    const body=draftToMarkdown((JSON.parse(state.post.postBody)));
    var image=`data:image/image/png;base64, ${Buffer.from(state.post.img.data).toString('base64')}`;
  return (
    <div className='main-cont'>
      <img className='postBgimg'src={image}></img>
      <div className='post-container'>
      <h2>{title}</h2>
      <h6>Author:{state.post.author}</h6>
          <div className='post-body' data-color-mode="light">
              <MarkdownPreview source={body} className="newline" />
          </div>
      </div>
    </div>
  )
}

export default Post