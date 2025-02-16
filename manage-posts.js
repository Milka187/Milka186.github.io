function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

function editPost(index) {
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = posts[index];
    const postElement = document.getElementById(`post-${index}`);
    
    postElement.innerHTML = `
        <form class="edit-form" onsubmit="saveEdit(event, ${index})">
            <input type="text" id="edit-title-${index}" value="${post.title}" required>
            <input type="text" id="edit-author-${index}" value="${post.author}" required>
            <textarea id="edit-content-${index}" required>${post.content}</textarea>
            <button type="submit">Save</button>
        </form>
    `;
}

function saveEdit(event, index) {
    event.preventDefault();
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts[index].title = document.getElementById(`edit-title-${index}`).value;
    posts[index].author = document.getElementById(`edit-author-${index}`).value;
    posts[index].content = document.getElementById(`edit-content-${index}`).value;
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts">Записей пока нет</p>';
        return;
    }

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.id = `post-${index}`;
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="post-meta">
                Posted on ${formatDate(post.creationTime)} by ${post.author}
            </div>
            <div>${post.content}</div>
            <button class="edit-btn" onclick="editPost(${index})">Редактировать</button>
            <button class="delete-btn" onclick="deletePost(${index})">Удалить</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

displayPosts();

