package com.osds.bitz.model.entity.img;


import com.osds.bitz.model.entity.account.user.UserAuth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "userprofileimage")
@Builder
public class Userprofileimage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 이미지 ID

    private String url;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAuth userAuth;
}
