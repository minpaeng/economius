package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum DescriptionTitleEnum {

    NEWSFLASH("[속보]", "속보"),
    GOLD("[금]", "금"),
    INTEREST_RATE("[금리]", "금리"),
    BUILDING("[부동산]", "부동산"),
    STOCK("[주식]", "주식"),
    OIL("[석유]", "석유"),
    ELECTRRICITY("[전기]", "전기"),
    CHEMISTRY("[화학]", "화학"),
    STEEL("[철강]", "철강"),
    MEDICINE("[제약]", "제약"),
    BIO("[바이오]", "바이오"),
    FASHION("[패션]", "패션"),
    FOOD("[식품]", "식품"),
    MOBILITY("[자동차]", "자동차"),
    SEMICONDUCTOR("[반도체]", "반도체"),
    TRANSIT("[운송]", "운송"),
    CONSTRUCTION("[건설]", "건설"),
    COMMUNICATION("[통신]", "통신"),
    SOFTWARE("[소프트웨어]", "소프트웨어"),
    TOURISM("[관광]", "관광"),
    ENTERTAINMENT("[엔터테인먼트]", "엔터");

    private final String title;
    private final String type;

    DescriptionTitleEnum(String title, String type) {
        this.title = title;
        this.type = type;
    }
}
