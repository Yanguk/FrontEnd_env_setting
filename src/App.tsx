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

console.log(process.env.NODE_ENV);
console.log('hi');

export default App;
