import java.awt.*;
import java.awt.event.ActionListener;
import javax.swing.*;
public class gameOfLife extends JFrame implements ActionListener{
    int row = 40, col = 40;
    int gen = 1;
    public static boolean pause = true;
    lifeCells[][] earth = new lifeCells[row][col];
    JButton control = new JButton();
    public static gameOfLife life = new gameOfLife();

    @Override
    public void actionPerformed(java.awt.event.ActionEvent ev){
        Object temp = ev.getSource();
        if(((JButton)temp).getText().equals("start") || ((JButton)temp).getText().equals("pause")){
            pause = !pause;
            ((JButton)temp).setText(pause ? "start" : "pause");
            for(int i = 0; i < row;i++){
                for(int x = 0;x < col;x++){
                    earth[i][x].setEnabled(pause);
                }
            }
        }
    }

    public void init(){
        setLayout(new GridLayout(row,col));
        this.setSize(row * 20, col * 20);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
        this.setResizable(false);

        for(int i = 0; i < row;i++){
            for(int x = 0; x < col;x++){
                lifeCells person = new lifeCells();
                earth[i][x] = person;
                add(person);
            }
        }
        JFrame menu = new JFrame();
        menu.setSize(200, 100);
        menu.setResizable(false);
        menu.setAlwaysOnTop(true);
        menu.setLocation(1350,0);
        menu.setUndecorated(true);
        menu.setVisible(true);
        menu.setTitle("menu");
        control.addActionListener(this);
        control.setText("start");
        menu.setLayout(new GridLayout(1,1));
        menu.add(control);
        menu.setVisible(true);
        life.setTitle("generation 1");
        life.setUndecorated(false);
        life.setVisible(true);
        life.setAlwaysOnTop(true);
        gen = 0;
    }
    public static void main(String args[]) throws InterruptedException{
        life.init();
        while(true){
            Thread.sleep(10);
            life.generations();
        }
    }

    public void generations() throws InterruptedException{
        if(!pause){
            this.setTitle("generation " + ++gen);
            Thread.sleep(1000);
            System.out.println("test");
            int dead = 0;
            for(int i = 0;i < row; i++){
                for(int x = 0; x < col;x++){
                    dead += lifeCells.isAlive(earth, i, x) - 1;
                    earth[i][x].findState(earth, i, x);
                }
            }
            for(int i = 0;i < row; i++){
                for(int x = 0; x < col;x++){
                    earth[i][x].update();
                }
            }
            if(dead == -900){
                this.setTitle("generation " + gen + "-dead");
                gen = 0;
            }
        }
    }
}
