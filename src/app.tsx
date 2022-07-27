import React from 'react';

function Test() {
  console.log('test');
  return (
    <div>
      컴포넌트 반영이?!!? 아딘느거엿냐
    </div>
  )
}

function App(): JSX.Element {
  return (
    <>
    <Test/>
    <div>
      <h1>리액트 jsx 환경 까지 구성완료~ 타입스크립트로 리프레시가 아되넹..</h1>
    </div>
    </>
  );
}

export default App;
