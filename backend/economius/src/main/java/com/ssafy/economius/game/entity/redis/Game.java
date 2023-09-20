package com.ssafy.economius.game.entity.redis;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    private int roomId;
    // 0번 index 가 호스트
    // 게임 시작하면 0번 index가 1위 다음 2위...
    private List<Long> players;
    private int gameTurn;
    private Map<Long, Portfolio> portfolios;
    private Map<Integer, Integer> tax;

    // 경제 asset
    private Gold gold;
    private Map<Integer, Building> buildings;
    private List<Stock> stocks;
    private List<Insurance> insurances;
    private List<Saving> savings;
    private InterestRate interestRate;

    public void initializePortfolio(Map<Long, Portfolio> portfolios) {
        this.portfolios = portfolios;
    }

    public int getPrizeByPlayer(Long player){
        // 순위 구하기
        int prize = 1;
        for (Long gamePlayer : players) {
            if (gamePlayer.equals(player)) {
                break;
            }
            prize++;
        }
        return prize;
    }

    public void updatePrize(){
        List<Entry<Long, Portfolio>> entries = new LinkedList<>(portfolios.entrySet());
        entries.sort(new Comparator<Entry<Long, Portfolio>>() {
            @Override
            public int compare(Entry<Long, Portfolio> o1, Entry<Long, Portfolio> o2) {
                return Integer.compare(o2.getValue().getTotalMoney(),
                    o1.getValue().getTotalMoney());
            }
        });

        int prize = 0;
        for (Entry<Long, Portfolio> entry : entries) {
            players.set(prize++, entry.getKey());
        }
    }
}
