import React, {  useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { clearErrors, getallPost,Comment } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";

const Body=()=>{
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated} =useSelector((state)=> state.user);
  const { loading, error, posts} = useSelector((state) => state.allposts);
  const [com, setComment] = useState("");
  const [postid, setpostid] = useState();

  const postComment = ()=> {
    if(!isAuthenticated){
      navigate('/login');
    }
 let myform= {
      comment : com,
      postID : postid,
    }
    dispatch(Comment(myform));
  }

const copytext=()=>{
  if(!isAuthenticated){
    navigate('/login');
  }
  let link=`http://localhost:3000/post/${postid}`;
  navigator.clipboard.writeText(link);
}

  useEffect(() => {
  
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getallPost());
  }, [dispatch, error]);

    return (
        <>
            <img src={require('../common/img/signin.jpg')}/>
            {posts &&
              posts.map((post) => (
                <>
                {post.images && post.images.map((image)=>(
                    <img src={image.url} />
                ))}
                 <input
                      type="text"
                      placeholder="Comment"
                      value={com}
                      onChange={(e) =>{
                        setComment(e.target.value);
                        setpostid(`${post._id}`);
                      } }
                    />
                  <button onClick={postComment} >Comment</button>
                  <button onClick={()=>{
                       setpostid(`${post._id}`);
                      copytext() ;
                  }} >Share</button>


                <p>{post.comment}
                {post._id}</p>
                </>
              ))}
            
        </>
       
    )
}

export default Body;