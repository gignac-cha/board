package com.board.server.write.spring.models

data class GetArticleResponse(val article: ArticleReadData? = null) {
    val success = article != null
}
