package com.clientes.rest;

import javax.validation.Valid;

import com.clientes.model.entity.ServicoPrestado;
import com.clientes.rest.dto.ServicoPrestadoDto;
import com.clientes.service.ServicePrestadoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/servicos-prestados")
public class ServicoPrestadoController {

	@Autowired
	private ServicePrestadoService servicePrestadoService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ServicoPrestado salvar(@RequestBody @Valid ServicoPrestadoDto dto) {
		return servicePrestadoService.salvar(dto);
	}

	@GetMapping
	public Page<ServicoPrestado> pesquisar(
			@RequestParam(value = "nome", required = false) String nome,
			@RequestParam(value = "mes", required = false) Integer mes,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable paginacao) {
		Pageable paged = PageRequest.of(page, size);
		
		return servicePrestadoService.buscarClientePorNomeEMes("%" + nome + "%", mes, paged);

	}
}
