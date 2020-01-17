import React, {useState} from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  console.log(messages)
  return <main>

    <header> 
      <img className="logo"
        alt="logo"
        src="" 
      />
      Chatter
    </header>

    <div className="messages"></div>
    {messages.map((m,i)=>{
      return <div key={i} className= "message">{m}</div>
    })}
    
    <TextInput onSend={(text)=> {
      setMessages([text,...messages])
    }} />
    
  </main>
}


function TextInput(props){
  var [text, setText] = useState('') 
  // normal js comment
  return <div className="text-input-wrap">
    <input value={text} className="text-input"
      placeholder="write your message"
      onChange={e=> setText(e.target.value)}
    />
    <button onClick={()=> {
      if (text) {
      props.onSend(text)
      }
      setText('')
    }} className="button">
      {/*disabled={!text}*/}
      SEND
    </button>
  </div>
}

export default App;