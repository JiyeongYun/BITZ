package com.osds.bitz.service.account.user;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.account.user.UserProfile;
import com.osds.bitz.model.entity.log.LoginLog;
import com.osds.bitz.model.entity.token.RefreshToken;
import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.UserAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import com.osds.bitz.repository.account.user.UserProfileRepository;
import com.osds.bitz.service.account.BaseAuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;

@Service
@Slf4j
public class UserAuthService extends BaseAuthService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    /**
     * 회원가입
     */
    public UserAuth createUser(UserAuthRequest userAuthRequest) {

        // userID로 설정할 랜덤 값 생성
        String userAuthId = generateRandomNumber(true);

        // userID 중복 체크
        UserAuth duplicationUserAuth = this.userAuthRepository.getById(userAuthId);
        while (userAuthId.equals(duplicationUserAuth.getId())) {
            userAuthId = generateRandomNumber(true);
        }

        // userauth테이블 내용 설정하기
        UserAuth userAuth = UserAuth.builder()
                .email(userAuthRequest.getEmail())
                .birth(userAuthRequest.getBirth())
                .password(encodingPassword(userAuthRequest.getPassword()))
                .id(userAuthId)
                .build();

        // userauth테이블에서 값 가져와서 userprofile값 설정하기
        UserProfile userProfile = UserProfile.builder()
                .name(userAuthRequest.getName())
                .phone(userAuthRequest.getPhone())
                .userAuth(userAuth)
                .build();

        UserAuth newUserAuth = this.userAuthRepository.save(userAuth);
        this.userProfileRepository.save(userProfile);

        return newUserAuth;
    }

    /**
     * 이메일 중복체크
     */
    public UserAuth checkDuplicatedEmail(String email){
        // 해당 이메일이 이미 존재하는 경우 false
        if (this.userAuthRepository.getUserAuthByEmail(email) != null)
            return null;
        // TODO: 해당 이메일이 없는 경우 true
        return null;
    }

    /**
     * 닉네임 중복체크
     */
    public UserAuth checkDuplicatedNickname(String nickname){
        // 해당 닉네임이 이미 존재하는 경우 false
        if (this.userProfileRepository.getUserProfileByNickname(nickname) != null)
            return null;
        // TODO: 해당 닉네임이 없는 경우 true
        return null;
    }

    /**
     * 로그인
     */
    public UserAuth readUser(ReadAuthRequest readAuthRequest) {

        // 이메일로 객체 찾아오기
        UserAuth userAuth = getUserAuthByEmail(readAuthRequest.getEmail());

        if (userAuth == null) return null;

        if (!passwordEncoder.matches(readAuthRequest.getPassword(), userAuth.getPassword())) return null;

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
    public UserAuth readLoginLog(ReadAuthRequest readAuthRequest) {

        // 이메일로 로그인 로그 객체 찾아오기
        LoginLog loginLog = this.loginLogRepository.getLoginLogByUserEmailAndIsGeneral(readAuthRequest.getEmail(), true);

        if (loginLog == null) {               // 최초 로그인시
            loginLog = LoginLog.builder()
                    .userEmail(readAuthRequest.getEmail())
                    .isGeneral(true)
                    .build();
            this.loginLogRepository.save(loginLog);
            return this.userAuthRepository.getUserAuthByEmail(loginLog.getUserEmail());
        }
        return null;
    }

    /**
     * 마이페이지 정보 저장
     */
    public UserAuth createProfile(UserAuth userAuth){
        // TODO: 구현하기
        return null;
    }

    /**
     * 마이페이지 정보 조회
     */
    public UserAuth readProfile(UserAuth userAuth){
        // TODO: 구현하기
        return null;
    }

    /**
     * 마이페이지 정보 수정
     */
    public UserAuth updateProfile(UserAuth userAuth){
        // TODO: 구현하기
        return null;
    }

    /**
     * 비밀번호 변경
     */
    public UserAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {

        // 이메일로 객체 찾아오기
        UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(updatePasswordRequest.getEmail());

        // 전달된 비밀번호가 기존 DB의 비밀번호와 일치하는지 체크
        if (!passwordEncoder.matches(updatePasswordRequest.getPassword(), userAuth.getPassword())) return null;

        // 변경할 비밀번호 설정하기
        userAuth.setPassword(encodingPassword(updatePasswordRequest.getNewPassword()));
        return this.userAuthRepository.save(userAuth);
    }

    /**
     * 비밀번호 찾기
     */
    public UserAuth resetPassword(UserAuthRequest userAuthRequest) {

        // 이메일로 해당 객체 찾아오기
        UserAuth newUserAuth = this.userAuthRepository.getUserAuthByEmail(userAuthRequest.getEmail());

        // 임시 비밀번호 생성 및 메일 전송
        String tempPassword = "";
        try {
            tempPassword = generateRandomNumber();
            String msg = "<p><b> " + newUserAuth.getEmail() + " </b>님의 임시 비밀번호입니다.</p> <p style=color:red;> <h1>" + tempPassword + "</h1> </p>\n \n 로 새롭게 로그인 후 비밀번호를 변경해주세요!";
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("OSDS"); // 보내는 사람
            helper.setTo(newUserAuth.getEmail());
            helper.setText(msg);
            message.setContent(msg, "text/html; charset=UTF-8");
            helper.setSubject("[OSDS] 비밀번호 찾기 요청에 대한 임시 비밀번호를 보내드립니다.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 임시 비밀번호로 비밀번호 변경하기
        newUserAuth.setPassword(encodingPassword(tempPassword));
        return this.userAuthRepository.save(newUserAuth);
    }

    /**
     * 회원탈퇴
     */
    public void deleteUser(ReadAuthRequest readAuthRequest) {
        UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(readAuthRequest.getEmail());
        UserProfile userProfile = this.userProfileRepository.getUserProfileByUserAuth(userAuth);

        this.userProfileRepository.delete(userProfile);
        this.userAuthRepository.delete(userAuth);
    }

    /**
     * 이메일로 UserAuth 가져오기
     */
    public UserAuth getUserAuthByEmail(String email){
        return this.userAuthRepository.getUserAuthByEmail(email);
    }


}
