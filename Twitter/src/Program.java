import java.util.Scanner;

public class Program {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int option=0,height,width;
        Square square;
        Triangle triangle;
        while (option!=3){
            height=0;
            System.out.println("נא לבחור: אפשרות 1 או אפשרות 2");
            option=in.nextInt();
            while (height<2) {
                System.out.println("הקלד גובה");
                height = in.nextInt();
            }
            System.out.println("הקלד רוחב");
            width=in.nextInt();
            if (option==1){
                square=new Square(height,width);
                square.print();
            }
            else if (option==2){
                triangle=new Triangle(height,width);
                triangle.print();
            }

        }
    }
}