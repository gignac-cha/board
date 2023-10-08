package com.board.server.write.spring.models

import com.board.server.write.spring.entities.BoardEntity
import java.util.*

data class BoardSimpleReadData(private val board: BoardEntity) {
    val uuid: UUID = board.uuid
    val uniqueId: String = board.uniqueId
    val name: String = board.name
}
