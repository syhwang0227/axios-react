import React, { useCallback, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import axios from "axios";

const App = () => {
  const [postId, setPostId] = useState(1);

  const [post, setPost] = useState(null);

  const getPost = useCallback(() => {
    axios
    .get(`https://97b708f3-0a57-4af2-b116-1fbb0649187a.mock.pstmn.io/posts/1`)
    // .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    // .get(`https://jsonplaceholder.typicode.com/posffffts/${postId}`)

    .then((response) => {
      // console.log(response);
      if(response.status === 200){
        setPost(response.data);
      } else {
        alert("잘못된 데이터입니다.")
      }
    })
    .catch((error) => {
      // console.log(error)
      if(error.response.status === 404) {
        alert("페이지가 없습니다.");
      } else {
        alert("문제가 발생했습니다. 개발자에게 연락주세요.");
      }
    })

  }, [postId]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div>
      {post == null ? (
        <div>로딩 중...</div>
      ) : (
      <Card style={{ width: "18rem" }}>
        <Card.Header>Post 1 데이터</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{post.userId}</ListGroup.Item>
          <ListGroup.Item>{post.id}</ListGroup.Item>
          <ListGroup.Item>{post.title}</ListGroup.Item>
          <ListGroup.Item>{post.body}</ListGroup.Item>
          <ListGroup.Item>
            {post.comments.map((item, index) => (
              <Card style={{ width: '18rem' }} key={index}>
                <Card.Header>{item.email}</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>{item.body}</ListGroup.Item>
                </ListGroup>
              </Card>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      )}
      <button onClick={() => setPostId((prev) => prev + 1)}>다음글 보기</button>
    </div>
  );
}

export default App
