const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory data storage (in production, use a real database)
const users = [];
const videos = [];
const pictures = [];
const meetups = [];
const chatMessages = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API endpoints
app.post('/api/register', (req, res) => {
    const user = {
        id: users.length + 1,
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        age: req.body.age,
        verified: false
    };
    users.push(user);
    res.json({ success: true, user });
});

app.post('/api/videos/upload', (req, res) => {
    const video = {
        id: videos.length + 1,
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        tags: req.body.tags || [],
        uploadDate: new Date(),
        views: 0,
        likes: 0
    };
    videos.push(video);
    res.json({ success: true, video });
});

app.get('/api/videos', (req, res) => {
    res.json({ videos });
});

app.post('/api/pictures/upload', (req, res) => {
    const picture = {
        id: pictures.length + 1,
        title: req.body.title,
        userId: req.body.userId,
        tags: req.body.tags || [],
        uploadDate: new Date(),
        views: 0,
        likes: 0
    };
    pictures.push(picture);
    res.json({ success: true, picture });
});

app.get('/api/pictures', (req, res) => {
    res.json({ pictures });
});

app.post('/api/meetups/create', (req, res) => {
    const meetup = {
        id: meetups.length + 1,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        province: 'Ontario',
        city: req.body.city,
        date: req.body.date,
        organizerId: req.body.userId,
        attendees: [],
        maxAttendees: req.body.maxAttendees || 20
    };
    meetups.push(meetup);
    res.json({ success: true, meetup });
});

app.get('/api/meetups', (req, res) => {
    const ontarioMeetups = meetups.filter(m => m.province === 'Ontario');
    res.json({ meetups: ontarioMeetups });
});

app.post('/api/meetups/:id/join', (req, res) => {
    const meetup = meetups.find(m => m.id === parseInt(req.params.id));
    if (meetup && meetup.attendees.length < meetup.maxAttendees) {
        meetup.attendees.push(req.body.userId);
        res.json({ success: true, meetup });
    } else {
        res.status(400).json({ success: false, message: 'Meetup full or not found' });
    }
});

// Socket.IO for real-time chat
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('chat-message', (data) => {
        const message = {
            id: chatMessages.length + 1,
            userId: data.userId,
            username: data.username,
            message: data.message,
            room: data.room,
            timestamp: new Date()
        };
        chatMessages.push(message);
        io.to(data.room).emit('chat-message', message);
    });

    socket.on('video-call-offer', (data) => {
        socket.to(data.room).emit('video-call-offer', data);
    });

    socket.on('video-call-answer', (data) => {
        socket.to(data.room).emit('video-call-answer', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`HOOKUP platform running on port ${PORT}`);
});
