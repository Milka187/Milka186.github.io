document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const creationTime = new Date().toISOString();
    
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.push({ title, author, content, creationTime });
    localStorage.setItem('posts', JSON.stringify(posts));
    
    window.location.href = 'manage-posts.html';
});

