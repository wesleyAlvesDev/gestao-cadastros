package com.clientes.rest.dto;

import com.clientes.model.entity.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {

	private Integer id;

	private String username;

	public UsuarioDto convertDto(Usuario usuario) {
		return new UsuarioDto(usuario.getId(), usuario.getUsername());
	}
}
