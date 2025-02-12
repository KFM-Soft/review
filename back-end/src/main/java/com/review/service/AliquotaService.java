package com.review.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.review.models.Aliquota;
import com.review.models.Estado;
import com.review.repository.AliquotaRepository;
import com.review.repository.EstadoRepository;

@Service
public class AliquotaService {

    @Autowired
    private AliquotaRepository repository;
    @Autowired
    private EstadoRepository estadoRepository;

    public Page<Aliquota> getAll(String termoBusca, Pageable page) {
        if (termoBusca != null && !termoBusca.isBlank()) {
            return repository.busca(termoBusca, page);
        }
        return repository.findAll(page);
    }

    public Aliquota getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Aliquota save(Aliquota objeto) {
        return repository.save(objeto);
    }

    public List<Aliquota> saveList(List<Aliquota> aliquotas) {
        return repository.saveAll(aliquotas);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Aliquota getByOrigemDestino(String origem, String destino) {
        return repository.findByOrigemDestino(origem, destino);
    }
    public Aliquota getByOrigemDestinoEmpresa(String origem, String destino,Long empresa_id) {
        return repository.findByOrigemDestinoEmpresa(origem, destino, empresa_id);
    }

    public Page<Aliquota> getByEmpresa(String termoBusca, Long id, Pageable page){
        if (termoBusca == null || termoBusca.isEmpty()) {
            return repository.findByEmpresaId(id, page);
            
        }
        return repository.buscaEmpresa(termoBusca, id, page);
    }

    public Page<Aliquota> getBySistema(String termoBusca, Pageable page){
        if (termoBusca == null || termoBusca.isEmpty()) {
            return repository.findBySistema(page);
            
        }
        return repository.buscaSistema(termoBusca, page);
    }

    // @EventListener(ApplicationReadyEvent.class)
    public void geraAliquotasEntreEstados() {
        List<Estado> estados = estadoRepository.findAll();
        List<Aliquota> aliquotas = new ArrayList<Aliquota>();
        for (Estado origem : estados) {
            for(Estado destino : estados) {
                Aliquota aliquota = new Aliquota();
                System.out.println(aliquota);
                aliquota.setOrigem(origem);
                aliquota.setDestino(destino);
                aliquota.setPorcentagem(new BigDecimal(0));
                aliquotas.add(aliquota);
            }
        }
        repository.saveAll(aliquotas);
    }

}
