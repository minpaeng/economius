package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Volatile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolatileRepository extends JpaRepository<Volatile, Integer> {
}
