package com.osds.bitz.service.account.user;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.account.user.UserProfile;
import com.osds.bitz.model.entity.log.LoginLog;
import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.UserAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import com.osds.bitz.repository.account.user.UserProfileRepository;
import com.osds.bitz.repository.log.LoginLogRepository;
import com.osds.bitz.service.account.BaseAuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
@Slf4j
public class UserAuthService extends BaseAuthService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private LoginLogRepository loginLogRepository;

    @Autowired
    private JavaMailSender mailSender;

    // 회원가입
    public UserAuth createUser(UserAuthRequest userAuthRequest) {
        // 이메일이 중복되었는지 확인
        if(this.userAuthRepository.getUserAuthByEmail(userAuthRequest.getEmail()) != null)
            return null;

        // userID로 설정할 랜덤 값 생성
        String userAuthId = generateRandomNumber(true);
        // userID 중복 체크
        UserAuth duplicationUserAuth = this.userAuthRepository.getById(userAuthId);
        while(userAuthId.equals(duplicationUserAuth.getId())){
            userAuthId = generateRandomNumber(true);
        }

        // userauth테이블 내용 설정하기
        UserAuth userAuth = UserAuth.builder()
                .email(userAuthRequest.getEmail())
                .birth(userAuthRequest.getBirth())
                .password(userAuthRequest.getPassword())
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

    // 로그인
    public UserAuth readUser(ReadAuthRequest readAuthRequest) {
        // 이메일과 비밀번호로 객체 찾아오기
        return this.userAuthRepository.findUserAuthByEmailAndPassword(readAuthRequest.getEmail(), readAuthRequest.getPassword());
    }

    // 첫 로그인인지 확인하기
    public UserAuth readFirstUserAuthRequest(ReadAuthRequest readAuthRequest){

        // 이메일로 로그인 로그 객체 찾아오기
        LoginLog loginLog = this.loginLogRepository.getLoginLogByUserEmailAndIsGeneral(readAuthRequest.getEmail(), true);

        if(loginLog == null){               // 최초 로그인시
            loginLog = LoginLog.builder()
                    .userEmail(readAuthRequest.getEmail())
                    .isGeneral(true)
                    .build();
            this.loginLogRepository.save(loginLog);
            return this.userAuthRepository.getUserAuthByEmail(loginLog.getUserEmail());
        }
        return null;
    }

    // 비밀번호 변경
    public UserAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        // 전달된 비밀번호가 기존 DB의 비밀번호와 일치하는지 체크
        if(this.userAuthRepository.getUserAuthByPasswordAndEmail(updatePasswordRequest.getPassword(), updatePasswordRequest.getEmail())==null)
            return null;

        // 이메일로 해당 객체 찾아오기
        UserAuth newUserAuth = new UserAuth();
        newUserAuth = this.userAuthRepository.getUserAuthByEmail(updatePasswordRequest.getEmail());

        // 변경할 비밀번호 설정하기
        newUserAuth.setPassword(updatePasswordRequest.getNewPassword());
        return this.userAuthRepository.save(newUserAuth);
    }

    // 비밀번호 찾기
    public UserAuth readPassword(UserAuthRequest userAuthRequest) {
        // 이메일로 해당 객체 찾아오기
        UserAuth newUserAuth = this.userAuthRepository.getUserAuthByEmail(userAuthRequest.getEmail());

        // 임시 비밀번호 생성 및 메일 전송
        String code = "";
        try {
            code = generateRandomNumber();
            String msg = "<p><b> " + newUserAuth.getEmail() + " </b>님의 임시 비밀번호입니다.</p> <p style=color:red;> <h1>" + code + "</h1> </p>\n \n 로 새롭게 로그인 후 비밀번호를 변경해주세요!";
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
        newUserAuth.setPassword(code);
        return this.userAuthRepository.save(newUserAuth);
    }

    // 회원탈퇴
    public void deleteUserAuth(ReadAuthRequest readAuthRequest){
        UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(readAuthRequest.getEmail());
        UserProfile userProfile = this.userProfileRepository.getUserProfileByUserAuth(userAuth);

        this.userProfileRepository.delete(userProfile);
        this.userAuthRepository.delete(userAuth);
    }

}
