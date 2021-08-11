package com.osds.bitz.model;

import com.osds.bitz.model.entity.account.user.UserAuth;
import lombok.Data;

import java.util.ArrayList;

@Data
public class RecordTable {

    private int teamA;
    private int teamB;
    private ArrayList<Integer> teamAScoreList;
    private ArrayList<Integer> teamBScoreList;
    private ArrayList<UserAuth> recorderList;

}
