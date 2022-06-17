package com.clientes.model.repository;

import java.util.Optional;

import com.clientes.model.entity.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioReposistory extends JpaRepository<Usuario, Integer> {

	Optional<Usuario> findByUsername(String username);

}
