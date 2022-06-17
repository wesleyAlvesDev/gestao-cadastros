package com.clientes.rest;

import java.util.Arrays;
import java.util.List;

import lombok.Getter;

public class ApiErrors {

	@Getter
	private List<String> errors;

	public ApiErrors(List<String> errors) {
		this.errors = errors;
	}

	public ApiErrors(String errors) {
		this.errors = Arrays.asList(errors);
	}
}
