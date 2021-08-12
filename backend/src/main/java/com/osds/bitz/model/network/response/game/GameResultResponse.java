package com.osds.bitz.model.network.response.game;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameResultResponse {

    private int[][] gameResult;

    private int[][] gameScoreTable;
}
