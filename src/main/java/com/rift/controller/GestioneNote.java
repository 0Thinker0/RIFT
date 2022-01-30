package com.rift.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.rift.Database;
import com.rift.model.Nota;
import com.rift.model.Quaderno;

@RestController
public class GestioneNote {
	@PostMapping("/creaNota")
	public void aggiungiNota(String titolo,String contenuto,boolean pubblico,HttpServletRequest req) {
		if (req.getSession().getAttribute("username") != null) {
		}
		if(!titolo.isEmpty()) {
			String username= "Giuseppe";
			Database.getIstance().getNotaDao().addNota(titolo,contenuto,pubblico,username);
		}
	}
	
	@PostMapping("/creaQuaderno")
	public void aggiungiQuaderno(String titolo,boolean pubblico,HttpServletRequest req) {
		if (req.getSession().getAttribute("username") != null) {
		}
		if(!titolo.isEmpty()){
			String username= "Giuseppe";
			Database.getIstance().getQuadernoDao().addQuaderno(titolo,pubblico,username);
		}
	}
	
	@GetMapping("/getNotePersonali")
	public List<Nota> getNote(HttpServletRequest request) {
		String username= "Giuseppe";
		return Database.getIstance().getNotaDao().findByUsername(username);
	}
	 
	@GetMapping("/getQuaderniPersonali")
	public List<Quaderno> getQuaderni(HttpServletRequest request) {
		String username= "Giuseppe";
		return Database.getIstance().getQuadernoDao().findByUsername(username);
	}
	
	@GetMapping("/getNoteOnline")
	public List<Nota> getNoteOn(String id,HttpServletRequest request) {
		String username= "Giuseppe";
		return Database.getIstance().getNotaDao().findOnline(username);
	}
	
	@PostMapping("/deleteNota")
	public void removeNota(String id,HttpServletRequest request) {
		System.out.println(id);
		Database.getIstance().getNotaDao().removeNota(id);
	}
	
	@PostMapping("/changeVisibility")
	public void changeVisNota(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().changeVisibilityNota(id,-1);
	}
	
	@PostMapping("/deleteQuaderno")
	public void removeQuaderno(String titolo,HttpServletRequest request) {
		String username= "Giuseppe";
		Database.getIstance().getQuadernoDao().removeQuaderno(titolo,username);
	}
	
	@PostMapping("/changeVisibilityQ")
	public void changeVisQuaderno(String titolo,HttpServletRequest request) {
		String username= "Giuseppe";
		Database.getIstance().getQuadernoDao().changeVisibilityNota(titolo,username,-1);
	}
	
	@PostMapping("/spostaNelCestinoNota")
	public void spostaCestNota(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().moveOnTrashNota(id);
	}
	
	@PostMapping("/spostaNelCestinoQuaderno")
	public void spostaCestQuaderno(String titolo,HttpServletRequest request) {
		String username= "Giuseppe";
		Database.getIstance().getQuadernoDao().moveOnTrashQuaderno(titolo,username);
	}
	
	@PostMapping("/ripristinaNota")
	public void ripristinaNot(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().restoreNota(id);
	}
	
	@PostMapping("/ripristinaQuaderno")
	public void ripristinaQ(String titolo,HttpServletRequest request) {
		String username= "Giuseppe";
		Database.getIstance().getQuadernoDao().restoreQuaderno(titolo, username);
	}
}
