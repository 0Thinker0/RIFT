package com.rift.persistenzadao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.rift.model.Quaderno;

public class QuadernoDao {
	private Connection con;
	
	public QuadernoDao(Connection con) {
		this.con = con;
	}
	
	// tutti i quaderni
	public List<Quaderno> findByUsername(String username) {
		List<Quaderno> quaderni= new ArrayList<Quaderno>();
		String query= "select * from quaderno where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				Quaderno q= new Quaderno(rs.getString("id"),
												rs.getString("titolo"),
												rs.getBoolean("pubblico"),
												rs.getBoolean("cestinato"),
												rs.getString("creato_da"),
												rs.getDate("ultima_modifica"));
				quaderni.add(q);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return quaderni;
	}
	
	public void deleteNote(String id) {
		String sql = "DELETE FROM note WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void delete(String id) {
		String sql = "DELETE FROM quaderno WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void deleteQuad(String titolo,String username) {
		String query= "select * from quaderno where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("titolo").equals(titolo)) {
					delete(rs.getString("id"));
					break;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	public void removeQuaderno(String titolo, String username) {
		// TODO Auto-generated method stub
		deleteQuad(titolo,username);
		List<String> idNote= new ArrayList<String>();
		String query= "select * from note where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("quaderno").equals(titolo)) {
					idNote.add(rs.getString("id"));
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		for(String id: idNote) {
			deleteNote(id);
		}
	}
	
	public boolean quadVis(String titolo,String username) {
		String query= "select * from quaderno where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				String s=rs.getString("titolo");
				if(s.equals(titolo)) {
					boolean b=!rs.getBoolean("pubblico");
					visibilityQuad(rs.getString("id"),b);
					return !b;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return false;
	}
	
	public void visibilityQuad(String id,boolean pubblica) {
		String sql = "UPDATE quaderno SET pubblico ='"+pubblica+"' WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void visibilityNote(String id,boolean pubblica) {
		String sql = "UPDATE note SET pubblico ='"+pubblica+"' WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void changeVisibilityNota(String titolo, String username,int b1) {
		// TODO Auto-generated method stub
		boolean b=false;
		if(b1==-1) {
			b=quadVis(titolo,username);
		}
		else if(b1==1) {
			b=true;
		}
		List<String> idNote= new ArrayList<String>();
		String query= "select * from note where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("quaderno").equals(titolo)&&!rs.getBoolean("cestinato")) {
					idNote.add(rs.getString("id"));
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		for(String id: idNote) {
			visibilityNote(id,b);
		}
	}
	
	public void statusNota(String id,boolean cestinato) {
		String sql = "UPDATE note SET cestinato ='"+cestinato+"' WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void statusQuad(String id,boolean cestinato) {
		String sql = "UPDATE quaderno SET cestinato ='"+cestinato+"' WHERE id = '"+id+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void moveontrash(String titolo,String username) {
		String query= "select * from quaderno where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("titolo").equals(titolo)) {
					statusQuad(rs.getString("id"),true);
					visibilityQuad(rs.getString("id"),false);
					break;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	public void moveOnTrashQuaderno(String titolo, String username) {
		// TODO Auto-generated method stub
		moveontrash(titolo,username);
		List<String> idNote= new ArrayList<String>();
		String query= "select * from note where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("quaderno").equals(titolo)&&!rs.getBoolean("cestinato")) {
					idNote.add(rs.getString("id"));
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		for(String id: idNote) {
			changeVisibilityNota(titolo,username,0);
			statusNota(id,true);
		}
	}
	
	public void restoreQuad(String titolo,String username) {
		String query= "select * from quaderno where creato_da = '"+username+"'"; 
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("titolo").equals(titolo)) {
					statusQuad(rs.getString("id"),false);
					visibilityQuad(rs.getString("id"),true);
					break;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
		
	public void restoreQuaderno(String titolo,String username) {
		restoreQuad(titolo,username);
		List<String> idNote= new ArrayList<String>();
		String query= "select * from note where creato_da = '"+username+"'"; 
		Statement st;
		try {
			st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				if(rs.getString("quaderno").equals(titolo)) {
					idNote.add(rs.getString("id"));
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(String id: idNote) {
			changeVisibilityNota(titolo,username,1);
			statusNota(id,false);
		}
	}
	
}
