package com.ssafy.economius.game.entity.mysql;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class EventMoney {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventMoneyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insurance_type_id")
    private InsuranceType insuranceType;
    private String name;
    private String description;
    private Integer money;
    private String url;
}
