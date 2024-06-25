const newPostBtn = document.getElementById('newPostBtn');
const newPostForm = document.getElementById('newPostForm');
const editPostForm = document.getElementById('editPostForm');
const updatePostBtn = document.getElementById('updatePostBtn');
const deletePostBtn = document.getElementById('deletePostBtn');

// document.addEventListener('DOMContentLoaded', (event) => {
//     const recentPosts = document.querySelectorAll('.recentPost');

//     recentPosts.forEach(post => {
//         post.addEventListener('click', (event) => {
//             event.preventDefault(); // Prevent the default action of the link
//             console.log('Post clicked:', post);
//         });
//     });
// });

if (newPostBtn) {
    newPostBtn.addEventListener('click', () => {
        // hides the recent posts
        const recentPostsContainer = document.getElementById('recentPostsContainer');
        recentPostsContainer.classList.toggle('d-none');
    
        // reveals the form to create a new post
        const newPostForm = document.getElementById('newPostForm');
        newPostForm.classList.toggle('d-none');
    });
}

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
                alert('Data submitted successfully!');
            } else {
                alert('Error submitting data');
            }
        })
        .catch(err => console.error('Error:', err));
    });
}

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
                alert('Data updated successfully!');
            } else {
                alert('Error updating data');
            }
        })
        .catch(err => console.error('Error:', err));
    });
}

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

// recentPost.addEventListener('click', () => {
//     console.log('clicked');
// });
