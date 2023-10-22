package com.board.server.write.spring.models

import com.board.server.write.spring.entities.ArticleEntity
import java.time.LocalDateTime
import java.util.*

data class ArticleSimpleReadData(
    private val article: ArticleEntity,
    val boardUUID: UUID,
    val createByUUID: UUID,
) {
    val uuid: UUID = article.uuid
    val title: String = article.title
    val titleHash: String = article.titleHash
    val createdAt: LocalDateTime = article.createdAt
    val updatedAt: LocalDateTime = article.updatedAt
}
