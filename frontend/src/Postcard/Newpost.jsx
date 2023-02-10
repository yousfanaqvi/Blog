import React , {useEffect, useState}from 'react'
import "./Postcard.css"
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import {newPost} from "../store/Newpost"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

function Newpost() {

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
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(userActions.reset());
    }, [])
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );
       
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToRaw(editorState.getCurrentContent());
        setConvertedContent(JSON.stringify(html))
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
            <button type='button' name='cancel' className='siginin-btn'onClick={()=>{navigate("/profile")}} >Cancel</button>
            <TextField fullWidth id="standard-basic" name="title" label="title" type="text" variant="standard" required />
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
            placeholder="Write something!"
            stripPastedStyles={true}
            />

        </div>
    </div>
    
  )
}

export default Newpost