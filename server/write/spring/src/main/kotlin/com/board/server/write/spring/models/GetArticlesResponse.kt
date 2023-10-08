package com.board.server.write.spring.models

data class GetArticlesResponse(
    val articles: List<ArticleSimpleReadData> = listOf(),
    private val forceSuccess: Boolean = true,
) {
    val success = forceSuccess || articles.isNotEmpty()
}
