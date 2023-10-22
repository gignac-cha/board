package com.board.server.write.spring.utilities

import java.security.MessageDigest

class HashGenerator {
    companion object {
        private const val hexCharacters = "0123456789abcdef"
        private val messageDigest = MessageDigest.getInstance("SHA-512")

        fun from(text: String): String {
            val stringBuilder = StringBuilder()
            val byteArray = messageDigest.digest(text.toByteArray())
            byteArray.forEach {
                val i = it.toInt()
                stringBuilder.append(hexCharacters[i shr 4 and 0xF])
                stringBuilder.append(hexCharacters[i and 0xF])
            }
            return stringBuilder.toString()
        }
    }
}
