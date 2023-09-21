package com.ssafy.economius.game.util;

import java.util.Random;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RearrangeRateUtil {

    private static final Random random = new Random();

    @AllArgsConstructor
    @Builder
    @Getter
    public static class RateRange {

        int lowRate;
        int highRate;
        int closingRate;
    }

    public static RateRange getRanges(int lowerBound, int upperBound) {
        int closingRate = random.nextInt(upperBound - lowerBound + 1) + lowerBound;
        int lowRate = random.nextInt(closingRate - lowerBound) + lowerBound;
        int highRate = random.nextInt(upperBound - closingRate + 1) + closingRate;

        return new RateRange(lowRate, highRate, closingRate);
    }
}

