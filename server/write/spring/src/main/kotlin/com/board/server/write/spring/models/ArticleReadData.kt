package com.board.server.write.spring.models

import com.board.server.write.spring.entities.ArticleEntity
import java.time.LocalDateTime
import java.util.*

data class ArticleReadData(
    private val article: ArticleEntity,
    val boardUUID: UUID,
    val createdByUUID: UUID,
) {
    val uuid: UUID = article.uuid
    val title: String = article.title
    val titleHash: String = article.titleHash
    val content: String = article.content
    val createdAt: LocalDateTime = article.createdAt
    val updatedAt: LocalDateTime = article.updatedAt
}
