import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import _ from "lodash";

const pageSize = 10;
const Posts = () => {
  const [posts, setPosts] = useState();
  const [paginatedPost, setPaginatedPost] = useState();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() =>{
      Axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(res=>{
          console.log(res.data);
          setPosts(res.data);
          setPaginatedPost(_(res.data).slice(0).take(pageSize).value());
      });
  }, []);

  const pageCount = posts ? Math.ceil(posts.length/pageSize):0;
  if (pageCount === 1) return null;
//   holding the page no. in array using lodash
  const pages = _.range(1, pageCount+1)
  const pagination=(pageNo)=>{
      setCurrentPage(pageNo);
      const startIndex = (pageNo - 1)*pageSize;
      const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
      setPaginatedPost(paginatedPost)
  }


    return <div>{
    !paginatedPost ? ("No Data Found") : (
        <table className='table'>
            <thead>
                <tr>
                    <th> ID</th>
                    <th>User ID</th>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    paginatedPost.map((post, index)=> 
                        <tr key={index}>
                            <td>{post.id}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td> 
                                <p className={post.completed? "btn btn-success" : "btn btn-danger"}>
                                    {post.completed? "Completed": "Pending" }</p>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )}
    
    
      <nav className='d-flex justify-content-center'>
      
          <ul className='pagination'>
                {
                    pages.map((page)=>(
                        
                    <li className='page-link' onClick={()=>pagination(page)}  >{page}</li>
                    ))
                }

          </ul>
          
      </nav>
      
     
        </div>;
  
};

export default Posts;