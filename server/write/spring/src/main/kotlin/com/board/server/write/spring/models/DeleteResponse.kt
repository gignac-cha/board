package com.board.server.write.spring.models

import java.util.*

data class DeleteResponse(val uuid: UUID? = null) {
    val success = uuid != null
}
