const newPostBtn = document.getElementById('newPostBtn');
const newPostForm = document.getElementById('newPostForm');
const editPostForm = document.getElementById('editPostForm');
const updatePostBtn = document.getElementById('updatePostBtn');
const deletePostBtn = document.getElementById('deletePostBtn');

// opens new post form
if (newPostBtn) {
    newPostBtn.addEventListener('click', () => {
        // hides the recent posts
        const recentPostsContainer = document.getElementById('recentPostsContainer');
        recentPostsContainer.classList.toggle('d-none');
    
        // reveals the form to create a new post
        const newPostForm = document.getElementById('newPostForm');
        newPostForm.classList.toggle('d-none');

        newPostBtn.classList.toggle('d-none');

        const cancelBtn = document.getElementById('cancelBtn');
        cancelBtn.classList.toggle('d-none');
    });
}

// creates a new post
if (newPostForm) {
    newPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const newPostTitle = document.getElementById('newPostTitle').value;
        const newPostContent = document.getElementById('newPostContent').value;
    
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPostTitle, newPostContent })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Post created successfully!');
                window.location.href = '/dashboard';
            } else {
                alert('Error submitting data');
            }
        })
        .catch(err => console.error('Error:', err));
    });
}

// opens the blog post editor when a user clicks on a post in their dashboard
if (editPostForm) {
    editPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const editPostTitle = document.getElementById('editPostTitle').value;
        const editPostContent = document.getElementById('editPostContent').value;
        const postId = editPostForm.dataset.id;
    
        fetch(`/update/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ editPostTitle, editPostContent })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard';
                alert('Post updated successfully!');
            } else {
                alert('Error updating data');
            }
        })
        .catch(err => console.error('Error:', err));
    });
}


// deletes a blog post
if (deletePostBtn) {
    deletePostBtn.addEventListener('click', (e) => {
        const postId = editPostForm.dataset.id;

        fetch(`/delete/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard'; // redirect to another page after the alert
                alert('Post deleted successfully!');
            } else {
                alert('Error deleting post: ' + data.message);
            }
        })
        .catch(err => console.error('Error:', err));
    });
}
