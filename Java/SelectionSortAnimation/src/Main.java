public class Main {
    public static void main(String... args) {
        SelectionSorting test = new SelectionSorting();  
        new Thread(() -> {
            while(true){
                test.update();
            }
        }).start();

        new Thread(() -> {
            while(true){
                test.sortStep();
            }
        }).start();
    }
}
