# SuggestInput
A simple input for suggest some word with free allow add new word

```` javascript
const [result, setResult] = useState(['c', 'c#', 'java']);
  
 
<SuggestInput
      suggestions={['c', 'c++', 'c#', 'javascript', 'java', 'php']}
      value={result}
      placeholder={'Please select your programming language'}
      onChange={function (result: string[]): void {
        setResult(result);
        console.log(result);
      }}
  />
````
![alt text](https://github.com/foadabdollahi/SuggestInput/blob/master/public/sample.JPG?raw=true)
![alt text](https://github.com/foadabdollahi/SuggestInput/blob/master/public/sample2.JPG?raw=true)
