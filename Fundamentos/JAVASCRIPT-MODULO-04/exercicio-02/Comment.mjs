class Comment {
    constructor(username, comment) {
        this.username = username;
        this.comment = comment;
        this.createdAt = new Date();
    }
}

export default Comment;