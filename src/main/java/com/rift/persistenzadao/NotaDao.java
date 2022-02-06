package com.rift.persistenzadao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import com.rift.model.Nota;

public class NotaDao {
	private Connection con;
	
	public NotaDao(Connection con) {
		this.con = con;
	}
	
	private boolean olderThan30Days(Date givenDate)
	{
		LocalDateTime dataNota = LocalDateTime.parse(givenDate.toString() + "T00:00:00");
		LocalDateTime now = LocalDateTime.now();
		boolean result = now.until(dataNota, ChronoUnit.DAYS) <= -30;
	  	return result;
	}
	
	public List<Nota> findByUsername(String username) {
		List<Nota> note = new ArrayList<Nota>();
		String query= "select * from note where creato_da = '"+username+"'"; 
		try {	
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				Nota nota = null;
				if(rs.getBoolean("cestinato")) {
					if(olderThan30Days(rs.getDate("ultima_modifica"))) {
						String eliminaNota= "DELETE FROM note WHERE id = '"+rs.getString("id")+"'";
						Statement sf = con.createStatement();
						sf.executeUpdate(eliminaNota);
					}else {
						nota= new Nota(rs.getString("id"),
								rs.getString("titolo"),
								rs.getBoolean("pubblico"),
								rs.getBoolean("cestinato"),
								rs.getString("quaderno"),
								rs.getDate("ultima_modifica"),
								rs.getString("contenuto"),
								rs.getString("creato_da"));
						
						note.add(nota);
					}
				}else {
					nota = new Nota(rs.getString("id"),
						rs.getString("titolo"),
						rs.getBoolean("pubblico"),
						rs.getBoolean("cestinato"),
						rs.getString("quaderno"),
						rs.getDate("ultima_modifica"),
						rs.getString("contenuto"),
						rs.getString("creato_da"));
					
					note.add(nota);
				}

				
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Collections.sort(note, new Comparator<Nota>() {
			  public int compare(Nota o1, Nota o2) {
			      return o1.getUltima_modifica().compareTo(o2.getUltima_modifica());
			  }
		});	
		return note;
	}

	public List<Nota> findOnline(String username) {
		List<Nota> note = new ArrayList<Nota>();
		String query= "select * from note where creato_da != '"+username+"'"; 
		try {	
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				Nota nota= new Nota(rs.getString("id"),
									rs.getString("titolo"),
									rs.getBoolean("pubblico"),
									rs.getBoolean("cestinato"),
									rs.getString("quaderno"),
									rs.getDate("ultima_modifica"),
									rs.getString("contenuto"),
									rs.getString("creato_da"));
				if(nota.isPubblico()) {				
					note.add(nota);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return note;
	}
	
	public void removeNota(String id) {
		String sql = "DELETE FROM note WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public boolean vis(String id) {
		String query= "select * from note where id= '"+id+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				boolean b=rs.getBoolean("pubblico");
				return !b;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public void changeVisibilityNota(String id,int b) {
		boolean pubblica=false;
		if(b==-1) {
			pubblica=vis(id);
		}
		else if(b==1){
			pubblica=true;
		}
		String sql = "UPDATE note SET pubblico ='"+pubblica+"' WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void statusNota(String id,boolean cestinato) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");  
		LocalDateTime now = LocalDateTime.now();
		String sql = "UPDATE note SET cestinato ='"+cestinato+"', ultima_modifica = '" + dtf.format(now) + "' WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
		
	public void moveOnTrashNota(String id) {
		// TODO Auto-generated method stub
		
		String query= "select * from note where id = '"+id+"'"; 
		Statement st;
		try {
			st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				changeVisibilityNota(id,0);
				statusNota(id,true);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void restoreNota(String id) {
		String query= "select * from note where id = '"+id+"'"; 
		Statement st;
		try {
			st = con.createStatement();
			ResultSet rs = st.executeQuery(query); 
			while(rs.next()) {
				changeVisibilityNota(id,1);
				statusNota(id,false);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void addNota(String id,String titolo, String contenuto, boolean pubblico,String username) {
		// TODO Auto-generated method stub
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");  
		LocalDateTime now = LocalDateTime.now();
		if(id.equals("-1")) {
			String query="insert into note(titolo,contenuto,pubblico,ultima_modifica,creato_da,cestinato) values ('"+
			titolo+"','"+contenuto+"','"+pubblico+"','"+dtf.format(now)+"','"+username+"','"+false+"')";
			Statement st;
			try {
				st = con.createStatement();
				st.execute(query);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else {
			String sql = "UPDATE note SET titolo ='"+titolo+"', contenuto='"+contenuto+"', ultima_modifica='"+dtf.format(now) +"',pubblico='"+pubblico +"'WHERE id = '"+id+"'";
			try {
				Statement st = con.createStatement();
				st.executeUpdate(sql);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
