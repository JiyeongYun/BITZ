package com.osds.bitz.service;

import com.osds.bitz.model.entity.account.user.FavoriteLocation;
import com.osds.bitz.model.entity.account.user.Position;
import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.account.user.UserProfile;
import com.osds.bitz.model.entity.game.GameParticipant;
import com.osds.bitz.model.entity.log.LoginLog;
import com.osds.bitz.model.entity.token.RefreshToken;
import com.osds.bitz.model.network.request.account.ReadAuthRequest;
import com.osds.bitz.model.network.request.account.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.account.UserAuthRequest;
import com.osds.bitz.model.network.request.account.UserRequest;
import com.osds.bitz.model.network.response.account.UserResponse;
import com.osds.bitz.repository.account.user.*;
import com.osds.bitz.repository.game.GameParticipantRepository;
import com.osds.bitz.repository.game.GameRecordRepository;
import com.osds.bitz.repository.gym.GymReviewRepository;
import com.osds.bitz.repository.log.LoginLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;

@Service
@Slf4j
public class UserService extends BaseAuthService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private FavoriteLocationRepository favoriteLocationRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private MannerRepository mannerRepository;

    @Autowired
    private GameParticipantRepository gameParticipantRepository;

    @Autowired
    private GameRecordRepository gameRecordRepository;

    @Autowired
    private GymReviewRepository gymReviewRepository;

    @Autowired
    private LoginLogRepository loginLogRepository;

    /**
     * 회원가입
     */
    public void createUser(UserAuthRequest userAuthRequest) {

        // userID로 설정할 랜덤 값 생성
        String userAuthId = generateRandomNumber(true);

        // userID 중복 체크
        UserAuth duplicationUserAuth = this.userAuthRepository.getById(userAuthId);
        while (userAuthId.equals(duplicationUserAuth.getId())) {
            userAuthId = generateRandomNumber(true);
        }

        // userauth테이블 내용 설정하기
        UserAuth userAuth = UserAuth.builder()
                .id(userAuthId)
                .email(userAuthRequest.getEmail())
                .password(encodingPassword(userAuthRequest.getPassword()))
                .birth(userAuthRequest.getBirth())
                .build();

        // userauth테이블에서 값 가져와서 userprofile값 설정하기
        UserProfile userProfile = UserProfile.builder()
                .name(userAuthRequest.getName())
                .nickname(userAuthRequest.getNickname())
                .phone(userAuthRequest.getPhone())
                .userAuth(userAuth)
                .build();

        UserAuth newUserAuth = this.userAuthRepository.save(userAuth);
        this.userProfileRepository.save(userProfile);
    }

    /**
     * 이메일 중복체크
     */
    public boolean isDuplicatedEmail(String email) {
        // 중복된 이메일이 없는 경우 false
        if (this.userAuthRepository.getUserAuthByEmail(email) == null)
            return false;
        // 중복된 이메일이 있는 경우 true
        return true;
    }

    /**
     * 닉네임 중복체크
     */
    public boolean isDuplicatedNickname(String nickname) {
        // 중복된 닉네임이 없는 경우 false
        if (this.userProfileRepository.getUserProfileByNickname(nickname) == null)
            return false;
        // 중복된 닉네임이 있는 경우 true
        return true;
    }

    /**
     * 로그인
     */
    public UserAuth readUser(ReadAuthRequest readAuthRequest) {

        // 이메일로 객체 찾아오기
        UserAuth userAuth = getUserAuthByEmail(readAuthRequest.getEmail());

        if (userAuth == null) {
            return null;
        }

        if (!passwordEncoder.matches(readAuthRequest.getPassword(), userAuth.getPassword())) {
            return null;
        }

        return userAuth;
    }

    /**
     * Token 생성
     */
    public String createToken(UserAuth userAuth) {

        // accessToken, refreshToken 생성
        String accessToken = jwtUtil.createToken(userAuth, "access");
        String refreshToken = jwtUtil.createToken(userAuth, "refresh");

        RefreshToken token = RefreshToken.builder()
                .userEmail(userAuth.getEmail())
                .value(refreshToken)
                .isGeneral(true)
                .createdAt(LocalDateTime.now())
                .build();

        this.refreshTokenRepository.save(token);
        return accessToken;
    }

    /**
     * 최초 로그인 확인
     */
    public boolean readLoginLog(String email) {
        // 로그인 로그에 있는 경우 false (최초로그인 X)
        if (this.loginLogRepository.getLoginLogByEmailAndIsGeneral(email, true) != null) {
            return false;
        }
        // 최초 로그인인 경우
        return true;
    }

    /**
     * 마이페이지 정보 저장
     */
    public void createProfile(UserRequest userRequest) {
        UserAuth userAuth = userAuthRepository.getUserAuthByEmail(userRequest.getEmail());
        UserProfile userProfile = userProfileRepository.getUserProfileByUserAuth(userAuth);

        // 키 저장
        userProfile.setHeight(userRequest.getHeight());
        this.userProfileRepository.save(userProfile);

        // 포지션 저장
        Position position = Position.builder()
                .userAuth(userAuth)
                .center(userRequest.isCenter())
                .forward(userRequest.isForward())
                .guard(userRequest.isGuard())
                .build();
        this.positionRepository.save(position);

        // 선호지역 저장
        FavoriteLocation favoriteLocation = FavoriteLocation.builder()
                .userAuth(userAuth)
                .sido1(userRequest.getSido1())
                .gugun1(userRequest.getGugun1())
                .sido2(userRequest.getSido2())
                .gugun2(userRequest.getGugun2())
                .sido3(userRequest.getSido3())
                .gugun3(userRequest.getGugun3())
                .build();
        this.favoriteLocationRepository.save(favoriteLocation);

        // loginlog에 저장
        LoginLog loginLog = LoginLog.builder()
                .email(userRequest.getEmail())
                .isGeneral(true)
                .build();
        this.loginLogRepository.save(loginLog);
    }

    /**
     * 마이페이지 정보 조회
     */
    public UserResponse readProfile(String email) {
        UserAuth userAuth = getUserAuthByEmail(email);
        UserProfile userProfile = userProfileRepository.getUserProfileByUserAuth(userAuth);
        Position position = positionRepository.getPositionByUserAuth(userAuth);
        FavoriteLocation favoriteLocation = favoriteLocationRepository.getFavoriteLocationByUserAuth(userAuth);

        UserResponse userResponse = UserResponse.builder()
                .email(userAuth.getEmail())
                .birth(userAuth.getBirth())
                .name(userProfile.getName())
                .nickname(userProfile.getNickname())
                .phone(userProfile.getPhone())
                .height(userProfile.getHeight())
                .guard(position.isGuard())
                .center(position.isCenter())
                .forward(position.isForward())
                .sido1(favoriteLocation.getSido1())
                .gugun1(favoriteLocation.getGugun1())
                .sido2(favoriteLocation.getSido2())
                .gugun2(favoriteLocation.getGugun2())
                .sido3(favoriteLocation.getSido3())
                .gugun3(favoriteLocation.getGugun3())
                .build();
        return userResponse;
    }

    /**
     * 마이페이지 정보 수정
     */
    public void updateProfile(UserRequest userRequest) {

        // UserAuth: birth
        String userAuthId = getUserAuthByEmail(userRequest.getEmail()).getId();
        UserAuth userAuth = userAuthRepository.getUserAuthById(userAuthId);
        userAuth.setBirth(userRequest.getBirth());
        this.userAuthRepository.save(userAuth);

        // UserProfile: name, nickname, phone, height
        Long userProfileId = userProfileRepository.getUserProfileByUserAuth(userAuth).getId();
        UserProfile userProfile = userProfileRepository.getUserProfileById(userProfileId);
        userProfile.setName(userRequest.getName());
        userProfile.setNickname(userRequest.getNickname());
        userProfile.setPhone(userRequest.getPhone());
        userProfile.setHeight(userRequest.getHeight());
        userProfile.setUserAuth(userAuth);
        this.userProfileRepository.save(userProfile);

        // 포지션 저장
        Long positionId = this.positionRepository.getPositionByUserAuth(userAuth).getId();
        Position position = positionRepository.getPositionById(positionId);
        position.setUserAuth(userAuth);
        position.setCenter(userRequest.isCenter());
        position.setForward(userRequest.isForward());
        position.setGuard(userRequest.isGuard());
        this.positionRepository.save(position);

        // 선호지역 저장
        Long favoriteLocationId = this.favoriteLocationRepository.getFavoriteLocationByUserAuth(userAuth).getId();
        FavoriteLocation favoriteLocation = favoriteLocationRepository.getFavoriteLocationById(favoriteLocationId);
        favoriteLocation.setUserAuth(userAuth);
        favoriteLocation.setSido1(userRequest.getSido1());
        favoriteLocation.setGugun1(userRequest.getGugun1());
        favoriteLocation.setSido2(userRequest.getSido2());
        favoriteLocation.setGugun2(userRequest.getGugun2());
        favoriteLocation.setSido3(userRequest.getSido3());
        favoriteLocation.setGugun3(userRequest.getGugun3());
        this.favoriteLocationRepository.save(favoriteLocation);

    }

    /**
     * 비밀번호 변경
     */
    public UserAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {

        // 이메일로 객체 찾아오기
        UserAuth userAuth = getUserAuthByEmail(updatePasswordRequest.getEmail());

        // 전달된 비밀번호가 기존 DB의 비밀번호와 일치하는지 체크
        if (!passwordEncoder.matches(updatePasswordRequest.getPassword(), userAuth.getPassword())) {
            return null;
        }

        // 변경할 비밀번호 설정하기
        userAuth.setPassword(encodingPassword(updatePasswordRequest.getNewPassword()));
        return this.userAuthRepository.save(userAuth);
    }

    /**
     * 비밀번호 찾기
     */
    public UserAuth resetPassword(UserAuthRequest userAuthRequest) {

        // 이메일로 해당 객체 찾아오기
        UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(userAuthRequest.getEmail());

        // 객체가 없는 경우 null로 return
        if (userAuth == null) return null;

        // 임시 비밀번호 생성 및 메일 전송
        String tempPassword = generateRandomNumber();
        try {
            String msg = "<p><b> " + userAuth.getEmail() + " </b>님의 임시 비밀번호입니다.</p> <p style=color:red;> <h1>" + tempPassword + "</h1> </p>\n \n 로 새롭게 로그인 후 비밀번호를 변경해주세요!";
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("OSDS"); // 보내는 사람
            helper.setTo(userAuth.getEmail());
            helper.setText(msg);
            message.setContent(msg, "text/html; charset=UTF-8");
            helper.setSubject("[OSDS] 비밀번호 찾기 요청에 대한 임시 비밀번호를 보내드립니다.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 임시 비밀번호로 비밀번호 변경하기
        userAuth.setPassword(encodingPassword(tempPassword));
        return this.userAuthRepository.save(userAuth);
    }

    /**
     * 회원탈퇴
     */
    public void deleteUser(ReadAuthRequest readAuthRequest) {
        UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(readAuthRequest.getEmail());
        UserProfile userProfile = this.userProfileRepository.getUserProfileByUserAuth(userAuth);

        // TODO: LoginLog, Position, FavoriteLocation, Manner, GymReview, .. 등등 UserAuth의 id가 속한 모든 table 데이터 지우기
        // gamerecord, gameparticipant, gymreview
        try {
            this.favoriteLocationRepository.deleteByUserAuth(userAuth);
        } catch (Exception e) {
            System.out.println("선호지역");
        }
        try {
            this.positionRepository.deleteByUserAuth(userAuth);
        } catch (Exception e) {
            System.out.println("포지션");
        }
        try {
            this.skillRepository.deleteByUserAuth(userAuth);
        } catch (Exception e) {
            System.out.println("스킬");
        }
        try {
            this.mannerRepository.deleteByUserAuth(userAuth);
        } catch (Exception e) {
            System.out.println("매너");
        }
        try {
            this.gameParticipantRepository.deleteAllByUserAuth(userAuth);
        } catch (Exception e) {
            System.out.println("게임참여자");
        }
        try {
            this.gameRecordRepository.deleteAllByUserId(userAuth.getId());
        } catch (Exception e) {
            System.out.println("게임기록");
        }

        try {
            this.gymReviewRepository.deleteAllByUserId(userAuth.getId());
        } catch (Exception e) {
            System.out.println("체육관리뷰");
        }
        try {
            this.loginLogRepository.deleteAllByEmail(userAuth.getEmail());
        } catch (Exception e) {
            System.out.println("로그인로그");
        }
        try {
            this.userProfileRepository.delete(userProfile);
        } catch (Exception e) {
            System.out.println("유저프로필");
        }
        try {
            this.userAuthRepository.delete(userAuth);
        } catch (Exception e) {
            System.out.println("유저인증");
        }
    }

    /**
     * 이메일로 UserAuth 가져오기
     */
    public UserAuth getUserAuthByEmail(String email) {
        return this.userAuthRepository.getUserAuthByEmail(email);
    }


}
