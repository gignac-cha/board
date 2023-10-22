package com.board.server.write.spring.models

import com.board.server.write.spring.entities.ArticleEntity
import com.board.server.write.spring.entities.BoardEntity
import com.board.server.write.spring.entities.UserEntity

data class ArticleCreateData(
    val board: BoardEntity,
    val title: String,
    val content: String,
    val user: UserEntity,
) {
    fun toEntity(): ArticleEntity {
        return ArticleEntity(
            board = this.board,
            title = this.title,
            content = this.content,
            createdBy = this.user,
        )
    }
}
