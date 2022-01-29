package com.rift;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.rift.persistenzadao.ChatDao;
import com.rift.persistenzadao.NotaDao;
import com.rift.persistenzadao.QuadernoDao;
import com.rift.persistenzadao.UtenteDao;

public class Database {
	private static Database instance= null;
	private Connection con;
	
	public static Database getIstance() {
		if(instance==null) {
			instance= new Database();
		}
		return instance;
	}
	
	private Database() {
		try {
			con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", 
					"postgres", "postgres");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public Connection getConnection() {
		return con;
	}
	
	public UtenteDao getUtenteDao() {
		return new UtenteDao(con);
	}
	
	public NotaDao getNotaDao() {
		return new NotaDao(con);
	}
	
	public QuadernoDao getQuadernoDao() {
		return new QuadernoDao(con);
	}
	
	public ChatDao getChatDao() {
		return new ChatDao(con);
	}
}
