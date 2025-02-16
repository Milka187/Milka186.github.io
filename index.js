function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts">Записей пока нет</p>';
        return;
    }

    posts.sort((a, b) => new Date(b.creationTime) - new Date(a.creationTime));

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="post-meta">
                Опубликовано ${formatDate(post.creationTime)} автор: ${post.author}
            </div>
            <div>${post.content.substring(0, 200)}...</div>

        `;
        postsContainer.appendChild(postElement);
    });
}

displayPosts();

