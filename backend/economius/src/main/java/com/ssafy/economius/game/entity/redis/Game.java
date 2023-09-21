package com.ssafy.economius.game.entity.redis;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
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
    private List<Long> playerSequence;
    private int gameTurn;
    private Map<Long, Portfolio> portfolios;
    private Map<Integer, Integer> tax;

    // 경제 asset
    private Gold gold;
    private Map<Integer, Building> buildings;
    private List<Stock> stocks;
    private List<Insurance> insurances;
    private Map<Integer, Saving> savings;
    private InterestRate interestRate;

    public void initializePlayerSequence() {
        playerSequence = new ArrayList<>(List.copyOf(players));

        Random random = new Random();

        // 번호를 섞기 위해 Fisher-Yates 알고리즘을 사용
        for (int i = playerSequence.size() - 1; i > 0; i--) {
            // 배열 내에서 현재 인덱스 이하의 랜덤한 인덱스를 선택
            int randomIndex = random.nextInt(i + 1);

            // 현재 인덱스와 랜덤하게 선택된 인덱스의 값을 교환
            long temp = playerSequence.get(i);
            playerSequence.set(i, playerSequence.get(randomIndex));
            playerSequence.set(randomIndex, temp);
        }
    }

    public void initializePortfolio(Map<Long, Portfolio> portfolios) {
        this.portfolios = portfolios;
    }

    public int getPrizeByPlayer(Long player) {
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

    public void updatePrize() {
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
