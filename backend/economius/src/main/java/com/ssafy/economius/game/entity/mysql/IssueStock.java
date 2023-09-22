package com.ssafy.economius.game.entity.mysql;

import lombok.AccessLevel;
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
public class IssueStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issueStockId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;
    private String assetType;
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;
}
