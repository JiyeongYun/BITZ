package com.osds.bitz.model.entity.img;

import com.osds.bitz.model.entity.gym.Gym;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "gymimage")
@Builder
public class GymImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 이미지 ID

    private String url;

    @OneToOne
    @JoinColumn(name = "gym_id")
    private Gym gym;
}
