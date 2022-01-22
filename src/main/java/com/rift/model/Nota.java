package com.rift.model;

import java.sql.Date;

public class Nota implements Comparable<Nota>{
	private String id;
	private String titolo;
	private boolean pubblico;
	private boolean cestinato;
	private String quaderno;
	private int pagina;
	private String creato_da;
	private Date ultima_modifica;
	private String contenuto;
	
	

	public Nota(String id, String titolo, boolean pubblico, boolean cestinato, String quaderno, Date ultima_modifica,
			int pagina, String contenuto, String creato_da) {
		// TODO Auto-generated constructor stub
		this.id=id;
		this.setTitolo(titolo);
		this.setPubblico(pubblico);
		this.setCestinato(cestinato);
		this.setQuaderno(quaderno);
		this.setUltima_modifica(ultima_modifica);
		this.setPagina(pagina);
		this.setContenuto(contenuto);
		this.setCreato_da(creato_da);
	}

	public String getId() {
		return id;
	}

	public String getContenuto() {
		return contenuto;
	}



	public void setContenuto(String contenuto) {
		this.contenuto = contenuto;
	}



	public String getTitolo() {
		return titolo;
	}



	public void setTitolo(String titolo) {
		this.titolo = titolo;
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



	public int getPagina() {
		return pagina;
	}



	public void setPagina(int pagina) {
		this.pagina = pagina;
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



	public String getQuaderno() {
		return quaderno;
	}



	public void setQuaderno(String quaderno) {
		this.quaderno = quaderno;
	}

	@Override
	public int compareTo(Nota o) {
		// TODO Auto-generated method stub
		return getUltima_modifica().compareTo(o.getUltima_modifica());
	}

}
