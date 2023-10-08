package com.board.server.write.spring.models

data class OAuth2SignInResponse(val requestToken: String? = null) {
    val success = requestToken != null
}
