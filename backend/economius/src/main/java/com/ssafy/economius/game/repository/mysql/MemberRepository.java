package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByEmail(String email);
}
