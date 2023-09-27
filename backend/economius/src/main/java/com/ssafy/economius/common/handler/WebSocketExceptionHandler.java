package com.ssafy.economius.common.handler;

import com.ssafy.economius.common.exception.CustomWebsocketException;
import com.ssafy.economius.common.exception.CustomWebsocketRoomException;
import com.ssafy.economius.common.exception.response.WebsocketErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Map;

@RequiredArgsConstructor
@ControllerAdvice
public class WebSocketExceptionHandler {

    private final SimpMessagingTemplate template;

    @MessageExceptionHandler(CustomWebsocketException.class)
    public void handleCustomException(CustomWebsocketException e) {
        template.convertAndSend(
                "/sub/" + e.getRoomId(),
                WebsocketErrorResponse.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build(),
                Map.of("success", false));
    }

    @MessageExceptionHandler(CustomWebsocketRoomException.class)
    public void handleRoomJoinException(CustomWebsocketRoomException e) {
        template.convertAndSend(
                "/sub/" + e.getPlayer(),
                WebsocketErrorResponse.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build(),
                Map.of("success", false));
    }
}
