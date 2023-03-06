import React, { useEffect, useState } from "react";
import style from './SuggestInput.module.css';

type PropsType = {
  suggestions: string[],
  value: string[],
  placeholder: string,
  onChange: (param: string[]) => void

}
type RefType = HTMLDivElement;

type statee = {
  activeSuggestion: number,
  filteredSuggestions: string[],
  showSuggestions: boolean,
  userInput: string
}

const times = (<svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>);

const SuggestInput = React.forwardRef<RefType, PropsType>((props, ref) => {

  const [data, setData] = useState<statee>({
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ""
  });
  // console.log("props.value", props.value); 

  const [outPut, setOutPut] = useState<string[]>([]);
  // const outPutRef = useRef(null);
  useEffect(() => {

    if (props.value) {
      setOutPut(props.value);
    }
    // console.log("useEffect props.value", props.value);
  }, [props.value]);




  const onChanges = (e: React.ChangeEvent<HTMLInputElement>) => {

    const userInput = e.currentTarget.value;

    const filteredSuggestions = props.suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setData({
      activeSuggestion: -1,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = (e: any) => {
    setData({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    });
    AddItem(e.currentTarget.innerText);
  };

  const onKeyDown = (e: any) => {
    const { activeSuggestion, filteredSuggestions } = data;


    // User pressed the enter key
    if (e.keyCode === 13 /*enter*/ || e.keyCode === 9/*tab*/) {
      e.preventDefault();

      if (activeSuggestion > -1) {
        AddItem(filteredSuggestions[activeSuggestion]);
      } else {
        AddItem(data.userInput);
      }


      setData({ ...data, activeSuggestion: 0, showSuggestions: false, userInput: "" })

    }
    else if (e.keyCode === 8) {//backstapce 
      if (data.userInput.length === 0) {
        const copy = outPut;
        copy.pop();
        setOutPut([...copy]);
        props.onChange([...copy]);
      }
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setData({ ...data, activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setData({ ...data, activeSuggestion: activeSuggestion + 1 });
    }
  };

  const onRemove = (removeValue: string) => {
    const copy = outPut.filter(item => item !== removeValue);
    props.onChange([...copy]);
    setOutPut([...copy]);
  }

  const AddItem = (newValue: string) => {
    if (outPut.length > 0) {
      if (outPut.indexOf(newValue) > -1) {

        const copy = outPut.filter(item => item !== newValue);
        props.onChange([...copy, newValue]);
        setOutPut(old => [...copy, newValue]);
      } else {
        props.onChange([...outPut, newValue]);
        setOutPut(old => [...old, newValue]);
      }



    }
    else {
      props.onChange([newValue]);
      setOutPut([newValue]);
    }
  }

  return (
    <div className={style.sug} ref={ref}>
      <div className={style.valueContainer} >
        {outPut.map((currentValue, index) => <div key={index} className={style.badgeContainer} ><span className={style.badge}>{currentValue}</span><span role="button" className={style.remove} onClick={() => onRemove(currentValue)}>{times}</span></div>)}
      </div>

      <input
        type="text"
        className="form-control"
        onChange={onChanges}
        onKeyDown={onKeyDown}
        value={data.userInput}
        placeholder={props.placeholder}
      />


      {data.showSuggestions && data.userInput && data.filteredSuggestions.length > 0 && (
        <ul className={style.suggestions} >
          {data.filteredSuggestions.map((suggestion, index) =>
          (<li className={index === data.activeSuggestion ? style.suggestionActive : ""} key={suggestion} onClick={onClick}>
            {suggestion}
          </li>)
          )}
        </ul>
      )}
    </div>
  )
})



export default SuggestInput;