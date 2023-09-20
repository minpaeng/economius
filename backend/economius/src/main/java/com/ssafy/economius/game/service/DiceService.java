package com.ssafy.economius.game.service;

import com.ssafy.economius.game.repository.redis.GameRepository;
import io.swagger.v3.oas.annotations.servers.Server;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Server
@Slf4j
@RequiredArgsConstructor
public class DiceService {

    private final GameRepository gameRepository;

    public void diceRoll(){

    }

    public void getDiceSequence(){

    }
}
