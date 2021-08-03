package com.osds.bitz.controller.game;

import com.osds.bitz.model.entity.game.GameRecord;
import com.osds.bitz.model.network.request.GameRequest;
import com.osds.bitz.model.network.response.GameResponse;
import com.osds.bitz.service.game.GameService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/account")
@Api("Game 컨트롤러 API V1")
@Slf4j
public class GameController {

    private GameService gameService;

    @PostMapping("/creategame")
    @ApiOperation(value="게임 등록", notes="게임의 정보를 DB에 저장합니다.")
    public ResponseEntity<GameResponse> createGame(@RequestBody @ApiParam(value="게임 정보") GameRequest gameRequest) throws Exception{
        //GameResponse response = new GameResponse(gameService.createGame(gameRequest));
        return null;// ResponseEntity<GameResponse>(response, HttpStatus.OK);
    }

}
