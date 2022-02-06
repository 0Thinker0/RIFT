package com.rift.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class Quaderno {
	private String id;
	private String titolo;
	private boolean pubblico;
	private boolean cestinato;
	private String creato_da;
	private Date ultima_modifica;

	public Quaderno(String id, String titolo, boolean pubblico, boolean cestinato, String creato_da, Date ultima_modifica) {
		this.id=id;
		this.setTitolo(titolo);
		this.setPubblico(pubblico);
		this.setCestinato(cestinato);
		this.setCreato_da(creato_da);
		this.setUltima_modifica(ultima_modifica);
		//note dovrebbe essere una lista
	}
	
	public String getId() {
		return id;
	}

	public boolean isPubblico() {
		return pubblico;
	}

	public void setPubblico(boolean pubblico) {
		this.pubblico = pubblico;
	}

	public boolean isCestinato() {
		return cestinato;
	}

	public void setCestinato(boolean cestinato) {
		this.cestinato = cestinato;
	}

	public String getTitolo() {
		return titolo;
	}

	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}

	public String getCreato_da() {
		return creato_da;
	}

	public void setCreato_da(String creato_da) {
		this.creato_da = creato_da;
	}

	public Date getUltima_modifica() {
		return ultima_modifica;
	}

	public void setUltima_modifica(Date ultima_modifica) {
		this.ultima_modifica = ultima_modifica;
	}
}
