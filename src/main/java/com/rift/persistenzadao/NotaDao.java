package com.rift.persistenzadao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.rift.model.Nota;

public class NotaDao {
	private Connection con;
	
	public NotaDao(Connection con) {
		this.con = con;
	}
	
	public List<Nota> findByUsername(String username) {
		List<Nota> note = new ArrayList<Nota>();
		String query= "select * from note where creato_da = '"+username+"'"; 
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
									rs.getInt("pagina"),
									rs.getString("contenuto"),
									rs.getString("creato_da"));
				note.add(nota);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
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
									rs.getInt("pagina"),
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
	
}
