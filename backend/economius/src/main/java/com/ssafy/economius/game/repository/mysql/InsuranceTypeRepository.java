package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.InsuranceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceTypeRepository extends JpaRepository<InsuranceType, Integer> {
}
