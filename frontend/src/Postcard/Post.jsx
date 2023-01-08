import React from 'react'
import { useLocation } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "./Postcard.css"
function Post() {
    const { state } = useLocation();
    const title=state.post.title;
    const body=state.post.postBody;
  return (
    <div className='post-container'>
    <img src={`data:image/image/png;base64, ${Buffer.from(state.post.img.data).toString('base64')}`} style={{width:'50%', height:'40%'}}></img>
    <h2>{title}</h2>
    <h6>Author:{state.post.author}</h6>
        <div className='post-body' data-color-mode="light">
            <MarkdownPreview source={body} />
        </div>
    </div>
  )
}

export default Post