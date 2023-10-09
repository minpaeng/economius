package com.ssafy.economius.game.entity.redis;


import static com.ssafy.economius.game.enums.RateEnum.MAX_BOARD_SIZE;

import com.ssafy.economius.game.dto.mysql.PrevIssueDto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Slf4j
@Data
@ToString
public class Game {

    @Id
    private int roomId;
    // 0번 index 가 호스트
    private List<Long> bankruptcyPlayers;
    // 게임 시작하면 0번 index가 1위 다음 2위...
    private List<Long> players;
    private Map<Long, Integer> characters;
    private Map<Long, String> nicknames;
    private List<Long> playerSequence;
    private Long currentPlayerToRoll;
    private int gameTurn;
    private int maxGameTurn;
    private Map<Long, Portfolio> portfolios;
    private Map<Integer, Integer> tax;
    private Map<Long, Integer> locations;

    // 경제 asset
    private Gold gold;
    private Map<Integer, Building> buildings;
    private Map<Integer, Insurance> insurances;
    private Map<Integer, Stock> stocks;
    private Map<Integer, Saving> savings;
    private InterestRate interestRate;

    // 경제 이슈, 전조증상
    private int issueIdx;
    private List<Issue> issues;
    private Issue currentIssue;
    private List<PrevIssueDto> currentPrevIssues;

    // 찬스 이벤트 -
    private Event event;

    public Long getCapablePlayerToFinish(){
        return playerSequence.get((gameTurn) % 4);
    }

    public void updatePlayerToRoll(){
        currentPlayerToRoll = playerSequence.get((gameTurn + 1) % 4);
    }

    public void initializeCharacter(List<Integer> randoms) {
        int index = 0;
        characters = new HashMap<>();
        for (Long player : players) {
            characters.put(player, randoms.get(index++));
        }
    }

    public Issue getNextIssue() {
        if (issueIdx < 0) {
            return null;
        }
        return issues.get(issueIdx);
    }

    public void initializeLocations() {
        log.info("사용자 위치 초기화");
        locations = new HashMap<>();
        players.forEach(player -> locations.put(player, 0));
    }

    public int rearrangePlayer(int diceNumber, Long player) {
        log.info("주사위 굴린 플레이어 : " + player);
        Integer location = locations.get(player);
        log.info("주사위 굴린 플레이어 : " + player + "-> " + location + "위치");
        int nextLocation = (location + diceNumber) % MAX_BOARD_SIZE.getValue();
        log.info("주사위 굴린 플레이어 : " + player + "-> " + nextLocation + "위치");
        locations.put(player, nextLocation);
        return nextLocation;
    }

    public void initializePlayerSequence() {
//        playerSequence = new ArrayList<>(List.copyOf(players));
//
//        Random random = new Random();
//
//        // 번호를 섞기 위해 Fisher-Yates 알고리즘을 사용
//        for (int i = playerSequence.size() - 1; i > 0; i--) {
//            // 배열 내에서 현재 인덱스 이하의 랜덤한 인덱스를 선택
//            int randomIndex = random.nextInt(i + 1);
//
//            // 현재 인덱스와 랜덤하게 선택된 인덱스의 값을 교환
//            long temp = playerSequence.get(i);
//            playerSequence.set(i, playerSequence.get(randomIndex));
//            playerSequence.set(randomIndex, temp);
//        }

        setPracticePlayerSequence();

        currentPlayerToRoll = playerSequence.get(0);
    }

    private void setPracticePlayerSequence() {
        this.playerSequence = new ArrayList<>();
        this.playerSequence.add(this.players.get(3));
        this.players.add(this.players.get(0));
        this.players.add(this.players.get(1));
        this.players.add(this.players.get(2));
    }

    public void initializePortfolio(Map<Long, Portfolio> portfolios) {
        this.portfolios = portfolios;
    }


    public void sortPlayersByTotalMoney() {
        if(players != null && portfolios != null) {
            players = players.stream()
                    .sorted((player1, player2) -> {
                        Portfolio portfolio1 = portfolios.get(player1);
                        Portfolio portfolio2 = portfolios.get(player2);
                        // null check
                        long totalMoney1 = portfolio1 != null ? portfolio1.getTotalMoney() : 0;
                        long totalMoney2 = portfolio2 != null ? portfolio2.getTotalMoney() : 0;

                        // 내림차순 정렬
                        return Long.compare(totalMoney2, totalMoney1);
                    })
                    .collect(Collectors.toList());
        }
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
        entries.sort((o1, o2) -> Integer.compare(
            o2.getValue().getTotalMoney(),
            o1.getValue().getTotalMoney()));

        int prize = 0;
        for (Entry<Long, Portfolio> entry : entries) {
            players.set(prize++, entry.getKey());
        }
    }

    public int payBuildingFee(Long player, Long owner, int buildingId) {
        if (owner == null || owner.equals(player)) {
            return 0;
        }
        int playerMoney = this.portfolios.get(player).getMoney();
        int ownerMoney = this.portfolios.get(owner).getMoney();
        int buildingFee = this.buildings.get(buildingId).getBuildingFee();

        this.portfolios.get(player).setMoney(playerMoney - buildingFee);
        this.portfolios.get(owner).setMoney(ownerMoney + buildingFee);
        return buildingFee;
    }

    public void proceedBankruptcy(Long player) {
        this.getPortfolios().get(player).setMoney(-1);
        this.players.remove(player);
        this.bankruptcyPlayers.add(player);
    }

    public int updateGameTurn() {
        gameTurn++;
        // 추후 주석 풀어야 함
//        if (gameTurn == maxGameTurn) {
//            return -1;
//        }
        return gameTurn;
    }
}
