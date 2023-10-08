package com.board.server.write.spring.filters

import com.board.server.write.spring.repositories.UserRepository
import com.board.server.write.spring.repositories.findByUUID
import io.jsonwebtoken.Jwts
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.filter.OncePerRequestFilter
import java.util.*

@Service
class JWTAuthenticationFilter(
    val userRepository: UserRepository,

    @Value("\${custom-properties.jwt.secret-key}")
    val jwtSecretKey: String,
) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        request.getHeader("Authorization")?.let {
            val requestToken = it.removePrefix("Bearer ")
            val key = Base64.getEncoder().encodeToString(jwtSecretKey.toByteArray())
            val jwt = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(requestToken)
            val uuid = jwt.body["uuid"]
            val user = userRepository.findByUUID(UUID.fromString("$uuid"))
            request.setAttribute("user", user)
        }
        filterChain.doFilter(request, response)
    }
}
