package com.osds.bitz.model.account.user;

import javax.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class MannerPK implements Serializable {

    private String uID; // 유저ID
    private String recordID; // 기록자ID

}