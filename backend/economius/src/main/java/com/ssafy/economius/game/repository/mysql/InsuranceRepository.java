package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRepository extends JpaRepository<Insurance, Integer> {
}
