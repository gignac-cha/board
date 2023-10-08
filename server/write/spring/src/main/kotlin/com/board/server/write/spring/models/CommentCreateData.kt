package com.board.server.write.spring.models

import com.board.server.write.spring.entities.ArticleEntity
import com.board.server.write.spring.entities.CommentEntity
import com.board.server.write.spring.entities.UserEntity

data class CommentCreateData(
    val article: ArticleEntity,
    val content: String,
    val user: UserEntity,
) {
    fun toEntity(): CommentEntity {
        return CommentEntity(
            article = this.article,
            content = this.content,
            createdBy = this.user,
        )
    }
}
