import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:4000", {
    transports: ["websocket"],
  });

  return socket;
};

const App = () => {

  const [online, setOnline] = useState(false)
  const [socket] = useState(connectSocketServer())

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket]);

  useEffect(()=> {
    socket.on('connect', ()=> {
      setOnline(true)
    })
  },[socket])

  useEffect(()=> {
    socket.on('disconnect'), () => {
      setOnline(false)
    }
  },[socket])

  return (
    <section className='container'>
      <header className='alert'>
        <h4>Services Status</h4>
        {
          online 
          ? (<span className='text-success'>Online</span>)
          : (<span className='text-danger'>Offline</span>)
        }
        <h1>Students Node.Js</h1>
        <hr />

        <div className='row'>
          <div className="col-8">
            Students List
          </div>
          <div className="col-4">
            Add Students
          </div>
        </div>
      </header>
    </section>
  )
}

export default App