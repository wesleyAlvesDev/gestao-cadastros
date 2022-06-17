package com.clientes.rest.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.clientes.model.entity.Cliente;
import com.clientes.model.entity.ServicoPrestado;
import com.clientes.util.BigDecimalConverter;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServicoPrestadoDto {

	@NotEmpty(message = "{campo.descricao.obrigatorio}")
	private String descricao;

	@NotEmpty(message = "{campo.preco.obrigatorio}")
	private String preco;

	@NotEmpty(message = "{campo.data.obrigatorio}")
	private String data;

	@NotNull(message = "{campo.cliente.obrigatorio}")
	private Integer idCliente;

	public ServicoPrestado convertDto(ServicoPrestadoDto dto, Cliente cliete) {
		ServicoPrestado servicoPrestado = new ServicoPrestado();

		servicoPrestado.setDescricao(dto.getDescricao());
		servicoPrestado.setValor(BigDecimalConverter.converter(dto.getPreco()));
		LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		servicoPrestado.setData(data);
		servicoPrestado.setCliente(cliete);

		return servicoPrestado;
	}
}
