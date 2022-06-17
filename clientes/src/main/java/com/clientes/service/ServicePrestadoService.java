package com.clientes.service;

import com.clientes.model.entity.Cliente;
import com.clientes.model.entity.ServicoPrestado;
import com.clientes.model.repository.ClienteRepository;
import com.clientes.model.repository.ServicoPrestadoRepository;
import com.clientes.rest.dto.ServicoPrestadoDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ServicePrestadoService {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private ServicoPrestadoRepository servicoPrestadoRepository;

	public ServicoPrestado salvar(ServicoPrestadoDto dto) {
		ServicoPrestado servicoPrestado = new ServicoPrestado();

		Cliente cliente = clienteRepository.findById(dto.getIdCliente())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não existe!"));
		
		servicoPrestado = dto.convertDto(dto, cliente);
		return servicoPrestadoRepository.save(servicoPrestado);
	}

	public Page<ServicoPrestado> buscarClientePorNomeEMes(String nome, Integer mes, Pageable paged) {
		return servicoPrestadoRepository.findByNomeCliente(nome, mes, paged);
	}
}
