package com.osds.bitz.controller;

import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.network.request.RecordRequest;
import com.osds.bitz.model.network.request.ReviewRequest;
import com.osds.bitz.model.network.request.gym.GameRequest;
import com.osds.bitz.model.network.response.game.GameDetailResponse;
import com.osds.bitz.model.network.response.game.GameListResponse;
import com.osds.bitz.model.network.response.game.GameResponse;
import com.osds.bitz.service.GameService;
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
import java.util.Map;

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
        if (response == null)
            return new ResponseEntity<GameDetailResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<GameDetailResponse>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "/game")
    @ApiOperation(value = "게임 삭제", notes = "게임 ID로 게임 삭제합니다.")
    public ResponseEntity deleteGame(@RequestParam(value = "gameId") long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(value = "/game")
    @ApiOperation(value = "게임 수정", notes = "게임 수정")
    public ResponseEntity<Game> updateGame(@RequestBody GameRequest gameRequest) {
        Game game = gameService.updateGame(gameRequest);
        return new ResponseEntity<Game>(HttpStatus.OK);
    }

    @GetMapping("/gamelist")
    @ApiOperation(value = "게임 목록", notes = "날짜와 지역정보로 게임리스트를 조회합니다.")
    public ResponseEntity<List<GameListResponse>> getGameList(@RequestParam(value = "date") Date date, @RequestParam(value = "sido") String sido) {
        List<GameListResponse> result = gameService.getGameList(date, sido);
        if (result == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/game/reserve")
    @ApiOperation(value = "게임 예약", notes = "사용자가 픽업게임을 예약합니다")
    public ResponseEntity reserveGame(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        Long gameId = Long.parseLong(requestBody.get("gameId"));
        gameService.reserveGame(userId, gameId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/game/reserve")
    @ApiOperation(value = "게임 입금", notes = "사용자의 픽업게임 예약상태를 입금으로 변경합니다.")
    public ResponseEntity payGame(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        Long gameId = Long.parseLong(requestBody.get("gameId"));
        gameService.payGame(userId, gameId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/gamerecord")
    @ApiOperation(value = "경기 기록 저장", notes = "경기 기록을 저장합니다.")
    public ResponseEntity createRecord(@RequestBody @ApiParam(value = "리뷰 정보") RecordRequest recordRequest) throws Exception {
        gameService.createRecord(recordRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/review")
    @ApiOperation(value = "경기 리뷰 저장", notes = "경기 리뷰를 저장합니다.")
    public ResponseEntity createReview(@RequestBody @ApiParam(value = "리뷰 정보") ReviewRequest reviewRequest) throws Exception {
        gameService.createReview(reviewRequest);
        return new ResponseEntity(HttpStatus.OK);
    }


}
