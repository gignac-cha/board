package com.board.server.write.spring.models

data class GetUserResponse(val user: UserReadData? = null) {
    val success = user != null
}
