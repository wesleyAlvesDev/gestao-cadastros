package com.clientes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClientesApplication implements CommandLineRunner {

	@Autowired
	@Qualifier("application")
	private String application;

	public static void main(String[] args) {
		SpringApplication.run(ClientesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.application);
	}

}
