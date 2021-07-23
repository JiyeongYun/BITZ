package com.osds.bitz.model.log;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="loginLog")
public class LoginLog {

    @Id
    private String id; // 접속자ID

}
