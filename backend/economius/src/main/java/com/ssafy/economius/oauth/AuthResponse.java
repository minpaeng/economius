package com.ssafy.economius.oauth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private AuthTokens authTokens;
    private Long player;
    private String nickname;
}