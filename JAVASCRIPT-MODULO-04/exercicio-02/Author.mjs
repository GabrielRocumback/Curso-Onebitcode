import Post from "./Post.mjs";

class Author {
    constructor(name) {
        this.name = name;
        this.posts = [];
    }

    createPost(title, body) {
        const post = new Post(title, body, this);
        this.posts.push(post);
        return post;
    }
}

export default Author

