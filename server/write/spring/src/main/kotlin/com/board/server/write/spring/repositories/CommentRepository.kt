package com.board.server.write.spring.repositories

import com.board.server.write.spring.entities.ArticleEntity
import com.board.server.write.spring.entities.CommentEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CommentRepository : JpaRepository<CommentEntity, Long> {
    fun findAllByArticleAndDeletedFalseOrderByCreatedAt(article: ArticleEntity): List<CommentEntity>
    fun findByUuid(uuid: UUID): CommentEntity?
}

fun CommentRepository.findByUUID(uuid: UUID): CommentEntity? = findByUuid(uuid)
