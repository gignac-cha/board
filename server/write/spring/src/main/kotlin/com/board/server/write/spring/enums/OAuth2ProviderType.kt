package com.board.server.write.spring.enums

enum class OAuth2ProviderType(val value: String) {
    GOOGLE("GOOGLE");

    companion object {
        fun from(providerType: String): OAuth2ProviderType {
            return when (providerType) {
                "GOOGLE" -> GOOGLE
                else -> throw Error("Invalid provider type: $providerType")
            }
        }

        fun getURL(type: OAuth2ProviderType): String {
            return when (type) {
                GOOGLE -> "https://www.googleapis.com/oauth2/v1/userinfo"
            }
        }
    }
}
