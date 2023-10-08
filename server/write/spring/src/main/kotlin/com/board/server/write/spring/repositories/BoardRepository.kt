package com.board.server.write.spring.repositories

import com.board.server.write.spring.entities.BoardEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface BoardRepository : JpaRepository<BoardEntity, Long> {
    fun findByUuid(uuid: UUID): BoardEntity?
}

fun BoardRepository.findByUUID(uuid: UUID): BoardEntity? = findByUuid(uuid)
