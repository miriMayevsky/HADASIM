import java.util.Scanner;

public class Triangle {
    Scanner in = new Scanner(System.in);
    private int height;
    private int width;

    public Triangle(int height, int width) {
        if (height >= 2)
            this.height = height;
        else this.height = 2;
        this.width = width;
    }

    public void print() {
        int option;
        double result, exercise;
        System.out.println("להקיף המשולש הקש 1, להדפסת המשולש הקש 2");
        option = in.nextInt();
        if (option == 1) {
            exercise = Math.sqrt(height * height + (width / 2) * (width / 2));
            result = exercise * 2 + width;
            System.out.println(result + "הקיף המשולש ");
        } else {
            if (width % 2 == 0 || width / 2 > height)
                System.out.println("לא ניתן להדפיס את המשולש");
            else
                printTriangle();
        }
    }


    private void printTriangle() {
        int same, rest, spare, newWidth = 1;
        if (width == 3) {
            System.out.println(" *");
            for (int i = 1; i <height ; i++) {
                System.out.println("***");
            }

        } else {
            //Height minus the first and last row
            height -= 2;
            //The number of lines to fill minus the number of odd digits in the range 3 to the width
            //How many unnecessary lines should be divided between the digits
            spare = (height - (width - 3) / 2);
            //rest is added to the top rows
            rest = spare % ((width - 3) / 2);
            //Number of rows is equal
            same = spare / ((width - 3) / 2);
            System.out.println(spare);
            //Number of spaces in the first row
            for (int i = 0; i < width / 2; i++) {
                System.out.print(" ");
            }
            System.out.print("*");
            System.out.println();

            newWidth += 2;
            //Number of spaces in the rest rows
            for (int j = 0; j < rest; j++) {
                for (int i = 0; i < (width - newWidth) / 2; i++) {
                    System.out.print(" ");
                }
                //Number of * in the rest rows
                for (int i = 0; i < newWidth; i++) {
                    System.out.print("*");

                }
                System.out.println();
            }
            //print the rows
            while (newWidth < width) {
              //printing the lines with an equal number of lines between the digits
                for (int j = 0; j <= same; j++) {
                    for (int i = 0; i < (width - newWidth) / 2; i++) {
                        System.out.print(" ");
                    }
                    for (int i = 0; i < newWidth; i++) {
                        System.out.print("*");

                    }
                    System.out.println();
                }
            // next odd digit
                 newWidth += 2;

            }
           //print last line
            for (int i = 0; i < width; i++) {
                System.out.print("*");
            }
            System.out.println();
        }

    }
}
