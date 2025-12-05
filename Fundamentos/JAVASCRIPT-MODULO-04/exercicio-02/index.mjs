import Author from "./Author.mjs";

const jonh = new Author("John Doe");

const post = jonh.createPost("Hello World", "This is my first post");

post.addComment("John Doe", "This is a comment");
post.addComment("John Doe", "This is another comment");

console.log(jonh);
console.log(post);