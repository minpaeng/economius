package com.ssafy.economius.oauth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseBody {
    private Long player;
    private String nickname;
}