package com.ssafy.economius.oauth;

import com.ssafy.economius.game.entity.mysql.Member;
import com.ssafy.economius.game.repository.mysql.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthLoginService {
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthResponse login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        Member member = findOrCreateMember(oAuthInfoResponse);
        AuthResponse authResponse = AuthResponse.builder()
                .authTokens(authTokensGenerator.generate(member.getMemberId()))
                .player(member.getMemberId())
                .nickname(member.getNickname())
                .build();
        return authResponse;
    }

    private Member findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = memberRepository.findByEmail(oAuthInfoResponse.getEmail());
        if (member != null) {
            return member;
        } else {
            return newMember(oAuthInfoResponse);
        }
    }

    private Member newMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .name(oAuthInfoResponse.getNickname())
                .email(oAuthInfoResponse.getEmail())
                .nickname(oAuthInfoResponse.getNickname())
                .joinDate(LocalDateTime.now())
                .editDate(LocalDateTime.now())
                .build();
        log.info(member.toString());
        memberRepository.save(member);
        return member;
    }
}