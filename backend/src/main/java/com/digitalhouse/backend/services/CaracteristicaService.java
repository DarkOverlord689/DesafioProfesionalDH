package com.digitalhouse.backend.services;

import com.digitalhouse.backend.models.Caracteristica;
import com.digitalhouse.backend.repositories.CaracteristicaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CaracteristicaService {
    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    public List<Caracteristica> listarTodas() {
        return caracteristicaRepository.findAll();
    }

    public Caracteristica crear(Caracteristica caracteristica) {
        caracteristica.setNombre(caracteristica.getNombre().trim());
        caracteristica.setIcono(caracteristica.getIcono().trim());
        return caracteristicaRepository.save(caracteristica);
    }

    public void eliminar(Long id) {
        caracteristicaRepository.deleteById(id);
    }
}
