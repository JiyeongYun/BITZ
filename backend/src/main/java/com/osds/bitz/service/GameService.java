package com.osds.bitz.service;

import com.osds.bitz.model.entity.account.business.BusinessProfile;
import com.osds.bitz.model.entity.account.user.Manner;
import com.osds.bitz.model.entity.account.user.Skill;
import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.account.user.UserProfile;
import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.game.GameParticipant;
import com.osds.bitz.model.entity.game.GameRecord;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.gym.GymReview;
import com.osds.bitz.model.enumclass.UserState;
import com.osds.bitz.model.network.request.RecordRequest;
import com.osds.bitz.model.network.request.ReviewRequest;
import com.osds.bitz.model.network.request.gym.GameRequest;
import com.osds.bitz.model.network.response.game.GameDetailResponse;
import com.osds.bitz.model.network.response.game.GameListResponse;
import com.osds.bitz.repository.account.business.BusinessProfileRepository;
import com.osds.bitz.repository.account.user.MannerRepository;
import com.osds.bitz.repository.account.user.SkillRepository;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import com.osds.bitz.repository.account.user.UserProfileRepository;
import com.osds.bitz.repository.game.GameParticipantRepository;
import com.osds.bitz.repository.game.GameRecordRepository;
import com.osds.bitz.repository.game.GameRepository;
import com.osds.bitz.repository.gym.GymRepository;
import com.osds.bitz.repository.gym.GymReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

@Service
@Slf4j
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameRecordRepository gameRecordRepository;

    @Autowired
    private GameParticipantRepository gameParticipantRepository;

    @Autowired
    private GymRepository gymRepository;

    @Autowired
    private GymReviewRepository gymReviewRepository;

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private BusinessProfileRepository businessProfileRepository;

    @Autowired
    private MannerRepository mannerRepository;

    @Autowired
    private SkillRepository skillRepository;

    class UserSkill implements Comparable<UserSkill> {
        String userId;
        double skillScore;

        public UserSkill(String userId, double skillScore) {
            this.userId = userId;
            this.skillScore = skillScore;
        }

        @Override
        public int compareTo(UserSkill o) {
            return (int) (o.skillScore - this.skillScore);
        }
    }

    /**
     * 게임 등록
     */
    public Game createGame(GameRequest gameRequest) {

        // 체육관 이름으로 Gym객체를 받아오기
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

    /**
     * 게임 상세
     */
    public GameDetailResponse getGameDetail(long gameId) {
        Game game = this.gameRepository.getGameById(gameId);
        ArrayList<GameParticipant> gameParticipantList = gameParticipantRepository.getGameParticipantsByGameId(gameId);
        BusinessProfile businessProfile = businessProfileRepository.getBusinessProfileByBusinessAuth(game.getGym().getBusinessAuth());

        businessProfile.setBusinessRegistration(null);
        businessProfile.setBusinessAuth(null);

        for (int i = 0; i < gameParticipantList.size(); i++) // 중요 정보 제거
            gameParticipantList.get(i).getUserAuth().setPassword(null);

        return new GameDetailResponse(gameParticipantList, game, businessProfile);
    }

    /**
     * 게임 삭제
     */
    public void deleteGame(long gameId) {
        gameParticipantRepository.deleteAllByGameId(gameId);
        gameRepository.deleteAllById(gameId);
    }

    /**
     * 게임 수정
     */
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

    /**
     * 게임 목록
     */
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

    /**
     * 게임 예약
     */
    public void reserveGame(String userEmail, Long gameId) {
        UserAuth userAuth = userAuthRepository.getUserAuthByEmail(userEmail);

        GameParticipant newGameParticipant =
                new GameParticipant().builder()
                        .userAuth(userAuth)
                        .gameId(gameId)
                        .team(0)
                        .state(UserState.ON_DEPOSIT)
                        .build();

        gameParticipantRepository.save(newGameParticipant);
    }

    /**
     * 입금 완료 요청
     */
    public void payGame(String userEmail, Long gameId) {
        UserAuth userAuth = userAuthRepository.getUserAuthByEmail(userEmail);

        GameParticipant updateGameParticipant = gameParticipantRepository.getGameParticipantByUserAuthAndGameId(userAuth, gameId);

        updateGameParticipant = updateGameParticipant.builder()
                .id(updateGameParticipant.getId())
                .gameId(gameId)
                .userAuth(userAuth)
                .state(UserState.WAITING)
                .team(updateGameParticipant.getTeam())
                .build();

        gameParticipantRepository.save(updateGameParticipant);
    }

    /**
     * 사용자 확정
     **/
    public void confirmGame(String userEmail, Long gameId) {
        UserAuth userAuth = userAuthRepository.getUserAuthByEmail(userEmail);

        GameParticipant updateGameParticipant = gameParticipantRepository.getGameParticipantByUserAuthAndGameId(userAuth, gameId);

        updateGameParticipant = updateGameParticipant.builder()
                .id(updateGameParticipant.getId())
                .gameId(gameId)
                .userAuth(userAuth)
                .state(UserState.COMPLETE)
                .team(updateGameParticipant.getTeam())
                .build();

        gameParticipantRepository.save(updateGameParticipant);
    }

    /**
     * 참가자 삭제
     */
    public void deleteGameParticipant(String userEmail, Long gameId) {
        UserAuth userAuth = userAuthRepository.getUserAuthByEmail(userEmail);

        gameParticipantRepository.deleteGameParticipantByUserAuthAndGameId(userAuth, gameId);
    }

    /**
     * 팀 배정
     */
    public void createTeaming(Long gameId) {
        ArrayList<GameParticipant> participants = this.gameParticipantRepository.getGameParticipantsByGameId(gameId);

        // 1. 참가자 인원 수에 따라 팀별 인원수 계산
        int[] numOfTeam = getNumOfTeam(participants.size());

        // 2. 각 참가자들의 실력 점수(+ 키)를 계산
        // UserSKill(String userId, double skill)
        ArrayList<UserSkill> userSkills = new ArrayList<>();
        for (GameParticipant participant : participants) {
            UserAuth userAuth = participant.getUserAuth();
            UserProfile userProfile = userProfileRepository.getUserProfileByUserAuth(userAuth);
            Skill skill = this.skillRepository.getSkillByUserAuth(userAuth);

            // 실력 점수 계산
            double total = getSkillScore(skill) + userProfile.getHeight();

            // 참가자 아이디 + 실력점수
            userSkills.add(new UserSkill(userAuth.getId(), total));
        }

        // 3. 실력점수에 따라 내림차순 정렬
        Collections.sort(userSkills);
        System.out.println("=============================");
        for(UserSkill u : userSkills){
            System.out.println("id: " + u.userId + ", skill score: " + u.skillScore);
        }
        System.out.println("=============================");

        // 4. 팀 배정
        ArrayList<UserSkill[]> team = setTeamBySkillScore(numOfTeam, userSkills);

        // 5. DB에 저장
        for(int i = 0; i < team.size(); i++){
            for(int j = 0; j < team.get(i).length; j++){
                UserSkill userSkill = team.get(i)[j];
                UserAuth userAuth = this.userAuthRepository.getUserAuthById(userSkill.userId);
                GameParticipant gameParticipant = this.gameParticipantRepository.getGameParticipantByUserAuth(userAuth);
                gameParticipant.setId(gameParticipant.getId());
                gameParticipant.setTeam(i+1);
                this.gameParticipantRepository.save(gameParticipant);
            }
        }
    }

    /**
     * createTeaming() - 참가자 수에 따른 팀별 인원수 리턴
     */
    public int[] getNumOfTeam(int numOfParticipant) {
        int[][] teams = {
                {6, 6, -1},
                {7, 6, -1},
                {7, 7, -1},
                {5, 5, 5},
                {8, 8, -1},
                {5, 6, 6},
                {6, 6, 6}
        };

        return teams[numOfParticipant - 12];
    }

    /**
     * createTeaming() - 실력 점수 계산
     */
    public double getSkillScore(Skill skill) {
        return (skill.getWinCnt() * 1.2) - (skill.getLoseCnt() * 1.0) + (skill.getMvpCnt() * 0.2);
    }

    /**
     * createTeaming() - 팀별 인원배치
     */
    public ArrayList<UserSkill[]> setTeamBySkillScore(int[] numOfTeam, ArrayList<UserSkill> userSkills){

        // 참가자수에 따른 team 개수 구하고 세팅하기
        int teamCnt = numOfTeam[2] == -1 ? 2 : 3;
        ArrayList<UserSkill[]> team = new ArrayList<>();
        for (int i = 0; i < teamCnt; i++) {
            team.add(new UserSkill[numOfTeam[i]]);
        }

        // skillScore에 따라 팀 배정하기
        /*
            teamIdx: team을 가리키는 index
            peopleIdx: 팀에 배정된 인원수를 가리키는 index
            direction: 방향을 의미하는 변수
        */
        int teamIdx = 0, peopleIdx = 0;
        int direction = 1;
        for (int i = 0; i < userSkills.size(); i++) {
            UserSkill userSkill = userSkills.get(i);
            team.get(teamIdx)[peopleIdx] = userSkill;
            teamIdx = teamIdx + direction;

            if(teamIdx == -1 || teamIdx == teamCnt){
                peopleIdx++;
                direction = direction * -1;
                teamIdx = teamIdx + direction;
            }
        }
        return team;
    }

    /**
     * 게임 점수 기록
     */
    public void createRecord(RecordRequest recordRequest) {
        GameRecord gameRecord = GameRecord.builder()
                .team(recordRequest.getTeam())
                .quarter(recordRequest.getQuarter())
                .score(recordRequest.getScore())
                .userId(recordRequest.getUserId())
                .gameId(recordRequest.getGameId())
                .build();
        gameRecordRepository.save(gameRecord);

        // 점수 기록자의 매너 점수도 0.2점 올리기 (한 쿼터에 2개의 로그가 등록되므로 0.1점 씩)
        UserAuth userAuth = userAuthRepository.getById(gameRecord.getUserId()); // 기록자 정보 얻어오기
        Manner manner = Manner.builder()
                .userAuth(userAuth)
                .score(1)
                .build();
        mannerRepository.save(manner);
    }


    /**
     * 경기 리뷰 저장
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
                    .score(10)
                    .date(LocalDateTime.now())
                    .build();
            this.mannerRepository.save(manner);
        }

        // 2-2-2. Bad
        for (String userEmail : reviewRequest.getBadPeople()) {
            UserAuth user = this.userAuthRepository.getUserAuthByEmail(userEmail);

            Manner manner = Manner.builder()
                    .userAuth(user)
                    .score(-10)
                    .date(LocalDateTime.now())
                    .build();
            this.mannerRepository.save(manner);
        }

    }


    // 게임 참여자 목록 반환
    public ArrayList<GameParticipant> getGameParticipantList(Long gameId) {
        ArrayList<GameParticipant> result = gameParticipantRepository.getGameParticipantsByGameId(gameId);
        return result;
    }


    // 한 게임에 대한 게임 기록들 반환
    public ArrayList<GameRecord> getGameRecordList(Long gameId) {
        ArrayList<GameRecord> result = gameRecordRepository.getGameRecordsByGameId(gameId);
        return result;
    }


    // 한 게임에서 한 팀의 인원들 반환
    public ArrayList<GameParticipant> getGameParticipant(Long gameId, int team) {
        ArrayList<GameParticipant> result = gameParticipantRepository.getGameParticipantsByGameIdAndTeam(gameId, team);
        return result;
    }

}
