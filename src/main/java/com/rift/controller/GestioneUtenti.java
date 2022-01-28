package com.rift.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rift.Database;
import com.rift.model.Utente;

@RestController
public class GestioneUtenti{	
	@PostMapping("/login")
	public void login(HttpServletResponse response, String email_input, String pass_input){
		try {
			if(Database.getIstance().getUtenteDao().findBy(email_input, pass_input)){

				response.sendRedirect("/index.html");

			}else {
				response.sendRedirect("/login.html");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping("/register")
	public void register(HttpServletRequest request, HttpServletResponse response){
		String email = request.getParameter("email_input");
		String password = request.getParameter("pass_input");
		String name = request.getParameter("nome_input");
		
		try {
			if(Database.getIstance().getUtenteDao().saveOrUpdate(new Utente(name, email, password))){

				response.sendRedirect("/login.html");

			}else {
				response.sendRedirect("/registrazione.html");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
