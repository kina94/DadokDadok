import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../components/home/common/navbar/Navbar";
import Search from "../views/Search";
import Library from "../views/Library";
import HistoryContainer from "../views/HistoryContainer";
import Sidebar from "../components/home/common/sidebar/Sidebar";
import MobileNavbar from "../components/mobile/navbar/MobileNavbar";
import LoadingSpinner from "../common/utils/LoadingSpinner";
import MoveTop from "../components/home/common/move_top/MoveTop";
import { useDispatch, useSelector } from "react-redux";
import "../../src/views/Container.css";
import { getSavedBooksFromDB } from "../service/bookService";
import { isNewUser, setNewUserToDB } from "../service/userService";
import { onAuthChange } from "../service/authService";
import { setUser } from "../modules/user";
import { setSavedBooks } from "../modules/book";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.userReducer.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        const { uid, displayName, email } = user;
        const userInfo = { uid, displayName, email };
        // 새로운 유저인 경우 DB에 세팅
        isNewUser(uid) && setNewUserToDB(uid, userInfo);
        dispatch(setUser(userInfo));
      } else {
        navigate("/");
      }
    });
  }, []);

  const getSavedUserBooks = async () => {
    setIsLoading(true);
    const response = await getSavedBooksFromDB(user.uid);
    dispatch(setSavedBooks(response));
    setIsLoading(false);
  };

  useEffect(() => {
    getSavedUserBooks();
  }, [user.uid]);

  return (
    <section className="main">
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <Navbar />
      <Sidebar />
      {/* 수정필요 */}
      <MobileNavbar />
      <MoveTop />
      <section className="content">
        <Routes>
          <Route
            path="search/*"
            element={<Search setIsLoading={setIsLoading} />}
          />
          <Route path="library/*" element={<Library />} />
          <Route path="history/*" element={<HistoryContainer />} />
        </Routes>
      </section>
    </section>
  );
}

export default Home;
