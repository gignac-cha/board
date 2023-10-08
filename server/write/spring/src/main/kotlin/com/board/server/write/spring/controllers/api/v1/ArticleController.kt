package com.board.server.write.spring.controllers.api.v1

import com.board.server.write.spring.entities.UserEntity
import com.board.server.write.spring.models.*
import com.board.server.write.spring.repositories.ArticleRepository
import com.board.server.write.spring.repositories.BoardRepository
import com.board.server.write.spring.repositories.UserRepository
import com.board.server.write.spring.repositories.findByUUID
import com.board.server.write.spring.services.ArticleService
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import java.util.*

@RestController
@RequestMapping("/api/v1/boards/{boardUUID}/articles")
class ArticleController(
    private val boardRepository: BoardRepository,
    private val articleService: ArticleService,
    private val articleRepository: ArticleRepository,
    private val userRepository: UserRepository,
) {
    @GetMapping
    fun getAll(
        @PathVariable("boardUUID") boardUUID: UUID,
    ): GetArticlesResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetArticlesResponse(forceSuccess = false)
        val articles = articleRepository.findAllByBoardOrderByCreatedAtDesc(board)
            .map { ArticleSimpleReadData(it, boardUUID, it.createdBy.uuid) }
        return GetArticlesResponse(articles)
    }

    @GetMapping("/{uuid}")
    fun getByUUID(
        @PathVariable("boardUUID") boardUUID: UUID,
        @PathVariable("uuid") uuid: UUID,
    ): GetArticleResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetArticleResponse()
        val article = articleRepository.findByUUID(uuid)
            ?: return GetArticleResponse()
        return GetArticleResponse(ArticleReadData(article, boardUUID, article.createdBy.uuid))
    }

    @PostMapping
    @Transactional
    fun post(
        @RequestAttribute("user") user: UserEntity,
        @PathVariable("boardUUID") boardUUID: UUID,
        @RequestBody articleBody: PostArticleBody,
    ): GetArticleResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetArticleResponse()
        val article = ArticleCreateData(board, articleBody.title, articleBody.content, user).toEntity()
        article.titleHash = articleService.resolveTitleHash(article)
        return GetArticleResponse(ArticleReadData(articleRepository.save(article), boardUUID, user.uuid))
    }

    @PutMapping("/{uuid}")
    @Transactional
    fun put(
        @RequestAttribute("user") user: UserEntity,
        @PathVariable("boardUUID") boardUUID: UUID,
        @PathVariable("uuid") uuid: UUID,
        @RequestBody articleBody: PutArticleBody,
    ): GetArticleResponse {
        val board = boardRepository.findByUUID(boardUUID)
            ?: return GetArticleResponse()
        val article = articleRepository.findByUUID(uuid)
            ?: return GetArticleResponse()
        article.title = articleBody.title
        article.content = articleBody.content
        article.updatedAt = LocalDateTime.now()
        return GetArticleResponse(ArticleReadData(articleRepository.save(article), boardUUID, user.uuid))
    }
}
