package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.NCM;
import java.util.List;


public interface NCMRepository extends JpaRepository<NCM, Long>{
    
    public List<NCM> findBySistema(boolean sistema);

    @Query("SELECT prod FROM NCM prod WHERE empresa.id = ?1")
    public List<NCM> getByEmpresaId(Long empresa_id);
}
