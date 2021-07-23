package com.osds.bitz.dao.gym;

import com.osds.bitz.model.gym.GymInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymDao extends JpaRepository<GymInfo, String> {
}
