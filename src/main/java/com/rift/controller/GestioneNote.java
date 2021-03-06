package com.rift.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rift.Database;
import com.rift.model.Nota;
import com.rift.model.Quaderno;

@RestController
public class GestioneNote {
	@PostMapping("/creaNota")
	public void aggiungiNota(String id,String titolo,String contenuto,boolean pubblico,HttpServletRequest req) {
		if(!titolo.isEmpty()) {
			String username = null;
			Cookie[] cookies = req.getCookies();

			if (cookies != null) {
			 for (Cookie cookie : cookies) {
			   if (cookie.getName().equals("email")) {
			     username = cookie.getValue();
			    }
			  }
			}
			Database.getIstance().getNotaDao().addNota(id,titolo,contenuto,pubblico,username);
		}
	}
	
	@PostMapping("/creaQuaderno")
	public void aggiungiQuaderno(String titolo,boolean pubblico,HttpServletRequest req) {
		if(!titolo.isEmpty()){
			String username = null;
			Cookie[] cookies = req.getCookies();

			if (cookies != null) {
			 for (Cookie cookie : cookies) {
			   if (cookie.getName().equals("email")) {
			     username = cookie.getValue();
			    }
			  }
			}
			
			Database.getIstance().getQuadernoDao().addQuaderno(titolo,pubblico,username);
		}
	}
	
	@GetMapping("/getNotePersonali")
	public List<Nota> getNote(HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		return Database.getIstance().getNotaDao().findByUsername(username);
	}
	
	@GetMapping("/getNotePubblicate")
	public List<Nota> getNotePubblicate(HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		return Database.getIstance().getNotaDao().findByUsername(username);
	}
	
	@GetMapping("/getQuaderniPersonali")
	public List<Quaderno> getQuaderni(HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		return Database.getIstance().getQuadernoDao().findByUsername(username);
	}
	
	@GetMapping("/getNoteOnline")
	public List<Nota> getNoteOn(String id,HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		return Database.getIstance().getNotaDao().findOnline(username);
	}
	
	@PostMapping("/deleteNota")
	public void removeNota(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().removeNota(id);
	}
	
	@PostMapping("/changeVisibility")
	public void changeVisNota(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().changeVisibilityNota(id,-1);
	}
	
	@PostMapping("/deleteQuaderno")
	public void removeQuaderno(String titolo,HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		Database.getIstance().getQuadernoDao().removeQuaderno(titolo,username);
	}
	
	@PostMapping("/changeVisibilityQ")
	public void changeVisQuaderno(String titolo,HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		Database.getIstance().getQuadernoDao().changeVisibilityNota(titolo,username,-1);
	}
	
	@PostMapping("/spostaNelCestinoNota")
	public void spostaCestNota(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().moveOnTrashNota(id);
	}
	
	@PostMapping("/spostaNelCestinoQuaderno")
	public void spostaCestQuaderno(String titolo,HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		Database.getIstance().getQuadernoDao().moveOnTrashQuaderno(titolo,username);
	}
	
	@PostMapping("/ripristinaNota")
	public void ripristinaNot(String id,HttpServletRequest request) {
		Database.getIstance().getNotaDao().restoreNota(id);
	}
	
	@PostMapping("/ripristinaQuaderno")
	public void ripristinaQ(String titolo,HttpServletRequest request) {
		String username = null;
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals("email")) {
		     username = cookie.getValue();
		    }
		  }
		}
		Database.getIstance().getQuadernoDao().restoreQuaderno(titolo, username);
	}
	
	@PostMapping("/modificaQuaderno")
	public void modificaQuaderno(String titolo, String idNota) {
		Database.getIstance().getQuadernoDao().modificaQuaderno(titolo, idNota);
	}
}
