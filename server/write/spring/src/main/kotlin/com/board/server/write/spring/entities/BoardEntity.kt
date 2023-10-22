package com.board.server.write.spring.entities

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.time.LocalDateTime
import java.util.*

@Entity(name = "boards")
class BoardEntity(
    @Column(name = "unique_id", unique = true)
    val uniqueId: String,

    @Column
    val name: String,

    @Column
    val description: String,
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
    val updatedAt: LocalDateTime = LocalDateTime.now()

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "board")
    val articles: List<ArticleEntity> = listOf()
}
