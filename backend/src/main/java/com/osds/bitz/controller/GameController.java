package com.osds.bitz.controller;

import com.osds.bitz.model.RecordTable;
import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.network.request.RecordRequest;
import com.osds.bitz.model.network.request.ReviewRequest;
import com.osds.bitz.model.network.request.gym.GameRequest;
import com.osds.bitz.model.network.response.game.GameDetailResponse;
import com.osds.bitz.model.network.response.game.GameListResponse;
import com.osds.bitz.model.network.response.game.GameResultResponse;
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
    public ResponseEntity createGame(@RequestBody @ApiParam(value = "게임 정보") GameRequest gameRequest) {
        if (gameService.createGame(gameRequest) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/game")
    @ApiOperation(value = "게임 상세", notes = "게임 ID로 게임 상세정보를 조회합니다.")
    public ResponseEntity<GameDetailResponse> getGameDetail(@RequestParam(value = "gameId") long gameId) {
        GameDetailResponse response = gameService.getGameDetail(gameId);
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(value = "/game")
    @ApiOperation(value = "게임 수정", notes = "게임 수정")
    public ResponseEntity<Game> updateGame(@RequestBody GameRequest gameRequest) {
        if (gameService.updateGame(gameRequest) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping(value = "/game")
    @ApiOperation(value = "게임 삭제", notes = "게임 ID로 게임 삭제합니다.")
    public ResponseEntity deleteGame(@RequestParam(value = "gameId") long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/game/list")
    @ApiOperation(value = "게임 목록", notes = "날짜와 지역정보로 게임리스트를 조회합니다.")
    public ResponseEntity<List<GameListResponse>> getGameList(@RequestParam(value = "date") Date date, @RequestParam(value = "sido") String sido) {
        List<GameListResponse> response = gameService.getGameList(date, sido);
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/game/mygame")
    @ApiOperation(value = "예약한 게임 리스트 조회", notes = "사용자가 예약한 게임리스트를 조회합니다.")
    public ResponseEntity<List<Game>> getMyGameList(@RequestParam(value = "email") String email) {
        List<Game> response = gameService.getMyGameList(email);
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/game/reserve")
    @ApiOperation(value = "게임 예약", notes = "사용자가 픽업게임을 예약합니다")
    public ResponseEntity reserveGame(@RequestBody Map<String, String> requestBody) {
        if (gameService.reserveGame(requestBody.get("userEmail"), Long.parseLong(requestBody.get("gameId"))) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/game/reserve")
    @ApiOperation(value = "입금 완료 요청", notes = "사용자의 픽업게임 예약상태를 입금으로 변경합니다.")
    public ResponseEntity payGame(@RequestBody Map<String, String> requestBody) {
        if (gameService.payGame(requestBody.get("userEmail"), Long.parseLong(requestBody.get("gameId"))) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/gameparticipant")
    @ApiOperation(value = "사용자 확정", notes = "사업자가 사용자를 픽업게임 확정짓습니다.")
    public ResponseEntity confirmGame(@RequestBody Map<String, String> requestBody) {
        if (gameService.confirmGame(requestBody.get("userEmail"), Long.parseLong(requestBody.get("gameId"))) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/gameparticipant")
    @ApiOperation(value = "참가자 삭제", notes = "사업자가 사용자를 픽업게임 참가자 리스트에서 삭제합니다.")
    public ResponseEntity deleteGameParticipant(@RequestBody Map<String, String> requestBody) {
        gameService.deleteGameParticipant(requestBody.get("userEmail"), Long.parseLong(requestBody.get("gameId")));
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/teaming")
    @ApiOperation(value = "팀 배정", notes = "참가자들을 팀에 배정합니다.")
    public ResponseEntity createTeaming(@RequestBody @ApiParam(value = "게임 정보") Map<String, Long> requestBody) {
        if (gameService.createTeaming(requestBody.get("gameId")) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/gamerecord")
    @ApiOperation(value = "게임 점수 기록", notes = "경기 기록을 저장합니다.")
    public ResponseEntity createRecord(@RequestBody @ApiParam(value = "게임 정보") RecordRequest recordRequest) {
        if (gameService.createRecord(recordRequest) == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/gamerecord")
    @ApiOperation(value = "게임 점수 기록 조회", notes = "경기 기록을 조회합니다.")
    public ResponseEntity<RecordTable[]> readRecord(@RequestParam(value = "gameId") Long gameId) {
        RecordTable[] response = gameService.readRecord(gameId);
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/gameresult")
    @ApiOperation(value = "게임 결과 반영", notes = "끝난 경기의 결과를 반영합니다.")
    public ResponseEntity<GameResultResponse> completeGame(@RequestBody Long gameId) {
        GameResultResponse response = gameService.completeGame(gameId);
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/review")
    @ApiOperation(value = "경기 리뷰 저장", notes = "경기 리뷰를 저장합니다.")
    public ResponseEntity createReview(@RequestBody @ApiParam(value = "리뷰 정보") ReviewRequest reviewRequest) {
        gameService.createReview(reviewRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/review")
    @ApiOperation(value = "경기 리뷰 작성 유무 확인", notes = "경기 리뷰를 작성했었는지 확인합니다.")
    public ResponseEntity readReview(@RequestParam(value = "userEmail") String userEmail, @RequestParam(value = "gameId") Long gameId) {
        if (gameService.readReview(userEmail, gameId))
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return new ResponseEntity(HttpStatus.OK);
    }
}
