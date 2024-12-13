const centerBar = document.getElementById("center-bar");
let posts;
let imgs;
let users;

Promise.all([getPosts(), getImgs(), getUsers()]).then(([postsData, imgsData, usersData]) => {
    posts = postsData;
    imgs = imgsData;
    users = usersData;

    createPosts();
});

function createPosts() {
    for (let i = 0; i < 5; i++) {
        const postDiv = document.createElement("div");
        postDiv.className = "post-div";
        centerBar.appendChild(postDiv);

        const borderDiv = document.createElement("div");
        borderDiv.className = "border-div";
        centerBar.appendChild(borderDiv);

        const headerDiv = document.createElement("div");
        headerDiv.className = "header-div";
        postDiv.appendChild(headerDiv);

        const profileImg = document.createElement("img");
        profileImg.className = "profile-img";
        profileImg.src = "user.png";
        headerDiv.appendChild(profileImg);
        
        const titleDiv = document.createElement("div");
        titleDiv.className = "title-div";
        headerDiv.appendChild(titleDiv);

        const nameDiv = document.createElement("div");
        nameDiv.className = "name-div";
        titleDiv.appendChild(nameDiv);

        const name = document.createElement("p");
        name.className = "text bolded-text";
        name.innerHTML = users[i].name;
        nameDiv.appendChild(name);

        const username = document.createElement("p");
        username.className = "text faint-text";
        username.innerHTML = "@" + users[i].username;
        nameDiv.appendChild(username);

        const postHeader = document.createElement("p");
        postHeader.className = "text";
        postHeader.innerHTML = posts[i].title;
        titleDiv.appendChild(postHeader);

        postDiv.appendChild(imgs[i]);

        const bottomImg = document.createElement("img");
        bottomImg.className = "bottom-img";
        bottomImg.src = "bottombar.png";
        postDiv.appendChild(bottomImg);
    }
}

async function getPosts() {
    const posts = []
    for (let i = 1; i <= 5; i++) {
        const post = await fetch("https://jsonplaceholder.typicode.com/posts/" + i);
        const postJSON = await post.json();
        posts.push(postJSON);
    }
    return posts;
}

async function getImgs() {
    const imgEls = [];
    for (let i = 1; i <= 5; i++) {
        const image = await fetch("https://unsplash.it/1920/1080?random");
        const imgJson = await image.blob();
        const imgEl = document.createElement("img");
        imgEl.src = URL.createObjectURL(imgJson);
        imgEl.className = "post-img"
        imgEls.push(imgEl);
    }
    return imgEls;
}

async function getUsers() {
    const users = []
    for (let i = 1; i <= 5; i++) {
        const user = await fetch("https://jsonplaceholder.typicode.com/users/" + i);
        const userData = await user.json();
        users.push(userData);
    }
    return users;
}