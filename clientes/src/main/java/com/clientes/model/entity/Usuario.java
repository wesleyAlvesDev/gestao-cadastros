package com.clientes.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message = "{campo.login.obrigatorio}")
	@Column(name = "login", unique = true)
	private String username;

	@NotEmpty(message = "{campo.password.obrigatorio}")
	@Column(name = "senha")
	private String password;

}
