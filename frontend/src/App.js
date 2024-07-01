import { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';

import axios from 'axios';
import './index.css';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import EditPost from './EditPost';


function App() {

  const [posts,setPosts]=useState([
  
]);


  const [search,setSearch]=useState('');
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState([]);
  const [searchResults,setSearchResults]=useState([]);
  const navigate= useNavigate();
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Axios GET request
        const response = await axios.get('http://localhost:3600/Posts');
        // Setting the state with the fetched data
        setPosts(response.data);
      } catch (err) {
        // Error handling
        console.error("Error fetching data:", err);
      }
    };
  
    fetchPosts();
  }, []);
  
  
  useEffect(()=>{
    try{
      const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
    setSearchResults(filteredResults.reverse()); }
    catch(err){
      console.log(err.message);
    }                                                                          
  
  },[posts,search])
  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id= posts.length ? posts[posts.length-1].id+1:1;
    const datetime= format(new Date(),'MMMM dd,yyyy');
    const newPost={id,title: postTitle,datetime,body:postBody};
    try{const response = await axios.post('http://localhost:3600/Posts',newPost);
    const allPosts=[...posts,response.data]
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');}
    catch (err) {
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else{
        console.log(`ERROR: ${err.message}`);
      }
      
    }
    
  }
  const handleDelete=async (id)=>{try{
    await axios.delete(`http://localhost:3600/Posts/${id}`)
    const removPost=posts.filter((post)=>post.id!==id)
    
    setPosts(removPost);
     navigate('/');}
     catch (err) {
        // Error handling
        console.error("Error fetching data:", err);
      }
  }
  const handleEdit=async (id)=>{
    const datetime= format(new Date(),'MMMM dd,yyyy');
    const updatedPost={id,title: editTitle,datetime,body:editBody};
    try {
     const response=await axios.put(`http://localhost:3600/Posts/${id}`,updatedPost)
    
     setPosts(posts.map(post => post.id==id ? {...response.data}: post ));
     setEditTitle('');
     setEditBody('');
     navigate('/');
    
  } catch (err) {
    console.error("Error fetching data:", err);

  }}
  
  return (
    <div className="App">
      <Header
       title="KING_SOCIALMEDIA" />
      <Nav 
        search={search}
        setSearch={setSearch}  />
      <Routes> <Route path='/' element={
      <Home 
      posts={searchResults}/>} />

      <Route path='post' >
      <Route index element={<NewPost handleSubmit={handleSubmit}
      postTitle={postTitle}
      setPostTitle={setPostTitle}
      postBody={postBody}
      setPostBody={setPostBody}
        
      />} />
      <Route path=':id' element={<PostPage posts={posts}  handleDelete={handleDelete}/>} />
      </Route>
      <Route path='/edit/:id' element={<EditPost  posts={posts} handleEdit={handleEdit} editBody={editBody} setEditBody={setEditBody} editTitle={editTitle} setEditTitle={setEditTitle} />}/>
      <Route path='about' element={<About />} />

      <Route path='*' element={<Missing />} />
      </Routes>
      
      <Footer />

      
    </div>
  );
}

export default App;
