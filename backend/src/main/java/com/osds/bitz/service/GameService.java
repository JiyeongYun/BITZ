package com.osds.bitz.service;

import com.osds.bitz.model.entity.account.user.Manner;
import com.osds.bitz.model.entity.account.user.Skill;
import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.game.GameParticipant;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.gym.GymReview;
import com.osds.bitz.model.network.request.RecordRequest;
import com.osds.bitz.model.network.request.ReviewRequest;
import com.osds.bitz.model.network.request.gym.GameRequest;
import com.osds.bitz.model.network.response.game.GameDetailResponse;
import com.osds.bitz.model.network.response.game.GameListResponse;
import com.osds.bitz.repository.account.user.MannerRepository;
import com.osds.bitz.repository.account.user.SkillRepository;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import com.osds.bitz.repository.game.GameParticipantRepository;
import com.osds.bitz.repository.game.GameRepository;
import com.osds.bitz.repository.gym.GymRepository;
import com.osds.bitz.repository.gym.GymReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@Slf4j
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private GameParticipantRepository gameParticipantRepository;

    @Autowired
    private GymRepository gymRepository;

    @Autowired
    private GymReviewRepository gymReviewRepository;

    @Autowired
    private MannerRepository mannerRepository;

    @Autowired
    private SkillRepository skillRepository;

    // 게임 등록
    public Game createGame(GameRequest gameRequest) {

        // 체육관 이름을 통해 Gym객체를 받아온다.
        Gym gym = this.gymRepository.getGymByName(gameRequest.getGymName());

        // game테이블 내용 설정하기
        Game game = Game.builder()
                .gym(gym)
                .date(gameRequest.getDate())
                .startTime(gameRequest.getStartTime())
                .endTime(gameRequest.getEndTime())
                .minPeople(gameRequest.getMinPeople())
                .maxPeople(gameRequest.getMaxPeople())
                .participationFee(gameRequest.getParticipationFee())
                .build();

        return this.gameRepository.save(game); // 작업중
    }

    // 게임 삭제
    public void deleteGame(long gameId) {
        gameParticipantRepository.deleteAllByGameId(gameId);
        gameRepository.deleteAllById(gameId);
    }

    // 게임 수정
    public Game updateGame(GameRequest gameRequest) {
        Game updateGame = gameRepository.getGameById(gameRequest.getGameId());
        Gym gym = updateGame.getGym();

        updateGame.builder()
                .id(gameRequest.getGameId())
                .gym(gym)
                .date(gameRequest.getDate())
                .startTime(gameRequest.getStartTime())
                .endTime(gameRequest.getEndTime())
                .minPeople(gameRequest.getMinPeople())
                .maxPeople(gameRequest.getMaxPeople())
                .participationFee(gameRequest.getParticipationFee())
                .build();

        return this.gameRepository.save(updateGame);
    }

    // 게임 상세보기
    public GameDetailResponse getGameDetail(long gameId) {
        Game game = this.gameRepository.getGameById(gameId);
        ArrayList<GameParticipant> gameParticipantList = gameParticipantRepository.getGameParticipantsByGameId(gameId);

        return new GameDetailResponse(gameParticipantList, game);
    }

    // 게임 목록
    public ArrayList<GameListResponse> getGameList(Date date, String sido) {
        ArrayList<Game> gameList = this.gameRepository.getGamesByDate(date); // 해당 날짜의 게임

        ArrayList<GameListResponse> result = new ArrayList<GameListResponse>();

        for (int i = 0; i < gameList.size(); i++) { // 해당 날짜의 게임 중 체육관 정보
            Game game = gameList.get(i);
            Gym gym = game.getGym();
            if (gym.getSido().equals(sido)) {
                result.add(new GameListResponse(game, gym));
            }
        }


        return result;
    }

    // 게임 예약
    public void reserveGame(String userId, Long gameId) {
        UserAuth userAuth = userAuthRepository.getById(userId);

        GameParticipant newGameParticipant =
                new GameParticipant().builder()
                        .userId(userAuth)
                        .gameId(gameId)
                        .team(0)
//                        .state() // 대기중 상태
                        .build();

        gameParticipantRepository.save(newGameParticipant);
    }

    // 입금 완료
    public void payGame(String userId, Long gameId) {
        UserAuth userAuth = userAuthRepository.getById(userId);
        GameParticipant gameParticipant = gameParticipantRepository.getGameParticipantByUserId(userAuth);

        GameParticipant updateGameParticipant = gameParticipantRepository.getById(gameParticipant.getId());

        updateGameParticipant.builder()
//                .state()  // 입금 상태
                .build();

        gameParticipantRepository.save(updateGameParticipant);
    }

    // 게임 참여자 목록 반환
    public ArrayList<GameParticipant> getGameParticipantList(Long gameId) {
        ArrayList<GameParticipant> result = gameParticipantRepository.getGameParticipantsByGameId(gameId);
        return result;
    }

    /**
     * 게임 점수 기록
     */
    public void createRecord(RecordRequest recordRequest) {


        // 점수 기록자의 매너 점수도 0.2점 올리기


    }

    /**
     * 리뷰 저장
     */
    public void createReview(ReviewRequest reviewRequest) {

        // 1. 체육관 리뷰 저장
        GymReview gymReview = GymReview.builder()
                .gymId(reviewRequest.getGymId())        // 체육관 ID
                .userId(reviewRequest.getEmail())       // 유저 ID
                .rate(reviewRequest.getRate())          // 평점
                .date(LocalDateTime.now())              // 현재시간
                .build();
        this.gymReviewRepository.save(gymReview);

        // 2. 사용자 리뷰 저장
        // 2-1. MVP
        UserAuth mvpUser = this.userAuthRepository.getUserAuthByEmail(reviewRequest.getMvp());
        Skill skill = this.skillRepository.getSkillByUserAuth(mvpUser);
        int mvpCnt = this.skillRepository.getSkillById(skill.getId()).getMvpCnt();

        // Update MVP Count
        skill = Skill.builder()
                .mvpCnt(mvpCnt + 1)
                .build();
        this.skillRepository.save(skill);

        // 2-2. Manner
        // 2-2-1. Good
        for (String userEmail : reviewRequest.getGoodPeople()) {
            UserAuth user = this.userAuthRepository.getUserAuthByEmail(userEmail);
            Manner manner = Manner.builder()
                    .userAuth(user)
                    .score(1)
                    .date(LocalDateTime.now())
                    .build();
            this.mannerRepository.save(manner);
        }

        // 2-2-2. Bad
        for (String userEmail : reviewRequest.getBadPeople()) {
            UserAuth user = this.userAuthRepository.getUserAuthByEmail(userEmail);

            Manner manner = Manner.builder()
                    .userAuth(user)
                    .score(-1)
                    .date(LocalDateTime.now())
                    .build();
            this.mannerRepository.save(manner);
        }


    }

}
