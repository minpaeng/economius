package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InsuranceRepository extends JpaRepository<Insurance, Integer> {

    @Query("select i from Insurance i join fetch i.insuranceType")
    List<Insurance> findAllWithInsuranceType();
}
