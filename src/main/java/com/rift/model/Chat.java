package com.rift.model;

public class Chat {
	private String mittente;
	private String destinatario;
	
	private String conversazione;
	
	public Chat(String mittente, String destinatario, String conversazione) {
		super();
		this.mittente = mittente;
		this.destinatario = destinatario;
		this.conversazione = conversazione;
	}

	public String getMittente() {
		return mittente;
	}

	public void setMittente(String mittente) {
		this.mittente = mittente;
	}

	public String getDestinatario() {
		return destinatario;
	}

	public void setDestinatario(String destinatario) {
		this.destinatario = destinatario;
	}

	public String getConversazione() {
		return conversazione;
	}

	public void setConversazione(String conversazione) {
		this.conversazione = conversazione;
	}
	
	
}
