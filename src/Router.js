import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import SignIn from './pages/SignIn/SignIn';
import Oath from './pages/SignIn/Oath';
import SignUp from './pages/SignUp/SignUp';
import Community from './pages/Community/Community';
import Post from './pages/Community/Post';
import MyPage from './pages/MyPage/MyPage';
import MyPageEditing from './pages/MyPage/MyPageEditing';
import Payment from './pages/Payment/Payment';
import PersonalTraining from './pages/PersonalTraining/PersonalTraining';
import PostDetail from './pages/Community/PostDetail';
import WriteCounsel from './pages/PersonalTraining/WriteCounsel';
import ChattingPage from './pages/PersonalTraining/ChattingPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/users/kakao-sign-in" element={<Oath />} />
        <Route path="/users/kakao-sign-up" element={<SignUp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/post" element={<Post />} />
        <Route path="/community/postdetail/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage-editing" element={<MyPageEditing />} />
        <Route path="/payment/:trainerId?" element={<Payment />} />
        <Route path="/personal-training" element={<PersonalTraining />} />
        <Route
          path="/personal-training/counsel/:id/:nickName/:emojiName"
          element={<WriteCounsel />}
        />
        <Route
          path="/personal-training/counsel/chatting/:id"
          element={<ChattingPage />}
        />
      </Routes>
      <Nav />
    </BrowserRouter>
  );
};

export default Router;
