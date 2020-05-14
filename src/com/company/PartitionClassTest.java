package com.company;

import static org.junit.Assert.*;
import org.junit.*;

import java.util.ArrayList;
import java.util.Arrays;

public class PartitionClassTest {

    @Test
    public void testPart() {
        ArrayList<Integer> l1 = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            l1.add(i);
        }
        ArrayList<ArrayList<Integer>> expected = new ArrayList<ArrayList<Integer>> ();
        expected.add(new ArrayList<Integer>(Arrays.asList((Integer)1,(Integer)2)));
        expected.add(new ArrayList<Integer>(Arrays.asList((Integer)3,(Integer)4)));
        expected.add(new ArrayList<Integer>(Arrays.asList((Integer)5)));
        assertEquals(expected, PartitionClass.part(l1, 2));
    }
}