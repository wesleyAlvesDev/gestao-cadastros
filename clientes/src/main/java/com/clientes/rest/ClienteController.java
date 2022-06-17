package com.clientes.rest;

import javax.validation.Valid;

import com.clientes.model.entity.Cliente;
import com.clientes.service.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/clientes")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Cliente salvar(@RequestBody @Valid Cliente cliente) {
		return clienteService.salvar(cliente);
	}
	
	@GetMapping
	public Page<Cliente> buscarTodosOsClientes(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable paginacao) {
		Pageable paged = PageRequest.of(page, size);
		return clienteService.buscarTodosOsClientes(paged);
		
	}

	@GetMapping("{id}")
	public Cliente buscarPorId(@PathVariable("id") Integer id) {
		return clienteService.buscarPorId(id);
	}
	
	@GetMapping("/cpf/{cpf}")
	public Cliente buscarPorCpf(@PathVariable("cpf") String cpf) {
		return clienteService.buscarPorCpf(cpf);
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public Cliente atualizar(@PathVariable("id") Integer id, @RequestBody @Valid Cliente cliente) {
		return clienteService.atualizar(id, cliente);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletarCliente(@PathVariable("id") Integer id) {
		clienteService.deletarCliente(id);
	}
}
