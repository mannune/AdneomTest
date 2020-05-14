package com.company;

import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
	// write your code here
        PartitionClass partition = new PartitionClass();
        ArrayList<Integer> entry = new ArrayList<>(Arrays.asList(1,2,3,4,5,6));
        ArrayList<ArrayList<Integer>> result = partition.part(entry, 4);
    }
}
