package com.ssafy.economius.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final OAuthLoginService oAuthLoginService;
    @PostMapping("/kakao")
    public ResponseEntity<AuthResponseBody> loginKakao(@RequestBody KakaoLoginParams params) {
        AuthResponse authResponse = oAuthLoginService.login(params);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("accessToken", authResponse.getAuthTokens().getAccessToken());

        AuthResponseBody responseBody = new AuthResponseBody(authResponse.getPlayer(), authResponse.getNickname());
        return ResponseEntity.ok().headers(responseHeaders).body(responseBody);
    }
}
