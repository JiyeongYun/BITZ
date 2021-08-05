package com.osds.bitz.controller.game;

import com.osds.bitz.model.network.request.gym.GameRequest;
import com.osds.bitz.model.network.response.game.GameDetailResponse;
import com.osds.bitz.model.network.response.game.GameListResponse;
import com.osds.bitz.model.network.response.game.GameResponse;
import com.osds.bitz.service.game.GameService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/game")
@Api("Game 컨트롤러 API V1")
@Slf4j
public class GameController {

    private GameService gameService;

    @PostMapping("/game")
    @ApiOperation(value = "게임 등록", notes = "게임의 정보를 DB에 저장합니다.")
    public ResponseEntity<GameResponse> createGame(@RequestBody @ApiParam(value = "게임 정보") GameRequest gameRequest) throws Exception {
        GameResponse response = new GameResponse(gameService.createGame(gameRequest));
        return new ResponseEntity<GameResponse>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/game")
    @ApiOperation(value = "게임 상세", notes = "게임 ID로 게임 상세정보를 조회합니다.")
    public ResponseEntity<GameDetailResponse> getGameDetail(@RequestParam(value = "gameId") long gameId) {
        GameDetailResponse response = gameService.getGameDetail(gameId);
        return new ResponseEntity<GameDetailResponse>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "/game")
    @ApiOperation(value = "게임 삭제", notes = "게임 ID로 게임 삭제합니다.")
    public ResponseEntity deleteGame(@RequestParam(value = "gameId") long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/gamelist")
    @ApiOperation(value = "게임 목록", notes = "날짜와 지역정보로 게임리스트를 조회합니다.")
    public ResponseEntity<List<GameListResponse>> getGameList(@RequestParam(value = "date") Date date, @RequestParam(value = "sido") String sido) {
        ResponseEntity<List<GameListResponse>> response = null;
        response = new ResponseEntity<>(gameService.getGameList(date, sido), HttpStatus.OK);

        return response;
    }

    /*@GetMapping("/showgame")
    @ApiOperation(value = "게임 보기", notes = "게임의 정보를 조회합니다.")
    public ResponseEntity<GameResponse> showGame() throws Exception {

        return new ResponseEntity<ResponseEntity>(response, HttpStatus.OK);
    }*/


}
