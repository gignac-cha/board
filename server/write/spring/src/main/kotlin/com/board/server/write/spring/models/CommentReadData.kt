package com.board.server.write.spring.models

import com.board.server.write.spring.entities.CommentEntity
import java.time.LocalDateTime
import java.util.*

data class CommentReadData(
    private val comment: CommentEntity,
    val articleUUID: UUID,
    val createdByUUID: UUID,
) {
    val uuid: UUID = comment.uuid
    val content: String = comment.content
    val createdAt: LocalDateTime = comment.createdAt
    val updatedAt: LocalDateTime = comment.updatedAt
}
