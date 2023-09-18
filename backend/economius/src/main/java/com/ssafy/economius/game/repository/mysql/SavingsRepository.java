package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Savings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavingsRepository extends JpaRepository<Savings, Integer> {
}
