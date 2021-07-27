package com.osds.bitz.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserState {

    ON_DEPOSIT(0, "입금중"),
    WAITING(1, "대기중"),
    COMPLETE(2, "완료")
    ;

    private Integer id;
    private String status;
}
