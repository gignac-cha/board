package com.board.server.write.spring.models

import com.board.server.write.spring.entities.BoardEntity

data class BoardCreateData(
    val uniqueId: String,
    val name: String,
    val description: String,
) {
    fun toEntity(): BoardEntity {
        return BoardEntity(
            uniqueId = this.uniqueId,
            name = this.name,
            description = this.description
        )
    }
}
