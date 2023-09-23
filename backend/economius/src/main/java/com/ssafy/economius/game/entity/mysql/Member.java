package com.ssafy.economius.game.entity.mysql;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String name;
    private String email;
    private String nickname;
    @CreatedDate
    private LocalDateTime joinDate;
    @LastModifiedDate
    private LocalDateTime editDate;

    @Builder
    public Member(String name, String email, String nickname) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.joinDate = LocalDateTime.now();
        this.editDate = LocalDateTime.now();
    }
}
