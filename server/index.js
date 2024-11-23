import express from 'express';
import { Server } from 'socket.io'; // Use named import
import http from 'http';
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST']
    }
    });
    
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your frontend
}));

const colors = ['#E1BEE7','#EF9A9A','#B3E5FC','#C5E1A5','#FFF176','#FFAB91','#E53935','#1E88E5','#FDD835']


io.on('connection',(socket) => {
    console.log('new client connected!');
    const userColor = colors[Math.floor(Math.random() * colors.length)]
    socket.on('message',(message)=>{
        io.emit('message',{text:message,color:userColor})
    })
    socket.on('disconnect',()=>{
        console.log('client disconnected!')
    })
})

app.get('/',(req,res)=>{
    res.json({message: 'Hello from server!'})
})

server.listen(4000, () => console.log('Server connected on port 4000'))