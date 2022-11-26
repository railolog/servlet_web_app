package railolog.web.lab2.utils;

import java.util.Date;

public class Dot {
    private final double x;
    private final double y;
    private final double r;
    private final Date creationDate;
    private final boolean inArea;
    private final double execTime;
    public Dot(double x, double y, double r) {
        long startTime = System.nanoTime();
        this.x = x;
        this.y = y;
        this.r = r;
        this.creationDate = new Date();

        inArea = checkArea();

        execTime = (double)(System.nanoTime() - startTime) / 1000000;
    }

    private boolean checkArea(){
        boolean lt = (x <= 0 && x >= -r/2) && (y >= 0 && y <= r);
        boolean rt = (x >= 0 && x <= r/2) && (y <= r - 2*x && y >= 0);
        boolean lb = (x*x + y*y <= r*r) && (x <= 0 && y <= 0);

        return  lt || rt || lb;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public boolean isInArea() {
        return inArea;
    }

    public double getExecTime() {
        return execTime;
    }

    public String getInArea(){
        if (isInArea()){
            return "Hit";
        }
        return "Miss";
    }
}
