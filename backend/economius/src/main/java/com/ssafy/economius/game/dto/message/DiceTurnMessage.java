package com.ssafy.economius.game.dto.message;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DiceTurnMessage {

    private List<Long> playerSequence;
}
