package com.board.server.write.spring.models

import java.time.LocalDateTime

data class GetIndexResponse(
    val success: Boolean = true,
    val now: LocalDateTime = LocalDateTime.now(),
)
