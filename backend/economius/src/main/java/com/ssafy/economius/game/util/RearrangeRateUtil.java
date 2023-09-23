package com.ssafy.economius.game.util;

import java.util.Random;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RearrangeRateUtil {

    private static final Random random = new Random();

    public static int getRanges(int lowerBound, int upperBound) {
        return random.nextInt(upperBound + 1) - random.nextInt(-lowerBound + 1);
    }
}

