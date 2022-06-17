package com.clientes.exception;

public class UsuarioCadastradoException extends RuntimeException {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public UsuarioCadastradoException(String login) {
		super("Usúario já cadastrado para o login " + login);
	}
}
