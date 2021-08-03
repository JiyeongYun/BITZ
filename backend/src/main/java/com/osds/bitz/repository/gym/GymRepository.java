package com.osds.bitz.repository.gym;

import com.osds.bitz.model.entity.gym.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRepository extends JpaRepository<Gym, String> {
}
