import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowMessage from "../components/home/common/alert/ShowMessage";
import SearchResult from "../components/home/contents/search/SearchResult";
import SearchInput from "../components/home/contents/search/SearchInput";
import animationData from "../assets/animation/72170-books.json";
import "./Container.css";
import { useDispatch, useSelector } from "react-redux";
import { callSearchBookApi } from "../service/bookService";
import { setSearchedBooks } from "../modules/book";
import { isEndOfPage } from "../common/utils/bookSearch";

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { "*": currentSearchQuery } = useParams();
  const user = useSelector((store) => store.userReducer.user);
  const { bookSearchResults: searchedBooks, searchParams } = useSelector(
    (store) => store.bookReducer
  );

  // 도서API 호출
  const getBookSearchResults = async () => {
    const response = await callSearchBookApi(searchParams);
    if (isEndOfPage(response)) {
      return alert("마지막 검색 결과입니다.");
    }
    dispatch(setSearchedBooks(response.data.documents));
  };

  //SearchParams의 page가 변경될 때마다 getBookSearchResults 요청
  //params를 로컬스토리지에 저장
  useEffect(() => {
    if (currentSearchQuery !== "") {
      getBookSearchResults();
      localStorage.setItem("params", JSON.stringify(searchParams));
    }
  }, [currentSearchQuery, searchParams.page]);

  //localstorage에 검색된 책 저장
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(searchedBooks));
  }, [searchedBooks]);

  //새로고침 및 탭 이동 시 서칭하던 스크롤이 있는 곳으로 이동
  useEffect(() => {
    const savedScroll = localStorage.getItem("scroll");
    document.querySelector(".content").scrollTo(0, savedScroll);
  }, [user.uid]);

  //뒤로가기 및 앞으로 가기 처리
  window.onpopstate = function () {
    navigate("/home/search");
  };

  return (
    <section className="search">
      <SearchInput />
      {currentSearchQuery === "" ? (
        <ShowMessage
          animationData={animationData}
          width="300px"
          height="300px"
          value="원하는 책을 검색하고 저장해보세요."
        />
      ) : (
        <SearchResult message={`'${currentSearchQuery}'에 대한 검색 결과`} />
      )}
    </section>
  );
}

export default Search;
