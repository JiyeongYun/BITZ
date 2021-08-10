package com.osds.bitz.repository.gym;


import com.osds.bitz.model.entity.gym.GymReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymReviewRepository extends JpaRepository<GymReview, Long> {
}
