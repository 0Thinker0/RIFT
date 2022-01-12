package Draw.src.main.java.Class;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Canvas extends JFrame {
	private JPanel p;
	private JButton b;
	
	private static final long serialVersionUID = 1L;
	public Canvas() {
		b = new JButton("Button");
		p = new JPanel();
		
		this.add(p,BorderLayout.CENTER);
		this.add(b,BorderLayout.SOUTH);
		
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setVisible(true);
		this.setLocationRelativeTo(null);
		
		b.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				Graphics g = p.getGraphics();
				draw(g,Color.RED);
			}
		});
	}
	
	public void draw(Graphics g,Color c) {
		g.setColor(c);
		g.fillOval(rand(),rand(), 5,5);
	}
	
	private int rand() {
		Random r= new Random();
		return r.nextInt(200)+1;
	}
	
	public JPanel getJPanel() {
		return p;
	}
}
