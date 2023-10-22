package com.board.server.write.spring.repositories

import com.board.server.write.spring.entities.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<UserEntity, Long> {
    fun findByUniqueId(uniqueId: String): UserEntity?
    fun findByUuid(uuid: UUID): UserEntity?
}

fun UserRepository.findByUUID(uuid: UUID): UserEntity? = findByUuid(uuid)
