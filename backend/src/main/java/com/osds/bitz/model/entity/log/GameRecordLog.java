package com.osds.bitz.model.entity.log;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gamerecordlog")
@Builder
public class GameRecordLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 로그인로그 id

    @Column(nullable = false)
    private Long gameId;
}
