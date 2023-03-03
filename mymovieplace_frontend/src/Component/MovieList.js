import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";

const MovieList = () => {
  const [movieItem, setMovieItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1); //현재 페이지
  const [postPerPage] = useState(3); //페이지 당 포스트 개수
  //pagination
  const indexOfLast = page * postPerPage; //1 *5 =5 번 아이템
  const indexOfFirst = indexOfLast - postPerPage; //5-5=0번 아이템

  const getMovieApi = () => {
    Axios.get("http://localhost:8080/api/get").then((response) => {
      setMovieItem(response.data.reverse()); //최신순으로 정렬
    });
  };

  useEffect(() => {
    getMovieApi();
  }, [indexOfLast, indexOfFirst, page]);

  const getfiltered = (e) => {
    e.preventDefault();
    const filtered = movieItem.filter((item) =>
      item.title.includes(searchValue)
    );

    setMovieItem(filtered);
    setSearchValue("");
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div>
      <div className="item-head">
        <span>🎬 총 리뷰 수 : {movieItem.length}</span>
        <form className="search" onSubmit={getfiltered}>
          <input
            className="search-input"
            placeholder="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>

      {movieItem.slice(indexOfFirst, indexOfLast).map((it) => (
        <MovieItem it={it} key={it._id} getMovieApi={getMovieApi} />
      ))}

        <Pagination
          className="pagination"
          activePage={page}
          itemsCountPerPage={postPerPage}//페이지 당 포스트 개수
          totalItemsCount={movieItem.length} //전체 포스트 개수
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />

    </div>
  );
};

export default MovieList;
