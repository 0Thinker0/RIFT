package com.rift.persistenzadao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.rift.model.Nota;
import com.rift.model.Quaderno;
import com.rift.model.Utente;

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
	
	
	
	
	/*
	public List<Nota> getAllTheNotes(); // tutte le note collegate ad esso
	public void addNota(Nota nota); //collega una nota
	public void removeNota(Nota nota); //scollega una nota
	public boolean rename(String newname); //rinomina
	public boolean delete(Quaderno quaderno); //cancella il quaderno
	*/
	
}
