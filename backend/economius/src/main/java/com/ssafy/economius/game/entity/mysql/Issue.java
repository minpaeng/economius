package com.ssafy.economius.game.entity.mysql;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issueId;
    private String name;
    private byte type;
    private String country;
    private String year;
    private String description;
    private String url;
    @OneToMany(mappedBy = "issue")
    private List<IssueStock> issueStocks;
    @OneToMany(mappedBy = "issue")
    private List<PrevIssue> prevIssues;

    public boolean typeByteToBoolean() {
        return this.type != (byte) 0;
    }
}
