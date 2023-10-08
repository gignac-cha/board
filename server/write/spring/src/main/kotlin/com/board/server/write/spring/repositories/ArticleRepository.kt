package com.board.server.write.spring.repositories

import com.board.server.write.spring.entities.ArticleEntity
import com.board.server.write.spring.entities.BoardEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface ArticleRepository : JpaRepository<ArticleEntity, Long> {
    fun findAllByBoardOrderByCreatedAtDesc(board: BoardEntity): List<ArticleEntity>
    fun findByUuid(uuid: UUID): ArticleEntity?
    fun findAllByTitleHashStartingWith(titleHash: String): List<ArticleEntity>
}

fun ArticleRepository.findByUUID(uuid: UUID): ArticleEntity? = findByUuid(uuid)
