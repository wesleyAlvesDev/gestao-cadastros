package com.clientes.service;

import javax.validation.Valid;

import com.clientes.exception.UsuarioCadastradoException;
import com.clientes.model.entity.Usuario;
import com.clientes.model.repository.UsuarioReposistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioReposistory usuarioReposistory;

	public Usuario salvar(@Valid Usuario usuario) {
		boolean exists = usuarioReposistory.findByUsername(usuario.getUsername()).isPresent();
		
		if(exists) {
			throw new UsuarioCadastradoException(usuario.getUsername());
		}
		
		return usuarioReposistory.save(usuario);
	}
}
