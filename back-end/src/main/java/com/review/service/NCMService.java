package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.review.models.NCM;
import com.review.repository.NCMRepository;

@Service
public class NCMService {

    @Autowired
    private NCMRepository repository;

    public List<NCM> get(String termoBusca, Pageable page) {
        List<NCM> registros = this.getAll(termoBusca, page).getContent();
        return registros;
    }

    public Page<NCM> getAll(String termoBusca, Pageable page) {
        if (termoBusca != null && !termoBusca.isBlank()) {
            return repository.busca(termoBusca, page);
            
        }
        return repository.findAll(page);
    }

    public NCM getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Page<NCM> getByEmpresaId(String termoBusca, long id, Pageable page) {
        if (termoBusca != null && !termoBusca.isBlank()) {
            return repository.buscaByEmpresaId(termoBusca, id, page);
            
        }
        return repository.getByEmpresaId(id, page);
    }

    public Page<NCM> getBySistema(boolean sistema, Pageable page) {
        return repository.findBySistema(page);
    }

    public NCM save(NCM objeto) {
        return repository.save(objeto);
    }

    public List<NCM> saveList(List<NCM> ncms) {
        return repository.saveAll(ncms);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
