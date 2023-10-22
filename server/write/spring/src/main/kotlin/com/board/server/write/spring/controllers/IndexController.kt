package com.board.server.write.spring.controllers

import com.board.server.write.spring.models.GetIndexResponse
import com.board.server.write.spring.repositories.BoardRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping()
class IndexController(private val boardRepository: BoardRepository) {
    @GetMapping
    fun get(): GetIndexResponse {
        return GetIndexResponse()
    }
}
