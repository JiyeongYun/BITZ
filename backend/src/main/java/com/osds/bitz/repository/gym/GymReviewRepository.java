package com.osds.bitz.repository.gym;


import com.osds.bitz.model.entity.gym.GymReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface GymReviewRepository extends JpaRepository<GymReview, Long> {
    GymReview getGymReviewByUserIdAndGymId(String userId, Long gymId);

    ArrayList<GymReview> getGymReviewsByUserIdAndGymId(String userId, Long gymId);

    @Transactional
    void deleteAllByUserId(String userId);
}
