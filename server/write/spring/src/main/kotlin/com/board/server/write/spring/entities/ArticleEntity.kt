package com.board.server.write.spring.entities

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.time.LocalDateTime
import java.util.*

@Entity(name = "articles")
class ArticleEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    val board: BoardEntity,

    @Column
    var title: String,

    @Column(length = 4096)
    var content: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    val createdBy: UserEntity,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    val id: Long = -1

    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    val uuid: UUID = UUID.randomUUID()

    @Column(name = "title_hash", unique = true)
    var titleHash: String = ""

    @CreatedDate
    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()

    @LastModifiedDate
    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "article")
    val comments: List<CommentEntity> = listOf()
}
