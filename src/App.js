
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import io from 'socket.io-client';

const socket = io('https://real-time-chat-app-seven-orcin.vercel.app');

function App() {

  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);
  const [messageCount,setMessageCount] = useState(0);

  useEffect(()=>{
    const handleMessage = (message) => {
      setMessages((prevMessage)=>[...prevMessage,message])
      setMessageCount((prevCount)=> prevCount + 1)
    }
      socket.on('message',handleMessage)
    return()=>{
      socket.off('message',handleMessage)
    }
  },[])

  const send = (e) => {
    e.preventDefault();
    socket.emit('message',message);
    setMessage('');
  }

  return (
    <div>
      <Helmet>
      <title>Real-time Chat Application | Ashkan Golzad</title>
      <meta name="description" content="A real-time chat application with dynamic message. developed by Ashkan Golzad. make with node js, express js, react js and tailwind css!" />
      </Helmet>
    <div className='md:text-2xl text-lg font-bold text-center w-full animate-pulse mt-8 mb-12'>Simple Real-time Chat Application with Node js, Express js and React js</div>
    <div className='md:flex md:w-[80%] md:ml-[10%]'>

      <div className='md:flex-initial h-auto md:w-1/2 block'>
        <form onSubmit={send}>
        <input value={message} placeholder='Type ...' onChange={e => setMessage(e.target.value)} className='w-[90%] ml-[5%] mt-12 border-2 border-dotted border-slate-600 rounded-lg p-2 h-16'/>
        <button className='w-[90%] ml-[5%] bg-green-500 hover:bg-blue-500 p-2 mt-2 text-white rounded-lg font-bold'>SEND</button>
        </form>
        <div className='mt-8 text-center font-semibold text-red-600'>Total Messages: {messageCount}</div>
      </div>

      <div className='md:flex-initial h-auto md:w-1/2'>
        <div className='mt-12'>
        {messages.map((msg,index)=>{
          return(
            <div key={index} style={{backgroundColor: msg.color}} className='p-2 m-2 rounded-lg'>{msg.text}</div>
          )
        })}
        </div>
      </div>

    </div>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-12 mb-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-['font1'] text-md"
          href="https://ashkangolzad.ir"
          target="_blank"
          rel="noopener noreferrer"
        >
        by AG
        </a>
    </footer>
    </div>
  );
}

export default App;
