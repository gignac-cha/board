package com.board.server.write.spring.controllers.api.v1

import com.board.server.write.spring.models.*
import com.board.server.write.spring.repositories.BoardRepository
import com.board.server.write.spring.repositories.findByUUID
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/v1/boards")
class BoardController(private val boardRepository: BoardRepository) {
    @GetMapping
    fun getAll(): GetBoardsResponse {
        return GetBoardsResponse(boardRepository.findAll().map { BoardSimpleReadData(it) })
    }

    @GetMapping("/{uuid}")
    fun getByUUID(@PathVariable("uuid") uuid: UUID): GetBoardResponse {
        val board = boardRepository.findByUUID(uuid)
            ?: return GetBoardResponse()
        return GetBoardResponse(BoardReadData(board))
    }
}
