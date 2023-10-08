package com.board.server.write.spring.models

data class GetBoardResponse(val board: BoardReadData? = null) {
    val success = board != null
}
