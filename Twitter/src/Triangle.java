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
            height -= 2;
            spare = (height - (width - 3) / 2);
            rest = spare % ((width - 3) / 2);
            same = spare / ((width - 3) / 2);
            System.out.println(spare);

            for (int i = 0; i < width / 2; i++) {
                System.out.print(" ");
            }
            System.out.print("*");
            System.out.println();

            newWidth += 2;
            for (int j = 0; j < rest; j++) {
                for (int i = 0; i < (width - newWidth) / 2; i++) {
                    System.out.print(" ");
                }
                for (int i = 0; i < newWidth; i++) {
                    System.out.print("*");

                }
                System.out.println();
            }
            while (newWidth < width) {

                for (int j = 0; j <= same; j++) {
                    for (int i = 0; i < (width - newWidth) / 2; i++) {
                        System.out.print(" ");
                    }
                    for (int i = 0; i < newWidth; i++) {
                        System.out.print("*");

                    }
                    System.out.println();
                }
                newWidth += 2;

            }
            for (int i = 0; i < width; i++) {
                System.out.print("*");
            }
            System.out.println();
        }

    }
}
