import React , {useEffect, useState}from 'react'
import "./Postcard.css"
import TextField from '@mui/material/TextField';
import {EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw , convertFromRaw} from 'draft-js';
import {updatePost} from "../store/editPost"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';
function Newpost() {

    const { state } = useLocation();
    const [postData, setPostData] = useState(state.post);
    const navigate=useNavigate();

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
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
    var image=`data:image/image/png;base64, ${Buffer.from(state.post.img.data).toString('base64')}`;
    const [category, setCategory] = React.useState('EUR');
    const handleChange = (event) => {
      setCategory(event.target.value);
    };

    const { loading,Response,userInfo} = useSelector((state) => state.user);
    console.log(Response)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(userActions.reset());
    },)

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(
     convertFromRaw(JSON.parse(state.post.postBody))
      ));

    
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = (convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(JSON.stringify(html))
        if(Response==="edit successful")
        {
            navigate("/profile")
        }
    }, [editorState, Response]);

    const sendPost = (e) =>{
        e.preventDefault();
        const bodyFormData = new FormData(e.target)
        bodyFormData.append("post",convertedContent)
        bodyFormData.append("authorName",userInfo.fname + " " +userInfo.lname)
        bodyFormData.append("id",state.post._id)
        // if(bodyFormData.get("image").name !==""){
        //   const config= {
        //       withCredentials: true,
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //     }; 
        //   // axios.post("http://localhost:5000/updatePostPicture",config).then((res)=>{
        //   // console.log(res)
        //   // })
        // }
        dispatch(updatePost(bodyFormData))
        console.log(bodyFormData.get('image'))     

   }


  return (

    <div className='newpost-container'>
       <form className='post-form' onSubmit={sendPost}>
            <button type='submit' name='submit' className='siginin-btn' disabled={loading}>submit</button>
            <button type='button' name='cancel' className='siginin-btn' onClick={()=>{navigate("/profile")}} >Cancel</button>
            <TextField fullWidth id="standard-basic" name="title" label="title" type="text" variant="standard" required 
                value={postData.title}
                onChange={handlePostChange}
            />
            <img src={image} style={{width:'150px', height:'150px'}}></img>
            <TextField fullWidth type="file" name="image" id="image" helperText="title image"/>
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
            stripPastedStyles={true}
            />

        </div>
    </div>
    
  )
}

export default Newpost