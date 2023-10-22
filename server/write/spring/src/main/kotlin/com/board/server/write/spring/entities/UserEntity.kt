package com.board.server.write.spring.entities

import com.board.server.write.spring.enums.OAuth2ProviderType
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.time.LocalDateTime
import java.util.*

@Entity(name = "users")
class UserEntity(
    @Column
    var name: String,

    @Column(name = "unique_id", unique = true)
    val uniqueId: String,

    @Column(name = "provider_type")
    val providerType: OAuth2ProviderType,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    val id: Long = -1

    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    val uuid: UUID = UUID.randomUUID()

    @CreatedDate
    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()

    @LastModifiedDate
    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()

    @LastModifiedDate
    @Column(name = "last_signed_at")
    var lastSignedAt: LocalDateTime = LocalDateTime.now()

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "createdBy")
    val articles: List<ArticleEntity> = listOf()

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "createdBy")
    val comments: List<CommentEntity> = listOf()
}
