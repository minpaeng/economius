package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.EventMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventMoneyRepository extends JpaRepository<EventMoney, Integer> {

    @Query("select e from EventMoney e join fetch e.insuranceType")
    List<EventMoney> findAllWithInsuranceType();
}
