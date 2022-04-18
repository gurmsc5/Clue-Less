package com.jhu.Clueless.model;

public class Coordinates {
    Integer x;
    Integer y;
    Coordinates(Integer X, Integer Y){
        x=X;
        y=Y;
    }
    Coordinates(String location){
        x= (int) location.charAt(1);
        y= (int) location.charAt(3);;
    }
    public Integer getX(){
        return x;
    }
    public Integer getY(){
        return y;
    }
    public String CoordinatesToString(){
        return "(" + x + "," + y + ")";
    }
}
