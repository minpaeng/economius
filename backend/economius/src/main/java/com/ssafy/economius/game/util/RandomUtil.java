package com.ssafy.economius.game.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

public class RandomUtil {

    private static final Random random = new Random();

    public static int getRanges(int lowerBound, int upperBound) {
        return random.nextInt(upperBound + 1) - random.nextInt(-lowerBound + 1);
    }

    public static List<Integer> getUniqueRandomNumbers(int size, int lowerBound, int upperBound) {
        Set<Integer> numbers = new HashSet<>();

        while (numbers.size() < size) {
            int randomNumber = random.nextInt(upperBound - lowerBound + 1) + lowerBound;
            numbers.add(randomNumber);
        }

        return new ArrayList<>(numbers);
    }
}

