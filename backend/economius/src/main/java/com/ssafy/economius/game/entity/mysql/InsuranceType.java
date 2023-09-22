package com.ssafy.economius.game.entity.mysql;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class InsuranceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
}
