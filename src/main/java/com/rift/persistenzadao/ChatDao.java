package com.rift.persistenzadao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.rift.model.Chat;

public class ChatDao {
	private Connection con;
	
	public ChatDao(Connection con) {
		this.con = con;
	}

	public List<Chat> getConversazioni(String email) {
		List<Chat> chats = new ArrayList<Chat>();
		
		String query= "select * from chat where id_mittente = '" + email + "'"; 
		try {	
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				Chat chat= new Chat(rs.getString("id_mittente"),
									rs.getString("id_destinatario"),
									rs.getString("conversazione"));
				
				chats.add(chat);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return chats;
	}

}
