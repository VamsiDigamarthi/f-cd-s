import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager' }
];

const products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', stock: 25 },
    { id: 2, name: 'Mouse', price: 29, category: 'Electronics', stock: 150 },
    { id: 3, name: 'Keyboard', price: 79, category: 'Electronics', stock: 80 },
    { id: 4, name: 'Monitor', price: 299, category: 'Electronics', stock: 45 },
    { id: 5, name: 'Desk Chair', price: 199, category: 'Furniture', stock: 30 }
];

const posts = [
    { id: 1, title: 'First Post', content: 'This is my first blog post', author: 'John Doe', likes: 42 },
    { id: 2, title: 'Learning Express', content: 'Express.js is awesome!', author: 'Jane Smith', likes: 87 },
    { id: 3, title: 'API Development', content: 'Building RESTful APIs', author: 'Bob Johnson', likes: 65 }
];

// Root API
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Dummy API Server! 🚀',
        status: 'Server is running successfully',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            posts: '/api/posts',
            stats: '/api/stats',
            health: '/health'
        }
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json({ success: true, data: user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json({ success: true, data: product });
    } else {
        res.status(404).json({ success: false, message: 'Product not found' });
    }
});

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json({
        success: true,
        count: posts.length,
        data: posts
    });
});

// Get post by ID
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.json({ success: true, data: post });
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
});

// Get stats
app.get('/api/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalUsers: users.length,
            totalProducts: products.length,
            totalPosts: posts.length,
            serverUptime: process.uptime(),
            nodeVersion: process.version
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📍 Root API: http://localhost:${PORT}/`);
});
