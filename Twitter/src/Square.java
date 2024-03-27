public class Square {
    private int height ;
    private int width;

    public Square(int height, int width) {
        if (height>=2)
            this.height = height;
        this.width = width;
    }

    public void print() {
        if (Math.abs(height-width)>5)
            System.out.println(height*width+" שטח מלבן ");
        else
            System.out.println((height+width)*2+" היקף ריבוע ");
    }
}

