class CommentsHandler {
    constructor(container) {
        this._container = container;

        this.postCommentHandler = this.postCommentHandler.bind(this);
        this.deleteCommentByIdHandler = this.deleteCommentByIdHandler.bind(this);
    }

    postCommentHandler() {}

    deleteCommentByIdHandler() {}
}