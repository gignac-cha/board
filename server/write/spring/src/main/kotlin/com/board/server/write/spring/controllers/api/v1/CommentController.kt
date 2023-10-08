package com.board.server.write.spring.controllers.api.v1

import com.board.server.write.spring.entities.UserEntity
import com.board.server.write.spring.models.*
import com.board.server.write.spring.repositories.ArticleRepository
import com.board.server.write.spring.repositories.BoardRepository
import com.board.server.write.spring.repositories.CommentRepository
import com.board.server.write.spring.repositories.findByUUID
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import java.util.*

@RestController
@RequestMapping("/api/v1/boards/{boardUUID}/articles/{articleUUID}/comments")
class CommentController(
    private val boardRepository: BoardRepository,
    private val articleRepository: ArticleRepository,
    private val commentRepository: CommentRepository,
) {
    @GetMapping
    fun getAll(
        @PathVariable("boardUUID") boardUUID: UUID,
        @PathVariable("articleUUID") articleUUID: UUID,
    ): GetCommentsResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetCommentsResponse(forceSuccess = false)
        val article = articleRepository.findByUUID(articleUUID)
            ?: return GetCommentsResponse(forceSuccess = false)
        val comments = commentRepository.findAllByArticleAndDeletedFalseOrderByCreatedAt(article)
            .map { CommentReadData(it, articleUUID, it.createdBy.uuid) }
        return GetCommentsResponse(comments)
    }

    @PostMapping
    @Transactional
    fun post(
        @RequestAttribute("user") user: UserEntity,
        @PathVariable("boardUUID") boardUUID: UUID,
        @PathVariable("articleUUID") articleUUID: UUID,
        @RequestBody commentBody: PostCommentBody,
    ): GetCommentResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetCommentResponse()
        val article = articleRepository.findByUUID(articleUUID)
            ?: return GetCommentResponse()
        val comment = CommentCreateData(article, commentBody.content, user).toEntity()
        return GetCommentResponse(CommentReadData(commentRepository.save(comment), articleUUID, user.uuid))
    }

    @PutMapping("/{uuid}")
    @Transactional
    fun put(
        @RequestAttribute("user") user: UserEntity,
        @PathVariable("boardUUID") boardUUID: UUID,
        @PathVariable("articleUUID") articleUUID: UUID,
        @PathVariable("uuid") uuid: UUID,
        @RequestBody commentBody: PutCommentBody,
    ): GetCommentResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetCommentResponse()
        val article = articleRepository.findByUUID(articleUUID)
            ?: return GetCommentResponse()
        val comment = commentRepository.findByUUID(uuid)
            ?: return GetCommentResponse()
        comment.content = commentBody.content
        comment.updatedAt = LocalDateTime.now()
        return GetCommentResponse(CommentReadData(commentRepository.save(comment), boardUUID, user.uuid))
    }

    @DeleteMapping("/{uuid}")
    @Transactional
    fun delete(
        @RequestAttribute("user") user: UserEntity,
        @PathVariable("boardUUID") boardUUID: UUID,
        @PathVariable("articleUUID") articleUUID: UUID,
        @PathVariable("uuid") uuid: UUID,
    ): DeleteResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return DeleteResponse()
        val article = articleRepository.findByUUID(articleUUID)
            ?: return DeleteResponse()
        val comment = commentRepository.findByUUID(uuid)
            ?: return DeleteResponse()
        comment.deleted = true
        commentRepository.save(comment)
        return DeleteResponse(uuid)
    }
}
