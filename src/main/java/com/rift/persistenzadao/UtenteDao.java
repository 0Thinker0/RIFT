package com.rift.persistenzadao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.rift.model.Utente;

public class UtenteDao {
	private Connection con;
	
	public UtenteDao(Connection con) {
		this.con = con;
	}

	public List<Utente> findAll(){
		List<Utente> utenti = new ArrayList<Utente>();
		
		String query= "select * from utente"; 
		try {	
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				Utente utente= new Utente(rs.getString("nome"),
									rs.getString("email"),
									rs.getString("password"));
				
				utenti.add(utente);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return utenti;
	}
	
	
	public boolean findBy(String email, String password) {
		String query = "select * from utente where email ='" + email + "' and password = '" + password + "'";

		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);

			if(rs.next()) {
				return true;
			}else {
				return false;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean saveOrUpdate(Utente utente) {
		String email = utente.getEmail();
		String password = utente.getPassword();
		String name = utente.getNome();
		
		String queryCheck = "select * from utente where email ='" + email + "'";
		
		String query = "insert into utente(nome, email, password) values('" + name + "', '" + email + "', '" + password + "')";

		try {
			Statement st = con.createStatement();
			ResultSet check = st.executeQuery(queryCheck);
			
			if(check.next()) {
				return false;
			}else {
				int rs = st.executeUpdate(query);
			
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public void delete(Utente utente) {
		String sql = "DELETE FROM utente WHERE email = '"+utente.getEmail()+"'";
		try {
			Statement st = con.createStatement();
			st.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
