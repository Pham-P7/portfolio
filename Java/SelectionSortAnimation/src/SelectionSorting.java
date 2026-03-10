import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Line2D;
import javax.swing.JComponent;
import javax.swing.JFrame;

public class SelectionSorting{

    private int[] data;
    private int marked, sorted;
    private final visualSort graph;
    private boolean done = false;

    private void setData(int... args) {
        if (args.length != 0) {
            data = args;
            return;
        }
        int randomSize = (int) (Math.random() * 11 + 10);
        data = new int[randomSize];
        for (int i = 0; i < randomSize; i++) {
            data[i] = (int) (Math.random() * 101 + 30);
        }
    }

    public synchronized void update(){
        try {
            Thread.sleep(300);
            this.graph.repaint();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        notify();
    }
    public int[] getData(){
        return this.data;
    }
    public SelectionSorting(int... args) {
        setData(args);
        this.graph = new visualSort();
        sorted = -1;
    }

    public boolean isSorted(){
        return this.done;
    }

    public synchronized void sortStep() {
        int current = sorted + 1;
        if(sorted + 1 == data.length){
            done = true;
            return;
        }
        int minIndex = current;
        for (int x = current + 1; x < this.data.length; x++) {
            if (this.data[x] < this.data[minIndex]) {
                minIndex = x;
            }
        }
        marked = minIndex;
        try {
            wait();
            int temp = this.data[current];
            this.data[current] = this.data[minIndex];
            this.data[minIndex] = temp;
            sorted++;
            wait();
        }
        catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        marked = current;
    }

    class visualSort extends JComponent{

        private final Color done = Color.BLUE;
        private final Color marked = Color.RED;
        private final Color neutral = Color.BLACK;
        private final JFrame visual = new JFrame();

        public visualSort(){
            this.init();
        }
        private void init() {
            visual.add(this);
            visual.setSize(SelectionSorting.this.data.length * 20 + 40, 500);
            visual.setVisible(true);
            visual.setResizable(false);
            visual.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        }

        @Override
        public void paint(Graphics g) {
            super.paint(g);
            Graphics2D graph = (Graphics2D) g;
            super.paint(graph);

            int[] data = SelectionSorting.this.data;

            for (int i = 0; i < data.length; i++) {
                if(i <= SelectionSorting.this.sorted){
                    graph.setPaint(done);
                }
                else if(i == SelectionSorting.this.marked || i == SelectionSorting.this.sorted + 1){
                    graph.setPaint(marked);
                }
                else{
                    graph.setPaint(neutral);
                }
                graph.draw(new Line2D.Double(20 * (i + 1), 0, 20 * (i + 1), data[i] * 3));
            }
     
            g.dispose(); graph.dispose();
        }

    }
}
