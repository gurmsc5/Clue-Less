package com.jhu.Clueless.model;

public class Coordinates {
    Integer x;
    Integer y;
    Coordinates(Integer X, Integer Y){
        x=X;
        y=Y;
    }
    Coordinates(String location){
        x= Character.getNumericValue(location.charAt(1));
        y= Character.getNumericValue(location.charAt(3));
        System.out.println(location);
        System.out.println("x: "+x+" y: "+y);
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
