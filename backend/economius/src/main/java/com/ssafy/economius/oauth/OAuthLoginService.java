package com.ssafy.economius.oauth;

import com.ssafy.economius.game.entity.mysql.Member;
import com.ssafy.economius.game.repository.mysql.MemberRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        Integer memberId = findOrCreateMember(oAuthInfoResponse);
        return authTokensGenerator.generate(memberId);
    }

    private Integer findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member =  memberRepository.findByEmail(oAuthInfoResponse.getEmail());
        if (member != null) {
            return member.getMemberId();
        } else {
            return newMember(oAuthInfoResponse);
        }
    }

    private Integer newMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .name(oAuthInfoResponse.getNickname())
                .email(oAuthInfoResponse.getEmail())
                .nickname("oauth")
                .build();

        return memberRepository.save(member).getMemberId();
    }
}