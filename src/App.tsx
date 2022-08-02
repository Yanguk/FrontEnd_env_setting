import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Test from './components/Test';

export default function App(): JSX.Element {
  return (
    <div>
      <Link to="/test">test 이동 </Link>
      <Routes>
        <Route path="/" element={<div> Home </div>} />
        asdf
        <Route path="/test" element={<Test />} />
      </Routes>
      <h1>HOME</h1>
    </div>
  );
}

window.addEventListener('load', async () => {
  console.log('요청날림');
  const { data } = await axios.get('/api/users');
  console.log(data);
});
