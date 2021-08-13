package com.osds.bitz.service;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.account.business.BusinessProfile;
import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.token.RefreshToken;
import com.osds.bitz.model.network.request.account.BusinessAuthRequest;
import com.osds.bitz.model.network.request.account.BusinessRequest;
import com.osds.bitz.model.network.request.account.ReadAuthRequest;
import com.osds.bitz.model.network.request.account.UpdatePasswordRequest;
import com.osds.bitz.model.network.response.account.BusinessResponse;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import com.osds.bitz.repository.account.business.BusinessProfileRepository;
import com.osds.bitz.repository.game.GameRepository;
import com.osds.bitz.repository.gym.GymRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

@Service
@Slf4j
public class BusinessService extends BaseAuthService {

    @Autowired
    private BusinessAuthRepository businessAuthRepository;

    @Autowired
    private BusinessProfileRepository businessProfileRepository;

    @Autowired
    private GymRepository gymRepository;

    @Autowired
    private GameRepository gameRepository;

    /**
     * 회원가입
     */
    public void createBusiness(BusinessAuthRequest businessAuthRequest) throws IOException {

        // businessId로 설정할 랜덤 값 생성
        String businessAuthId = generateRandomNumber(false);

        // businessId 중복 체크
        BusinessAuth duplicataionBusinessAuth = this.businessAuthRepository.getById(businessAuthId);
        while (businessAuthId.equals(duplicataionBusinessAuth.getId())) {
            businessAuthId = generateRandomNumber(false);
        }

        BusinessAuth businessAuth = BusinessAuth.builder()
                .id(businessAuthId)
                .email(businessAuthRequest.getEmail())
                .password(encodingPassword(businessAuthRequest.getPassword()))
                .birth(businessAuthRequest.getBirth())
                .build();

        BusinessProfile businessProfile = BusinessProfile.builder()
                .name(businessAuthRequest.getName())
                .phone(businessAuthRequest.getPhone())
                .bank(businessAuthRequest.getBank())
                .account(businessAuthRequest.getAccount())
                .businessAuth(businessAuth)
                .build();

        BusinessAuth newBusinessAuth = this.businessAuthRepository.save(businessAuth);
        this.businessProfileRepository.save(businessProfile);
    }

    /**
     * 이메일 중복체크
     */
    public boolean isDuplicatedEmail(String email) {
        // 중복된 이메일이 없는 경우 false
        if (this.businessAuthRepository.getBusinessAuthByEmail(email) == null)
            return false;
        // 중복된 이메일이 있는 경우 true
        return true;
    }

    /**
     * 로그인
     */
    public BusinessAuth readBusiness(ReadAuthRequest readAuthRequest) {
        // 이메일로 객체 찾아오기
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(readAuthRequest.getEmail());

        if (businessAuth == null) return null;

        if (!passwordEncoder.matches(readAuthRequest.getPassword(), businessAuth.getPassword())) return null;

        return businessAuth;
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
        if (this.loginLogRepository.getLoginLogByEmailAndIsGeneral(email, false) != null) {
            return false;
        }
        // 최초 로그인인 경우
        return true;
    }

    /**
     * 마이페이지 정보 조회
     */
    public BusinessResponse readProfile(String email) {
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(email);
        BusinessProfile businessProfile = this.businessProfileRepository.getBusinessProfileByBusinessAuth(businessAuth);
        ArrayList<Gym> gymArrayList = this.gymRepository.getGymsByBusinessAuth(businessAuth);

        BusinessResponse businessResponse = BusinessResponse.builder()
                .email(businessAuth.getEmail())
                .birth(businessAuth.getBirth())
                .phone(businessProfile.getPhone())
                .name(businessProfile.getName())
                .bank(businessProfile.getBank())
                .account(businessProfile.getAccount())
                .gymProfile(gymArrayList)
                .build();

        return businessResponse;
    }

    /**
     * 마이페이지 정보 수정
     */
    public void updateProfile(BusinessRequest businessRequest) {
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(businessRequest.getEmail());
        BusinessProfile businessProfile = this.businessProfileRepository.getBusinessProfileByBusinessAuth(businessAuth);

        // BusinessAuth
        businessAuth.setEmail(businessRequest.getEmail());
        businessAuth.setBirth(businessRequest.getBirth());
        businessAuthRepository.save(businessAuth);

        // BusinessProfile
        businessProfile.setName(businessRequest.getName());
        businessProfile.setPhone(businessRequest.getPhone());
        businessProfile.setBank(businessRequest.getBank());
        businessProfile.setAccount(businessRequest.getAccount());
        businessProfileRepository.save(businessProfile);
    }

    /**
     * 메인 페이지 조회
     */
    public ArrayList<Game> readGameList(String email, Date date) {

        // 이메일로 business 계정 가져오기
        BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthByEmail(email);

        // 체육관 리스트 가져오기
        ArrayList<Gym> gymList = gymRepository.getGymsByBusinessAuth(businessAuth);

        // 체육관별 픽업게임 가져오기
        ArrayList<Game> myPickupGameList = new ArrayList<>();
        for (Gym gym : gymList) {
            ArrayList<Game> gameList = gameRepository.getGamesByGym(gym);
            for (Game game : gameList) {
                if (date.compareTo(game.getDate()) <= 0)
                    myPickupGameList.add(game);
            }
        }
        return myPickupGameList;
    }

    /**
     * 비밀번호 변경
     */
    public BusinessAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {

        // 이메일로 객체 찾아오기
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(updatePasswordRequest.getEmail());

        // 전달된 비밀번호가 기존 DB의 비밀번호와 일치하는지 체크
        if (!passwordEncoder.matches(updatePasswordRequest.getPassword(), businessAuth.getPassword()))
            return null;

        // 변경할 비밀번호 설정하기
        businessAuth.setPassword(encodingPassword(updatePasswordRequest.getNewPassword()));
        return this.businessAuthRepository.save(businessAuth);
    }

    /**
     * 비밀번호 찾기
     */
    public BusinessAuth resetPassword(String email) {

        // 이메일로 객체 찾아오기
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(email);

        if (businessAuth == null)
            return null;

        // 임시 비밀번호 생성 및 메일 전송
        String tempPassword = generateRandomNumber();
        try {
            String msg = "<p><b> " + businessAuth.getEmail() + " </b>님의 임시 비밀번호입니다.</p> <p style=color:red;> <h1>" + tempPassword + "</h1> </p>\n \n 로 새롭게 로그인 후 비밀번호를 변경해주세요!";
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("OSDS"); // 보내는 사람
            helper.setTo(businessAuth.getEmail());
            helper.setText(msg);
            message.setContent(msg, "text/html; charset=UTF-8");
            helper.setSubject("[OSDS] 비밀번호 찾기 요청에 대한 임시 비밀번호를 보내드립니다.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 임시 비밀번호로 비밀번호 변경하기
        businessAuth.setPassword(encodingPassword(tempPassword));
        return this.businessAuthRepository.save(businessAuth);
    }

    /**
     * 회원탈퇴
     */
    public void deleteBusiness(ReadAuthRequest readAuthRequest) {
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(readAuthRequest.getEmail());
        BusinessProfile businessProfile = this.businessProfileRepository.getBusinessProfileByBusinessAuth(businessAuth);

        // TODO" LoginLog, Gym, GymReview, .. 등등 BusinessAuth의 id가 속한 모든 table 데이터 지우기

        this.businessProfileRepository.delete(businessProfile);
        this.businessAuthRepository.delete(businessAuth);
    }
}