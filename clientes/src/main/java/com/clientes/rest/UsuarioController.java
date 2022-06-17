package com.clientes.rest;

import javax.validation.Valid;

import com.clientes.model.entity.Usuario;
import com.clientes.rest.dto.UsuarioDto;
import com.clientes.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public UsuarioDto cadastrar(@RequestBody @Valid Usuario usuario) {
		try {
			Usuario user = usuarioService.salvar(usuario);
			return new UsuarioDto().convertDto(user);
		}catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
}
