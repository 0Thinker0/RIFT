package com.rift.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rift.Database;
import com.rift.model.Chat;
import com.rift.model.Utente;

@RestController
public class GestioneUtenti{	
	@PostMapping("/login")
	public void login(HttpServletResponse response, String email_input, String pass_input){
		try {
			if(Database.getIstance().getUtenteDao().findBy(email_input, pass_input)){
				response.addCookie(new Cookie("email", email_input));
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
				
				EmailSender emailToSend = new EmailSender(
	                    "riftnotes@gmail.com",
	                    "RiftNotes2022", 
	                    "smtp.gmail.com",
	                    "riftnotes@gmail.com", 
	                    email, 
	                    "Invio automatico dal portale RIFT", 
	                    "Ti diamo il benvenuto " + name + ".\n Accedi subito al sito per provare tutte le nostre funzionalità.",
	                    "src/main/resources/static/icon/ImmagineProfiloPersonale.jpeg"
	                  );

				emailToSend.inviaEmail();
				
				
				response.sendRedirect("/login.html");
				
			}else {
				response.sendRedirect("/registrazione.html");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping("/recupera_password")
	public void recuperaPassword(HttpServletRequest request, HttpServletResponse response){
		String email = request.getParameter("email_input");
		
		try {
			if(Database.getIstance().getUtenteDao().findUtenteByEmail(email) != null){
				
				EmailSender emailToSend = new EmailSender(
	                    "riftnotes@gmail.com",
	                    "RiftNotes2022", 
	                    "smtp.gmail.com",
	                    "riftnotes@gmail.com", 
	                    email, 
	                    "Invio automatico dal portale RIFT (Recupero Password)", 
	                    "Ci dispiace molto tu abbia dimenticato la password. \n Ma non preoccuparti, l'abbiamo salvata noi per te: " + Database.getIstance().getUtenteDao().findUtenteByEmail(email).getPassword(),
	                    "src/main/resources/static/icon/ImmagineProfiloPersonale.jpeg"
	                  );

				emailToSend.inviaEmail();
				
				
				response.sendRedirect("/login.html");
				
			}else {
				response.sendRedirect("/registrazione.html");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping("/esci")
	public void login(HttpServletResponse response, HttpServletRequest request){
		try {
			Cookie[] cookies = request.getCookies();
			for (Cookie cookie : cookies) {
	            cookie.setValue("");
	            cookie.setPath("/");
	            cookie.setMaxAge(0);
	            response.addCookie(cookie);
	        }
			
			response.sendRedirect("FirstPage.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping("/getDatiUtenti")
	public Utente getDatiUtenti(HttpServletRequest request){
		Cookie[] cookies = request.getCookies();
		String email = null;
		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
			   email = cookie.getValue();
		    }
		  }
		}
		
		return Database.getIstance().getUtenteDao().findUtenteByEmail(email);
	}
	
	@GetMapping("/getUtente")
	public Utente getUtente(String email){
		return Database.getIstance().getUtenteDao().findUtenteByEmail(email);
	}
	
	@PostMapping("/cambiaEmail")
	public void cambiaEmail(String oldEmail, String email){
		if(Database.getIstance().getUtenteDao().findUtenteByEmail(email) == null) {
			Database.getIstance().getUtenteDao().cambiaEmail(oldEmail, email);
		}
	}
	
	@PostMapping("/cambiaPassword")
	public void cambiaPassword(String email, String password){
		Database.getIstance().getUtenteDao().cambiaPassword(email, password);
	}
	
	@GetMapping("/getConversazione")
	public String getConversazione(String email, String emailToContact){
		return Database.getIstance().getUtenteDao().getConversazione(email, emailToContact);
	}
	
	@GetMapping("/getConversazioni")
	public List<Chat> getConversazioni(String email){
		return Database.getIstance().getChatDao().getConversazioni(email);
	}
	
	@PostMapping("/setConversazione")
	public void setConversazione(String email, String emailToContact, String mittente, String destinatario){
		Database.getIstance().getUtenteDao().setConversazione(email, emailToContact, mittente, destinatario);
	}
}
