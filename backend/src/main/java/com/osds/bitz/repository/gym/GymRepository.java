package com.osds.bitz.repository.gym;

import com.osds.bitz.model.entity.gym.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface GymRepository extends JpaRepository<Gym, String> {
    Gym getGymByName(String name);

    ArrayList<Gym> getGymsBySido(String sido);
}
