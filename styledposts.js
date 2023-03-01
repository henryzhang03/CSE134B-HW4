import { getPosts, savePost, deletePost } from './posts.js';

// Get the necessary DOM elements
const postList = document.querySelector('#post-list');
const addPostBtn = document.querySelector('#add-post-btn');
const addPostDialog = document.querySelector('#add-post-dialog');
const editPostDialog = document.querySelector('#edit-post-dialog');
const cancelAddPostBtn = document.querySelector('#cancel-add-post-btn');
const cancelEditPostBtn = document.querySelector('#cancel-edit-post-btn');

// Helper function to clear the post list
const clearPostList = () => {
  while (postList.firstChild) {
    postList.removeChild(postList.firstChild);
  }
};

// Helper function to create a post list item
const createPostListItem = (post) => {
  // Create the necessary elements
  const li = document.createElement('li');
  li.innerHTML = `<header class="post-header">
      <h2 class="summary-title">${post.title}</h2>
      <div class="actions">
        <button class="edit-btn"><img src="edit.svg" /></button>
        <button class="delete-btn"><img src="delete.svg" /></button>
      </div>
    </header>
    <div class="summary-container">
      <time class="summary-date">${new Date(post.date).toDateString()}</time>
      <p class="summary-desc">${post.summary}</p>
    </div>`;

  // Define buttons
  const editBtn = li.getElementsByClassName('edit-btn')[0];
  const deleteBtn = li.getElementsByClassName('delete-btn')[0];

  // Add event listeners to the edit and delete buttons
  editBtn.addEventListener('click', () => {
    showEditPostDialog(post.id);
  });
  deleteBtn.addEventListener('click', () => {
    deletePost(post.id);
    refreshPostList();
  });

  return li;
};

// Helper function to refresh the post list
const refreshPostList = () => {
  clearPostList();
  getPosts().forEach((post) => {
    postList.appendChild(createPostListItem(post));
  });
};

// Helper function to show the add post dialog
const showAddPostDialog = () => {
  addPostDialog.showModal();
};

// Helper function to hide the add post dialog
const hideAddPostDialog = () => {
  addPostDialog.querySelector('form').reset();
  addPostDialog.close();
};

// Helper function to show the edit post dialog
const showEditPostDialog = (postId) => {
  const post = getPosts().find((post) => post.id === postId);

  if (post) {
    const editPostId = document.querySelector('#edit-post-id');
    const editPostTitle = document.querySelector('#edit-post-title');
    const editPostDate = document.querySelector('#edit-post-date');
    const editPostSummary = document.querySelector('#edit-post-summary');

    editPostId.value = post.id;
    editPostTitle.value = post.title;
    editPostDate.value = post.date;
    editPostSummary.value = post.summary;

    // Show the edit post dialog
    editPostDialog.showModal();
  }
};

// Helper function to hide the edit post dialog
const hideEditPostDialog = () => {
  // Close the dialog
  editPostDialog.close();
  // Reset the form
  editPostDialog.querySelector('form').reset();
};

// Initialize the post list
refreshPostList();

// Add event listener for add post button
addPostBtn.addEventListener('click', showAddPostDialog);

// Add event listener for cancel add post button
cancelAddPostBtn.addEventListener('click', hideAddPostDialog);

// Add event listener for cancel edit post button
cancelEditPostBtn.addEventListener('click', hideEditPostDialog);

// Add event listener for add post form submission
addPostDialog.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const postTitle = document.querySelector('#post-title').value;
  const postDate = document.querySelector('#post-date').value;
  const postSummary = document.querySelector('#post-summary').value;

  // Save the new post
  if (postTitle && postDate && postSummary) {
    const post = savePost(postTitle, postDate, postSummary);

    if (post) {
      hideAddPostDialog();
      refreshPostList();
    }
  }
});

// Add event listener for edit post form submission
editPostDialog.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const editPostId = document.querySelector('#edit-post-id').value;
  const editPostTitle = document.querySelector('#edit-post-title').value;
  const editPostDate = document.querySelector('#edit-post-date').value;
  const editPostSummary = document.querySelector('#edit-post-summary').value;

  // Save the edited post
  const post = savePost(
    editPostTitle,
    editPostDate,
    editPostSummary,
    editPostId
  );

  if (post) {
    hideEditPostDialog();
    refreshPostList();
  }
});
