package com.clientes.service;

import com.clientes.model.entity.Cliente;
import com.clientes.model.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	public Cliente salvar(Cliente cliente) {
		return clienteRepository.save(cliente);

	}
	
	public Page<Cliente> buscarTodosOsClientes(Pageable paged) {
		return clienteRepository.findAll(paged);
	}

	public Cliente buscarPorId(Integer id) {
		return clienteRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));
	}

	public Cliente buscarPorCpf(String cpf) {
		return clienteRepository.findByCpf(cpf).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));
	}

	public Cliente atualizar(Integer id, Cliente clienteAtualizado) {
		return clienteRepository.findById(id).map(cliente -> {
			clienteAtualizado.setId(cliente.getId());
			return clienteRepository.save(clienteAtualizado);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

	}

	public void deletarCliente(Integer id) {
		clienteRepository.findById(id).map(cliente -> {
			clienteRepository.delete(cliente);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));
	}
}