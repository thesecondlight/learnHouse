import {useEffect, useState} from "react";
import html2canvas from "html2canvas"
import './App.less';

function App() {
  const [show,setShow]=useState(false);
  // useEffect(() => {
   
  // })
  const shootHtml=()=>{
    html2canvas(document.getElementById("App"),{
        allowTaint: false,
        useCORS: true,
        scale: 1,
        // width: 750,
        // height: 1624,
        backgroundColor:"red"
    }).then(canvas => {
      //  document.body.appendChild(canvas)
      setShow(true)
      let shoot=document.getElementById("imgnew");
      shoot.src=canvas.toDataURL('image/png');
      console.log('[ 截图了 ] >');
      });
  }
  
  return (
    <div className="mainCon" id="App">
      <img src="http://yun.duiba.com.cn/spark/v2/temp_base/1643075990977/SelectCharacterPanel/男生选择按钮高.png" 
      className="imgDemo" onClick={()=>shootHtml()}/>
      <div className='div1'></div>
      <p>截图</p>
      {
        show && 
          <img id="imgnew" className='imgnew'></img>
      }
    </div>
  );
}

export default App;
