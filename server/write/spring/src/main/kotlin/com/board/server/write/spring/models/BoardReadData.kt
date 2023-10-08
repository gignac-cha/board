package com.board.server.write.spring.models

import com.board.server.write.spring.entities.BoardEntity
import java.time.LocalDateTime
import java.util.*

data class BoardReadData(private val board: BoardEntity) {
    val uuid: UUID = board.uuid
    val uniqueId: String = board.uniqueId
    val name: String = board.name
    val description: String = board.description
    val createdAt: LocalDateTime = board.createdAt
    val updatedAt: LocalDateTime = board.updatedAt
}
