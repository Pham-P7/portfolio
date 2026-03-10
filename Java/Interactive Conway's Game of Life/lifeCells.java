import java.awt.*;
import java.awt.event.*;
public class lifeCells extends Button implements ActionListener{
    protected Color current;
    protected Color nextGen;
    public static int pause = 0;
    @Override
    public void actionPerformed(java.awt.event.ActionEvent ev){
        Object temp = ev.getSource();
        if(((lifeCells)temp).getBackground().equals(Color.BLUE)){
            ((lifeCells)temp).setBackground(null);
            current = null;
        }
        else{
            ((lifeCells)temp).setBackground(Color.BLUE);
            current = Color.BLUE;
            pause += 200;
        }
        
    }
    public static int timer(boolean first){
        int temp = pause;
        pause = 0;
        if(first)
            return pause;
        else
            return temp;
    }
    public lifeCells(){
        this.addActionListener(this);
    }
    public void update(){
        this.setBackground(nextGen);
        current = nextGen;
        nextGen = null;
    }
    public void findState(lifeCells[][] grid, int row, int col){
        boolean alive = isAlive(grid,row,col) == 1;
        int neighbors = 0;
        neighbors += isAlive(grid,row - 1,col);
        neighbors += isAlive(grid,row - 1,col + 1);
        neighbors += isAlive(grid,row - 1,col - 1);
        neighbors += isAlive(grid,row + 1,col);
        neighbors += isAlive(grid,row + 1,col + 1);
        neighbors += isAlive(grid,row + 1,col - 1);
        neighbors += isAlive(grid,row,col - 1);
        neighbors += isAlive(grid,row,col + 1);
        if(neighbors < 2){
            this.nextGen = null;
        }
        else if(neighbors <= 3 && alive){
            this.nextGen = Color.BLUE;
        }
        else if(neighbors > 3 && alive){
            this.nextGen = null;
        }
        else if(neighbors == 3 && !alive){
            this.nextGen = Color.BLUE;
        }
    }
    public static int isAlive(lifeCells[][] grid, int row, int col){
        try{
            if(grid[row][col].getBackground().equals(Color.BLUE)){
                return 1;
            }
        }
        catch(Exception e){
            return 0;
        }
        return 0;
    }
    @Override
    public String toString(){
        return "current: " + this.current + " nextGen: " + this.nextGen;
    }
}