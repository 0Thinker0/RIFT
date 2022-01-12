package Draw.src.main.java.Class;

import java.awt.Color;

public class ThreadExample extends Thread{
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private Canvas c;
	private int secCount=0;
	private int maxSecCount=5000;
	private boolean execution=true;
	public ThreadExample(Canvas c) {
		this.c=c;
	}
	public void run() {
		execution=true;
		while(execution) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
                Thread.currentThread().interrupt();
				e.printStackTrace();
			}
			System.out.println("*");
			c.draw(c.getJPanel().getGraphics(),Color.RED);
			abortAt(this,1000);
		}	
	}
	private void abortAt(Thread t,int i) {
		// TODO Auto-generated method stub
		if(secCount>=maxSecCount) {
			secCount=0;
            t.interrupt();
            execution=false;
		}
		else {
			secCount+=i;
		}
	}

}
