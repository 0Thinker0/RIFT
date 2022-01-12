package Draw.src.main.java.Class;

public class Client {
	public static void main(String[] args) {
		Canvas c = new Canvas();
		ThreadExample t= new ThreadExample(c);
		t.start();

	}
	
	
}
