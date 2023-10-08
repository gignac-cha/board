package com.board.server.write.spring.controllers.api.v1

import com.board.server.write.spring.entities.UserEntity
import com.board.server.write.spring.models.GetUserResponse
import com.board.server.write.spring.models.UserReadData
import com.board.server.write.spring.repositories.UserRepository
import com.board.server.write.spring.repositories.findByUUID
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userRepository: UserRepository,
) {
    @GetMapping("/me")
    fun getMe(@RequestAttribute("user") user: UserEntity?): GetUserResponse {
        user ?: return GetUserResponse()
        return GetUserResponse(UserReadData(user))
    }

    @GetMapping("/{uuid}")
    fun getUser(@PathVariable("uuid") uuid: UUID): GetUserResponse {
        val user = userRepository.findByUUID(uuid)
            ?: return GetUserResponse()
        return GetUserResponse(UserReadData(user))
    }
}
