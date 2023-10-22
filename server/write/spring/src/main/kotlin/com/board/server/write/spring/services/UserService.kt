package com.board.server.write.spring.services

import com.board.server.write.spring.entities.UserEntity
import com.board.server.write.spring.enums.OAuth2ProviderType
import com.board.server.write.spring.repositories.UserRepository
import com.board.server.write.spring.utilities.RandomNameGenerator
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun signUp(providerType: OAuth2ProviderType, id: String): UserEntity {
        val uniqueId = "${providerType}:${id}"
        val user = UserEntity(
            name = RandomNameGenerator.generate(),
            uniqueId = uniqueId,
            providerType = providerType,
        )
        return userRepository.save(user)
    }

    fun signIn(providerType: OAuth2ProviderType, id: String): UserEntity? {
        val uniqueId = "${providerType}:${id}"
        val user = userRepository.findByUniqueId(uniqueId)
            ?: return null
        user.lastSignedAt = LocalDateTime.now()
        return userRepository.save(user)
    }
}
