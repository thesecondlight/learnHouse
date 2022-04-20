import React, { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App'; //这个是截图

import {createStore} from "redux";
import { addAction,delAction } from './actions/actions';

/**
* store 数据存储仓库
* state 仓库中的数据
* action 对象 描述当前如何操作state状态
* dispatch store.dispatch(action) 唯一更改store的方法
* reducer 函数 更新当前state
*/

const reducer=(state=10,action)=>{
  switch (action.type) {
    case "ADD":
      return state+action.num;
      case "DEL":
        return state-action.num;
    default:
      return state;
  }
}

const store =createStore(reducer);
// store.getState(); //查看store中state状态
console.log('[ state初始值 ] >', store.getState())
store.dispatch(addAction);
console.log('[ state add ] >', store.getState())

// function App(){
//   const [count,countSet] = useState(0)
//   const clickT=()=>{
//     countSet(count+1)
//   }
//   console.log("一直在渲染")
//  组件内并没有用到count，但是countSet使得组件一直在渲染
//   return(
//     <button onClick={clickT}>timer</button>
//   )
// }
function App(){
    const count = useRef(0)
    const clickT=()=>{
      count.current++;
    }
    console.log("useRef就不会渲染了 嘿嘿嘿")
    return(
      <button onClick={clickT}>timer</button>
    )
  }


ReactDOM.render(
  <App />,  
  document.getElementById('root')
);


