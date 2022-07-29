import React from 'react';
import axios from 'axios';

function Test() {
  return <div>TEST HOME</div>;
}

function App(): JSX.Element {
  return (
    <>
      <Test />
      <div>
        <h1>HOME</h1>
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
