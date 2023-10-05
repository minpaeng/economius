package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.OracleRequest;
import com.ssafy.economius.game.dto.response.IssueResponse;
import com.ssafy.economius.game.service.IssueService;
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
public class IssueController {

    private final IssueService issueService;
    private final SimpMessagingTemplate template;

    @MessageMapping(value = "/{roomId}/oracle")
    public void oracle(@DestinationVariable int roomId, OracleRequest oracleRequest) {
        log.info(roomId + ": oracle 호출 -> " + oracleRequest.toString());

        IssueResponse issueResponse = issueService.issue(roomId);

        log.info(roomId + ": oracle 결과 -> " + issueResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "oracle");
        template.convertAndSend("/sub/" + roomId + "/" + oracleRequest.getPlayer(), issueResponse,
            headers);
    }

    public void issue(int roomId) {
        IssueResponse issueResponse = issueService.issue(roomId);

        log.info(roomId + ": issue 결과 -> " + issueResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "issue");
        template.convertAndSend("/sub/" + roomId, issueResponse, headers);
    }
}
