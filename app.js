const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB

mongoose.connect(`mongodb+srv://kotasai4627:EpJvCIFRnEOMQ1TS@cluster0.th8ujbq.mongodb.net/?retryWrites=true&w=majority`);

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Define Mongoose schema and model for posts
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

app.get('/posts/:postId', async (req, res) => {
  const post = await Post.findById(req.params.postId);
  res.render('post', { post });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ...

// Route to render the form for creating a new post
app.get('/new', (req, res) => {
  res.render('new');
});

// ...
// ...

// Route to handle the form submission and create a new post
app.post('/create', async (req, res) => {
  const { title, content } = req.body;

  // Validate the data as needed

  // Create a new post in the database
  const newPost = new Post({
    title,
    content,
  });

  try {
    await newPost.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('Error creating the post.');
  }
});

// ...
