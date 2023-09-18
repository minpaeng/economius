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
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer savingsId;
    private String name;
    private Integer monthlyDeposit;
    private Integer finishCount;
    private Integer finishRate;
}
