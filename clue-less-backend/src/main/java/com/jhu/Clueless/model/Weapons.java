package com.jhu.Clueless.model;

import java.util.HashMap;
import java.util.Random;

public class Weapons {
    private HashMap<WeaponType,String> WeaponsMap;
    public void initialize(){
        WeaponsMap = new HashMap<>();
        randomizeWeaponLocation();
    }
    public void moveWeapon(WeaponType weapon,Integer x, Integer y){
        WeaponsMap.put(weapon,CoordinatesToString(x,y));
    }
    private String CoordinatesToString(Integer x, Integer y){
        return "["+x.toString()+","+y.toString()+"]";
    }
    private void randomizeWeaponLocation(){
        Random rand = new Random();
        for(WeaponType weapon :WeaponType.values()  ){

            Integer x = rand.nextInt(3);
            Integer y= rand. nextInt(3);
            moveWeapon(weapon,x,y);
        }

    }
}
