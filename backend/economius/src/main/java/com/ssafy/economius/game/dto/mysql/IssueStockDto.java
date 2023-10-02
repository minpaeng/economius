package com.ssafy.economius.game.dto.mysql;

import com.ssafy.economius.game.enums.ChangeUnit;
import com.ssafy.economius.game.enums.IssueEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class IssueStockDto {

    private Integer issueStockId;
    private Integer issueId;
    private String name;
    private boolean type;
    private String assetType;
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;

    public IssueEnum getTypeIssueEnum() {
        if (this.type) return IssueEnum.BOOM;
        return IssueEnum.DEPRESSION;
    }

    public ChangeUnit getChangeUnitEnum() {
        for (ChangeUnit c : ChangeUnit.values()) {
            if (this.changeUnit == c.getCode()) return c;
        }
        return ChangeUnit.LOWER;
    }
}
