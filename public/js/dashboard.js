const newPostBtn = document.getElementById('newPostBtn');
const newPostForm = document.getElementById('newPostForm');

newPostBtn.addEventListener('click', () => {
    // hides the recent posts
    const recentPostsContainer = document.getElementById('recentPostsContainer');
    recentPostsContainer.classList.toggle('d-none');

    // reveals the form to create a new post
    const newPostForm = document.getElementById('newPostForm');
    newPostForm.classList.toggle('d-none');
});

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