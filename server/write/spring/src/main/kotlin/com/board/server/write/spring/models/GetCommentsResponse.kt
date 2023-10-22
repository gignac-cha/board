package com.board.server.write.spring.models

data class GetCommentsResponse(
    val comments: List<CommentReadData> = listOf(),
    private val forceSuccess: Boolean = true,
) {
    val success = forceSuccess || comments.isNotEmpty()
}
