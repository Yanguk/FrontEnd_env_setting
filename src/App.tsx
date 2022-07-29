import React from 'react';

function Test() {
  return (
    <div>
      하이룽 테스트 입다다 하이룽 테스트 입다다 하이룽 테스트 입다다 하이룽
      테스트 입다다
    </div>
  );
}

function App(): JSX.Element {
  return (
    <>
      <Test />
      <div>
        <h1>리액트 jsx 환경 까지 구성완료~ 타입스크립트로</h1>
      </div>
    </>
  );
}

window.addEventListener('load', async () => {
  console.log('요청날림');
  const { data } = await axios.get('/api/users');
  console.log(data);
});

export default App;
