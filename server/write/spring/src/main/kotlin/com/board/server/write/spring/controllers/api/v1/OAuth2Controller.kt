package com.board.server.write.spring.controllers.api.v1

import com.board.server.write.spring.enums.OAuth2ProviderType
import com.board.server.write.spring.models.GoogleUser
import com.board.server.write.spring.models.OAuth2SignInResponse
import com.board.server.write.spring.models.SignInBody
import com.board.server.write.spring.services.UserService
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate
import java.util.*

@RestController
@RequestMapping("/api/v1/oauth2")
class OAuth2Controller(
    val userService: UserService,

    @Value("\${custom-properties.jwt.secret-key}")
    val jwtSecretKey: String,
) {
    @PostMapping("/sign/in")
    @Synchronized
    fun oAuth2SignIn(@RequestBody signInBody: SignInBody): Any? {
        val restTemplate = RestTemplate()
        val providerType = OAuth2ProviderType.from(signInBody.providerType)
        val url = OAuth2ProviderType.getURL(providerType)
        val headers = HttpHeaders().also {
            it.set("Authorization", "Bearer ${signInBody.accessToken}")
        }
        val request = HttpEntity<Unit>(headers)
        val response = restTemplate.exchange(url, HttpMethod.GET, request, GoogleUser::class.java)
        val body = response.body
            ?: return OAuth2SignInResponse()
        val user = userService.signIn(providerType, body.id) ?: userService.signUp(providerType, body.id)
        val base64EncodedSecretKey = Base64.getEncoder().encodeToString(jwtSecretKey.toByteArray())
        val requestToken = Jwts.builder()
            .claim("uuid", user.uuid)
            .signWith(SignatureAlgorithm.HS512, base64EncodedSecretKey)
            .compact()
        return OAuth2SignInResponse(requestToken)
    }
}
