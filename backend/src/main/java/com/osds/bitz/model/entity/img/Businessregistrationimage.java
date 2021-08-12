package com.osds.bitz.model.entity.img;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "businessregistrationimage")
@Builder
public class Businessregistrationimage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 이미지 ID

    private String url;

    @OneToOne
    @JoinColumn(name = "business_id")
    private BusinessAuth businessAuth;
}
