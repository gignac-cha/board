package com.board.server.write.spring.models

data class GetBoardsResponse(
    val boards: List<BoardSimpleReadData>,
    private val forceSuccess: Boolean = true
) {
    val success = forceSuccess || boards.isNotEmpty()
}
