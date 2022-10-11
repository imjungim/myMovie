import React, { useState } from "react";
import Axios from "axios";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    grade : 1,
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitReview = () => {
    if (data.title.length == "") {
      return alert("제목을 입력하세요");
    }
    if (data.content.length == "") {
      return alert("내용을 입력하세요");
    }

    Axios.post("http://localhost:8080/api/insert", {
      title: data.title,
      content: data.content,
      grade : data.grade,
    }).then(() => {
      alert("등록완료");
      document.location.href = '/'
    });

    setData({
      title: "",
      content: "",
      grade : 1,
    });

  };

  return (
    <form className="MovieForm" onSubmit={submitReview}>
      <div className="input-select">
        <input
          className="title-input"
          name="title"
          type="text"
          placeholder="Movie Title"
          value={data.title}
          onChange={getValue}
        />
        <select className="grade"
          name="grade"
          value={data.grade}
          onChange={getValue}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <textarea
        className="review"
        name="content"
        placeholder="Movie Review"
        value={data.content}
        onChange={getValue}
      />
      <button className="movie-button" >
        등록하기
      </button>
    </form>
  );
};

export default MovieForm;
