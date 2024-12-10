const title = document.querySelector('#title');
const body = document.querySelector('#body');
const createPost = document.querySelector('#createPost');
const newPost = document.querySelector('#newPost');
const posts = document.querySelector('#posts');
const error = document.querySelector('.error');

function createPostHTML(post) {
	return `<h3>${post.title}</h3><p>${post.body}</p>`;
}
function addPost(container, html) {
	container.insertAdjacentHTML('beforeend', html);
}
function fetchAndDisplayPosts() {
	if (!title.value || !body.value) {
		error.textContent = 'Пожалуйста, заполните все поля.';
	} else {
		error.textContent = '';
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: title.value,
				body: body.value,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				error.textContent = '';
				let post = createPostHTML(data);
				addPost(posts, post);
				title.value = '';
				body.value = '';
			})

			.catch((error) => {
				console.error('Ошибка загрузки постов:', error);
				error.textContent = 'Не удалось загрузить посты.';
			});
	}
}
createPost.addEventListener('click', fetchAndDisplayPosts);
