import React, { useEffect, useState } from "react";
import Axios from "axios";

const MovieItem = ({ it , getMovieApi}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localData, setLocalData] = useState(it.content);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const onEdit = (targetId) => {
    Axios.post("http://localhost:8080/edit",{
      id : it.id,
      title : it.title,
      grade : it.grade,
      content: localData,
    }).then(()=>{
      alert("수정완료");
      getMovieApi();
    })

  };

  const onRemove = (targetId) => {
    Axios.delete("http://localhost:8080/api/delete",{
      data : {
        id : it.id,
      }
    }).then(()=>{
      alert('삭제완료');
      getMovieApi();
    })

  };

  //수정취소
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalData(it.content);
  };

  //수정하기
  const handleEdit = () => {
    window.confirm('리뷰를 수정하시겠습니까?');
    onEdit(it.id);
    toggleIsEdit()
  };

  return (
    <div className="MovieItem">
      <div className="item-title">
        <span>{it.title}</span>
        <span className="item-date">
          작성일 : {new Date(it.date).toLocaleString()}
        </span>
      </div>
      <div className="item-content">
        {isEdit ? (
          <div>
            <textarea
              className="item-content-text"
              style={{ width: "98%" }}
              value={localData}
              onChange={(e) => setLocalData(e.target.value)}
            />
          </div>
        ) : (
          <div>
            {it.content}
            <br />
            평점 : {it.grade}
          </div>
        )}
      </div>
      <div className="item-button">
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        ) : (
          <>
            <button onClick={toggleIsEdit}>수정하기</button>
            <button onClick={onRemove}>삭제하기</button>
          </>
        )}
      </div>

    </div>
  );
};

export default MovieItem;
