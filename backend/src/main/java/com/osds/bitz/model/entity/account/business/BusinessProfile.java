package com.osds.bitz.model.entity.account.business;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="businessprofile")
@Builder
public class BusinessProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                        // 사업자ID

    @Column(nullable = false)
    private String name;                    // 이름

    @Column(nullable = false)
    private String phone;                   // 휴대폰번호

    @Column(nullable = false)
    private String bank;                    // 입금은행

    @Column(nullable = false)
    private String account;                 // 입금계좌

    @Lob
    @Column(nullable = false)
    private byte[] businessRegistration;    // 사업자등록증

    @OneToOne
    @JoinColumn(name = "business_id")
    private BusinessAuth businessAuth;
}
