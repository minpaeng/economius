package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.CreateRoomRequest;
import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/room")
@ToString
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @PostMapping("/create")
    public ResponseEntity<CreateRoomResponse> createRoom(@RequestBody CreateRoomRequest createRoomRequest){
        return new ResponseEntity<>(
            gameRoomService.createRoom(createRoomRequest.getPlayer(), createRoomRequest.getNickname()),
            HttpStatus.OK);
    }
}
