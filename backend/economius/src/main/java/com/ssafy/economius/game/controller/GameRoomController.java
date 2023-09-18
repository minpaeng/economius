package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.CreateRoomRequest;
import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @GetMapping("/create")
    public CreateRoomResponse createRoom(CreateRoomRequest createRoomRequest){
        return gameRoomService.createRoom(createRoomRequest.getPlayer());
    }

}
