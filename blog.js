// Add Post
const addDialog = document.querySelector('#add-post-dialog');
const addForm = document.querySelector('#add-post-form');
let titleInput = document.querySelector('#title-input');
let dateInput = document.querySelector('#date-input');
let summaryInput = document.querySelector('#summary-input');

// Edit Post
const editDialog = document.querySelector('#edit-post-dialog');
const editForm = document.querySelector('#edit-post-form');
let editTitleInput = document.querySelector('#edit-title-input');
let editDateInput = document.querySelector('#edit-date-input');
let editSummaryInput = document.querySelector('#edit-summary-input');

// Delete Post
const deleteDialog = document.querySelector('#delete-post-dialog');
const cancelDeleteButton = document.querySelector('#delete-post-cancel');
const okDeleteButton = document.querySelector('#delete-post-ok');

// Current Post
let currentPost;

// Define utility functions for manipulating the data store
const getNextPostId = (posts) => posts.length + 1;

const findPostIndexById = (posts, id) =>
  posts.findIndex((post) => post.id === id);

const addPost = (post) => {
  let posts = Array.from(JSON.parse(localStorage.getItem('posts')) || []);
  post.id = getNextPostId(posts);
  localStorage.setItem(
    'posts',
    JSON.stringify([
      ...JSON.parse(localStorage.getItem('posts') || '[]'),
      { ...post },
    ])
  );
};

const updatePost = (post) => {
  let posts = Array.from(JSON.parse(localStorage.getItem('posts')) || []);
  let index = findPostIndexById(posts, post.id);
  if (index >= 0) {
    posts[index] = post;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
};

const deletePost = (id) => {
  let posts = Array.from(JSON.parse(localStorage.getItem('posts')) || []);
  let index = findPostIndexById(posts, id);
  if (index >= 0) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
  }
};

// Define functions for rendering the data to the page
const renderPost = (post) => {
  let postElem = document.createElement('li');
  postElem.innerHTML = `
    <p>${DOMPurify.sanitize(post.title)}</p>
    <p><strong>Date:</strong> ${DOMPurify.sanitize(post.date)}</p>
    <p>${DOMPurify.sanitize(post.summary)}</p>
    <button class="edit-button" data-post-id="${post.id}">Edit</button>
    <button class="delete-button" data-post-id="${post.id}">Delete</button>`;
  return postElem;
};

const renderPosts = () => {
  let postsContainer = document.querySelector('#posts-container');
  postsContainer.innerHTML = '';
  let posts = Array.from(JSON.parse(localStorage.getItem('posts')) || []);
  posts.forEach((post) => {
    let postElem = renderPost(post);
    postsContainer.appendChild(postElem);
  });
};

// Define functions for handling user interactions
const handleAddButtonClick = () => addDialog.showModal();

const handleEditButtonClick = (event) => {
  let postId = parseInt(event.target.dataset.postId);
  let posts = Array.from(JSON.parse(localStorage.getItem('posts')) || []);
  let post = posts.find((post) => post.id === postId);
  if (post) {
    editTitleInput.value = post.title;
    editDateInput.value = post.date;
    editSummaryInput.value = post.summary;
    currentPost = post;
    editDialog.showModal();
  }
};

const handleDeleteButtonClick = (event) => {
  deleteDialog.showModal();
  let postId = parseInt(event.target.dataset.postId);
  currentPost = postId;
};

// Add event listeners to the page
let addButton = document.querySelector('#add-post-btn');
addButton.addEventListener('click', handleAddButtonClick);

let postsContainer = document.querySelector('#posts-container');
postsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    handleEditButtonClick(event);
  } else if (event.target.classList.contains('delete-button')) {
    handleDeleteButtonClick(event);
  }
});

// Add form
addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let newPost = {
    title: titleInput.value,
    date: dateInput.value,
    summary: summaryInput.value,
  };

  addPost(newPost);
  addDialog.close();
  addForm.reset();
  renderPosts();
});

let cancelAddButton = document.querySelector('#cancel-add-post-btn');
cancelAddButton.addEventListener('click', () => {
  addDialog.close();
  addForm.reset();
});

// Edit form
editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Set values to edited
  currentPost.title = editTitleInput.value;
  currentPost.date = editDateInput.value;
  currentPost.summary = editSummaryInput.value;

  updatePost(currentPost);

  editDialog.close();
  editForm.reset();
  currentPost = undefined;

  renderPosts();
});

let cancelEditButton = document.querySelector('#cancel-edit-post-btn');
cancelEditButton.addEventListener('click', () => {
  editDialog.close();
  editForm.reset();
});

// Delete form
okDeleteButton.addEventListener('click', () => {
  deletePost(currentPost);

  deleteDialog.close();
  currentPost = undefined;

  renderPosts();
});

cancelDeleteButton.addEventListener('click', () => {
  currentPost = undefined;
  deleteDialog.close();
});

// Render the initial state of the page
renderPosts();
