import React , {useEffect, useState}from 'react'
import "./Postcard.css"
import TextField from '@mui/material/TextField';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import {newPost} from "../store/Newpost"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { convertFromRaw } from 'draft-js';

import "./Postcard.css"
    
function Newpost() {

    const { state } = useLocation();
    const title=state.post.title;
    console.log(state.post.postBody)
    const [postData, setPostData] = useState(state.post);

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    console.log(postData)
    const categories = [
        {
        value: 'lifestyle',
        label: 'lifestyle',
        },
        {
        value: 'fashion',
        label: 'fashion',
        },
        {
        value: 'travel',
        label: 'travel',
        },
        {
        value: 'food',
        label: 'food',
        },
        ,
        {
        value: 'science',
        label: 'science',
        },
        ,
        {
        value: 'health',
        label: 'health',
        },
    ];

    const [category, setCategory] = React.useState('EUR');
    const handleChange = (event) => {
      setCategory(event.target.value);
    };

    let navigate=useNavigate();
    const { loading,Response,userInfo} = useSelector((state) => state.user);
    console.log(loading)
    console.log(Response)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(userActions.reset());
    }, [])
    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(<p>my text</p>))));

       
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(html)
        if(Response==="post successful")
        {
            navigate("/profile")
        }
    
    }, [editorState, Response]);

    const sendPost = (e) =>{
        e.preventDefault();
        const bodyFormData = new FormData(e.target)
        bodyFormData.append("post",convertedContent)
        bodyFormData.append("authorName",userInfo.fname + " " +userInfo.lname)
        dispatch(newPost(bodyFormData))

   }


  return (

    <div className='newpost-container'>
       <form className='post-form' onSubmit={sendPost}>
            <button type='submit' name='submit' className='siginin-btn' disabled={loading}>submit</button>
            <TextField fullWidth id="standard-basic" name="title" label="title" type="text" variant="standard" required 
                value={postData.title}
                onChange={handlePostChange}
            />
            <TextField fullWidth type="file" name="image" id="image" helperText="title image" required/>
            <TextField fullWidth
              select
              value={category}
              name="category"
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select one category"
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
       </form>
       {loading ?
      <div className='loading-div'><Loading/></div>
        :null}
       <div className='editor-div'>
        <Editor         
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"

            />

        </div>
    </div>
    
  )
}

export default Newpost