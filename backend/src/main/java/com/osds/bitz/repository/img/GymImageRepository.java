package com.osds.bitz.repository.img;

import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.img.GymImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymImageRepository  extends JpaRepository<GymImage,Long> {
    GymImage getGymImageByGym(Gym gym);
}
