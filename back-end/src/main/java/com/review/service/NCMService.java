package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.NCM;
import com.review.repository.NCMRepository;

@Service
public class NCMService {

    @Autowired
    private NCMRepository repository;

    public List<NCM> getAll() {
        return repository.findAll();
    }

    public NCM getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<NCM> getByEmpresaId(long id){
        return repository.getByEmpresaId(id);
    }

    public List<NCM> getBySistema(boolean sistema){
        return repository.findBySistema(sistema);
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
