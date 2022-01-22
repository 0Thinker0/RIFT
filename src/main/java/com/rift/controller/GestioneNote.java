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
	@PostMapping("/addNota")
	public void aggiungiNota(Nota nota,HttpServletRequest req) {
		if (req.getSession().getAttribute("username") != null) {			

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
		Database.getIstance().getNotaDao().removeNota(id);
	}
	
	@PostMapping("/changeVisibility")
	public void changeVisNota(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().changeVisibilityNota(id);
	}
}
