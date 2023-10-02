package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.AssetChangeDto;
import com.ssafy.economius.game.dto.response.OracleResponse;
import com.ssafy.economius.game.entity.redis.AssetChange;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Issue;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.enums.VolatileEnum;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OracleService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public OracleResponse oracle(int roomId) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Issue nextIssue = game.getNextIssue();
        if (nextIssue == null){
            return OracleResponse.builder()
                .issueId(-1)
                .build();
        }

        OracleResponse oracleResponse = makeOracleResponse(nextIssue);
        List<AssetChange> assetChanges = game.getIssues()
                .get(game.getIssueIdx() + 1)
                .getCurrentAssetChanges();
        setAssetChanges(assetChanges, oracleResponse);

        return oracleResponse;
    }

    private void setAssetChanges(List<AssetChange> assetChanges, OracleResponse oracleResponse) {
        String type;
        for (AssetChange assetChange : assetChanges) {
            type = assetChange.getAssetType();
            if (type.equals(VolatileEnum.GOLD.getValue())) {
                oracleResponse.setGoldChange(makeAssetChangeDto(assetChange, null));
            } else if (type.equals(VolatileEnum.INTEREST_RATE.getValue())) {
                oracleResponse.setInterestRateChange(makeAssetChangeDto(assetChange, null));
            } else if (type.equals(VolatileEnum.BUIDING.getValue())) {
                oracleResponse.setBuildingChange(makeAssetChangeDto(assetChange, null));
            } else if (type.equals(VolatileEnum.STOCK.getValue())) {
                int stockId = assetChange.getAssetId();
                oracleResponse.getStockChanges().add(makeAssetChangeDto(assetChange, InitialData.STOCKS.get(stockId).getType()));
            }
        }
    }

    private AssetChangeDto makeAssetChangeDto(AssetChange assetChange, String stockType) {
        return AssetChangeDto.builder()
                .assetType(assetChange.getAssetType())
                .assetId(assetChange.getAssetId())
                .stockType(stockType)
                .changePercentage(assetChange.getChangeRate().getValue())
                .changeCategory(assetChange.getChangeRate().getMessage())
                .build();
    }

    private OracleResponse makeOracleResponse(Issue nextIssue) {
        return OracleResponse.builder()
            .url(nextIssue.getUrl())
            .description(nextIssue.getDescription())
            .issueId(nextIssue.getIssueId())
            .name(nextIssue.getName())
            .country(nextIssue.getCountry())
            .type(nextIssue.getType())
            .year(nextIssue.getYear())
            .stockChanges(new ArrayList<>())
            .build();
    }
}
