package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.OracleRequest;
import com.ssafy.economius.game.dto.response.OracleResponse;
import com.ssafy.economius.game.service.CornerService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class CornerController {

    private final CornerService cornerService;
    private final SimpMessagingTemplate template;

    @MessageMapping(value = "/{roomId}/oracle")
    public void oracle(@DestinationVariable int roomId, OracleRequest oracleRequest) {
        log.info(roomId + ": oracle 호출 -> " + oracleRequest.toString());

        OracleResponse oracleResponse = cornerService.oracle(roomId);

        log.info(roomId + ": oracle 결과 -> " + oracleResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "oracle");
        template.convertAndSend("/sub/" + roomId + "/" + oracleRequest.getPlayer(), oracleResponse,
            headers);
    }
}
