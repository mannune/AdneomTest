package com.company;
import java.util.ArrayList;

public class PartitionClass {


        public static ArrayList<ArrayList<Integer>> part (ArrayList<Integer> liste, Integer taille){

            ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
            ArrayList<Integer> temp = new ArrayList<Integer>();

            int i=0,j=0,k=0;
            while (i<liste.size())
            {
                temp.clear();
                for ( j = 0; j < taille; j++)
                {
                    if((j+i)<liste.size())
                        temp.add(liste.get(i+j));
                }
                result.add((ArrayList<Integer>) temp.clone());
                i+=taille;
                k++;
            }

            return result;
        }
}