package com.ssafy.economius.oauth;

import com.ssafy.economius.game.entity.mysql.Member;
import com.ssafy.economius.game.repository.mysql.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthLoginService {
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        Long memberId = findOrCreateMember(oAuthInfoResponse);
        return authTokensGenerator.generate(memberId);
    }

    private Long findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = memberRepository.findByEmail(oAuthInfoResponse.getEmail());
        if (member != null) {
            return member.getMemberId();
        } else {
            return newMember(oAuthInfoResponse);
        }
    }

    private Long newMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .name(oAuthInfoResponse.getNickname())
                .email(oAuthInfoResponse.getEmail())
                .nickname(oAuthInfoResponse.getNickname())
                .joinDate(LocalDateTime.now())
                .editDate(LocalDateTime.now())
                .build();
        log.info(member.toString());
        return memberRepository.save(member).getMemberId();
    }
}