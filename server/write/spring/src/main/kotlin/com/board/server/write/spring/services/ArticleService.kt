package com.board.server.write.spring.services

import com.board.server.write.spring.entities.ArticleEntity
import com.board.server.write.spring.repositories.ArticleRepository
import com.board.server.write.spring.utilities.HashGenerator
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.ZoneOffset
import kotlin.math.min

@Service
class ArticleService(
    private val articleRepository: ArticleRepository
) {
    val maximumTitleLength = 100
    val separatorLength = 1 // NOTE: '-'
    val minimumHashLength = 5

    @Transactional
    fun resolveTitleHash(article: ArticleEntity): String {
        val hashText = listOf(
            article.board.uniqueId,
            article.title,
            article.createdBy.uniqueId,
            article.createdAt.toInstant(ZoneOffset.UTC).toEpochMilli(),
        ).joinToString(":") // NOTE: "<board-unique-id>:<article-title>:<user-unique-id>:<article-created-at>"
        val hash = HashGenerator.from(hashText)
        val replacedTitle = article.title
            .slice(0 until min(article.title.length, maximumTitleLength))
            .replace(Regex("""[^0-9a-zA-Z]"""), "-")
            .split("-")
            .filter { it.isNotEmpty() }
            .joinToString("-") // NOTE: "https://www.hostname.com/?q=query#fragment" -> "https-www-hostname-com-q-query-fragment"
        val titleHash = "${replacedTitle}-${hash}"
        val shortestTitleHash = titleHash.slice(0 until article.title.length + separatorLength + minimumHashLength)
        val articles = articleRepository.findAllByTitleHashStartingWith(shortestTitleHash)
        if (articles.isNotEmpty()) {
            val sortedArticles = articles.sortedByDescending { it.titleHash.length }
            return titleHash.slice(0 until sortedArticles.elementAt(0).titleHash.length + 1)
        }
        return shortestTitleHash
    }
}
