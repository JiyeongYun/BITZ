package com.osds.bitz.repository.img;

import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.img.GymImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface GymImageRepository  extends JpaRepository<GymImage,Long> {
    GymImage getGymImageByGym(Gym gym);

    @Transactional
    void deleteAllByGym(Gym gym);
}
