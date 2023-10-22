package com.board.server.write.spring.models

data class GetCommentResponse(val comment: CommentReadData? = null) {
    val success = comment != null
}
