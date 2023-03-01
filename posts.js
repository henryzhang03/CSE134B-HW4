// Helper function to get posts from local storage
const getPostsFromLocalStorage = () => {
  let posts = [];

  if (localStorage.getItem('posts')) {
    posts = JSON.parse(localStorage.getItem('posts'));
  }

  return posts;
};

// Helper function to save posts to local storage
const savePostsToLocalStorage = (posts) =>
  localStorage.setItem('posts', JSON.stringify(posts));

// Helper function to generate a unique ID for a post
const generatePostId = (posts) => posts.length + 1;

// Get Post index
const findPostIndexById = (posts, id) =>
  posts.findIndex((post) => post.id === id);

// Public function to get all posts
export const getPosts = () => getPostsFromLocalStorage();

// Public function to save a post
export const savePost = (title, date, summary, id) => {
  const posts = getPostsFromLocalStorage();
  const postId = parseInt(id) || generatePostId(posts);
  const post = {
    id: postId,
    title,
    date,
    summary,
  };
  // For updating post
  let index = findPostIndexById(posts, postId);
  if (index >= 0) {
    posts[index] = post;
  }
  if (!id) posts.push(post);
  savePostsToLocalStorage(posts);
  return post;
};

// Public function to delete a post
export const deletePost = (postId) => {
  let posts = getPostsFromLocalStorage();
  posts = posts.filter((post) => post.id !== postId);
  savePostsToLocalStorage(posts);
};
