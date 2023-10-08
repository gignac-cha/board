package com.board.server.write.spring.models

data class GoogleUser(
        val id: String,
        val email: String,
        val verified_email: String,
        val name: String,
        val given_name: String,
        val family_name: String,
        val picture: String,
        val locale: String,
)
