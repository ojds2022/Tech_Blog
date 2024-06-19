const newPostBtn = document.getElementById('newPostBtn').addEventListener('click', () => {
    const newPostForm = document.getElementById('newPostForm');
    newPostForm.classList.toggle('d-none');
    console.log('button clicked');
})