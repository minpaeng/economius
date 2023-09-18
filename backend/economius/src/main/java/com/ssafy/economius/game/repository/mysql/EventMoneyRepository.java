package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.EventMoney;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventMoneyRepository extends JpaRepository<EventMoney, Integer> {
}
