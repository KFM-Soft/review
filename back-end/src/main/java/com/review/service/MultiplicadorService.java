package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.review.models.Multiplicador;
import com.review.repository.MultiplicadorRepository;

@Service
public class MultiplicadorService {

    @Autowired
    private MultiplicadorRepository repository;

    public List<Multiplicador> getAll() {
        return repository.findAll();
    }

    public Page<Multiplicador> getBySistema(boolean sistema, Pageable page) {
        return repository.findBySistema(sistema, page);
    }

    public Multiplicador getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Page<Multiplicador> getByEmpresaId(Long id, Pageable page) {
        return repository.getByEmpresaId(id, page);
    }

    public Page<Multiplicador> getMultiplicadorByNcmIdAndAliquotaId(Long ncm_id, Long aliquota_id, Pageable page ) {
        return repository.getMultiplicadorByNcmIdAndAliquotaId(ncm_id, aliquota_id, page);
    }

    public Multiplicador getByProductCest(String id) {
        return repository.getMultiplicadorByCest(id);
    }

    public Multiplicador getByProductCestEmpresa(String cest, Long empresa_id) {
        return repository.getMultiplicadorByCestAndEmpresa(cest, empresa_id);
    }

    public Multiplicador getByProductNcm(String ncm) {
        return repository.getMultiplicadorByNCM(ncm);
    }

    public Multiplicador save(Multiplicador objeto) {
        return repository.save(objeto);
    }

    public List<Multiplicador> saveList(List<Multiplicador> multiplicadores) {
        return repository.saveAll(multiplicadores);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
