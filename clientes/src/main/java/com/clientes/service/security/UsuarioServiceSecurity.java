package com.clientes.service.security;

import com.clientes.model.entity.Usuario;
import com.clientes.model.repository.UsuarioReposistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceSecurity implements UserDetailsService {

	@Autowired
	private UsuarioReposistory usuarioReposistory;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioReposistory.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Login não encontrado!"));

		return User.builder().username(usuario.getUsername()).password(usuario.getPassword()).roles("USER").build();
	}

}
