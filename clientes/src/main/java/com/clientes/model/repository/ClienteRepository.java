package com.clientes.model.repository;

import java.util.Optional;

import com.clientes.model.entity.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

	@Query(value = "select c from Cliente c where c.cpf = :cpf")
	public Optional<Cliente> findByCpf(@Param("cpf") String cpf);
}
