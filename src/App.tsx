import React, { useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import SuggestInput from './SuggestInput/SuggestInput';

function App() {
  const [result, setResult] = useState(['c', 'c#', 'java']);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card border-primary w-50 m-5">
        <div className='card-header'>
          <h1 className='h4 card-title'>SuggestInput</h1> 
          <p>A simple input for suggest some word with free allow add new word</p>
        </div>
        <div className="card-body">
          <SuggestInput
            suggestions={['c', 'c++', 'c#', 'javascript', 'java', 'php']}
            value={result}
            placeholder={'Please select your programming language'}
            onChange={function (result: string[]): void {
              setResult(result);
              console.log(result);
            }}
          />

          <hr />

          <h5>Result as array:</h5>
          {result.map((currentValue) => <>{currentValue + ', '}</>)}

        </div>
      </div>


    </div>
  );
}

export default App; 