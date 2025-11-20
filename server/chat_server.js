// Simple WebSocket chat server for cross-browser communication
const http = require('http');
const server = http.createServer();
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*', // TODO: set to your deployed origin, e.g., 'https://your-app.example'
        methods: ['GET', 'POST']
    }
});

// Optional: room participant tracking
const rooms = new Map(); // roomId -> Set<socket.id>

io.on('connection', (socket) => {
    console.log('New socket connected:', socket.id);

    socket.on('join-room', ({ roomId, userId }) => {
        try {
            socket.join(roomId);
            socket.data.roomId = roomId;
            socket.data.userId = userId;
            if (!rooms.has(roomId)) rooms.set(roomId, new Set());
            rooms.get(roomId).add(socket.id);
            socket.to(roomId).emit('user-joined', { userId, socketId: socket.id });
            console.log(`Socket ${socket.id} joined room ${roomId} (userId=${userId})`);
        } catch (e) {
            console.error('join-room error:', e);
        }
    });

    socket.on('leave-room', () => {
        const roomId = socket.data.roomId;
        const userId = socket.data.userId;
        if (roomId) {
            socket.leave(roomId);
            if (rooms.has(roomId)) {
                rooms.get(roomId).delete(socket.id);
                if (rooms.get(roomId).size === 0) rooms.delete(roomId);
            }
            socket.to(roomId).emit('user-left', { userId, socketId: socket.id });
            console.log(`Socket ${socket.id} left room ${roomId}`);
            socket.data.roomId = null;
        }
    });

    // Simple chat relay (optional)
    socket.on('chat', (payload) => {
        const roomId = socket.data.roomId;
        if (!roomId) return;
        io.to(roomId).emit('chat', { ...payload, roomId });
    });

    // WebRTC signaling relays
    socket.on('webrtc-offer', (payload) => {
        const roomId = payload.roomId || socket.data.roomId;
        if (!roomId) return;
        socket.to(roomId).emit('webrtc-offer', payload);
        console.log('Relayed offer in room', roomId);
    });

    socket.on('webrtc-answer', (payload) => {
        const roomId = payload.roomId || socket.data.roomId;
        if (!roomId) return;
        socket.to(roomId).emit('webrtc-answer', payload);
        console.log('Relayed answer in room', roomId);
    });

    socket.on('webrtc-ice', (payload) => {
        const roomId = payload.roomId || socket.data.roomId;
        if (!roomId) return;
        socket.to(roomId).emit('webrtc-ice', payload);
    });

    // Code share relay
    socket.on('code-share', (payload) => {
        const roomId = payload.roomId || socket.data.roomId;
        if (!roomId) return;
        socket.to(roomId).emit('code-share', payload);
    });

    socket.on('disconnect', () => {
        const roomId = socket.data.roomId;
        const userId = socket.data.userId;
        if (roomId) {
            if (rooms.has(roomId)) {
                rooms.get(roomId).delete(socket.id);
                if (rooms.get(roomId).size === 0) rooms.delete(roomId);
            }
            socket.to(roomId).emit('user-left', { userId, socketId: socket.id });
            console.log(`Socket ${socket.id} disconnected from room ${roomId}`);
        } else {
            console.log('Socket disconnected:', socket.id);
        }
    });
});

const PORT = 8080;
server.listen(PORT, function() {
    console.log(`🚀 Chat server running on ws://localhost:${PORT}`);
    console.log('Ctrl+C to stop server');
});

// Graceful shutdown
process.on('SIGINT', function() {
    console.log('\n📴 Shutting down chat server...');
io.close(function() {
        server.close(function() {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
});