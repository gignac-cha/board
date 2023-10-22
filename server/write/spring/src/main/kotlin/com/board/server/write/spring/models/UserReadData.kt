package com.board.server.write.spring.models

import com.board.server.write.spring.entities.UserEntity
import java.time.LocalDateTime
import java.util.*

data class UserReadData(private val user: UserEntity) {
    val uuid: UUID = user.uuid
    val name: String = user.name
    val createdAt: LocalDateTime = user.createdAt
    val updatedAt: LocalDateTime = user.updatedAt
    val lastSignedAt: LocalDateTime = user.lastSignedAt
}
