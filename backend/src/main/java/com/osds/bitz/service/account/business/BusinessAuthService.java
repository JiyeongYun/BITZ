package com.osds.bitz.service.account.business;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.account.business.BusinessProfile;
import com.osds.bitz.model.entity.log.LoginLog;
import com.osds.bitz.model.network.request.account.business.BusinessAuthRequest;
import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.account.business.BusinessProfileRequest;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import com.osds.bitz.repository.account.business.BusinessProfileRepository;
import com.osds.bitz.service.account.BaseAuthService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
@Slf4j
public class BusinessAuthService extends BaseAuthService {

    @Autowired
    private BusinessAuthRepository businessAuthRepository;

    @Autowired
    private BusinessProfileRepository businessProfileRepository;

    /**
     * 회원가입
     */
    public BusinessAuth createBusiness(BusinessAuthRequest businessAuthRequest) throws IOException {

        // 이메일 중복체크
        if (this.businessAuthRepository.getBusinessAuthByEmail(businessAuthRequest.getEmail()) != null)
            return null;

        // businessId로 설정할 랜덤 값 생성
        String businessAuthId = generateRandomNumber(false);

        // businessId 중복 체크
        BusinessAuth duplicataionBusinessAuth = this.businessAuthRepository.getById(businessAuthId);
        while (businessAuthId.equals(duplicataionBusinessAuth.getId())) {
            businessAuthId = generateRandomNumber(false);
        }

        // 파일 로컬에 저장
        File targetFile = new File("src/main/resources/static/imgs/" + businessAuthRequest.getBusinessRegistration().getOriginalFilename());
        try {
            InputStream fileStream = businessAuthRequest.getBusinessRegistration().getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
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
                .businessRegistration(businessAuthRequest.getBusinessRegistration().getBytes())
                .businessAuth(businessAuth)
                .build();

        BusinessAuth newBusinessAuth = this.businessAuthRepository.save(businessAuth);
        this.businessProfileRepository.save(businessProfile);

        return newBusinessAuth;
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
     * 최초 로그인 확인
     */
    public BusinessAuth readFirstBusinessAuthRequest(ReadAuthRequest readAuthRequest) {

        // 이메일로 로그인 로그 객체 찾아오기
        LoginLog loginLog = this.loginLogRepository.getLoginLogByUserEmailAndIsGeneral(readAuthRequest.getEmail(), false);

        if (loginLog == null) {               // 최초 로그인시
            loginLog = LoginLog.builder()
                    .userEmail(readAuthRequest.getEmail())
                    .isGeneral(false)
                    .build();
            this.loginLogRepository.save(loginLog);
            return this.businessAuthRepository.getBusinessAuthByEmail(loginLog.getUserEmail());
        }
        return null;
    }

    /**
     * 비밀번호 변경
     */
    public BusinessAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {

        // 이메일로 객체 찾아오기
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(updatePasswordRequest.getEmail());

        // 전달된 비밀번호가 기존 DB의 비밀번호와 일치하는지 체크
        if (!passwordEncoder.matches(updatePasswordRequest.getPassword(), businessAuth.getPassword())) return null;

        // 변경할 비밀번호 설정하기
        businessAuth.setPassword(encodingPassword(updatePasswordRequest.getNewPassword()));
        return this.businessAuthRepository.save(businessAuth);
    }

    /**
     * 비밀번호 찾기
     */
    public BusinessAuth readPassword(BusinessAuthRequest businessAuthRequest) {

        // 이메일로 객체 찾아오기
        BusinessAuth newBusinessAuth = this.businessAuthRepository.getBusinessAuthByEmail(businessAuthRequest.getEmail());

        // 임시 비밀번호 생성 및 메일 전송
        String tempPassword = "";
        try {
            tempPassword = generateRandomNumber();
            String msg = "<p><b> " + newBusinessAuth.getEmail() + " </b>님의 임시 비밀번호입니다.</p> <p style=color:red;> <h1>" + tempPassword + "</h1> </p>\n \n 로 새롭게 로그인 후 비밀번호를 변경해주세요!";
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("OSDS"); // 보내는 사람
            helper.setTo(newBusinessAuth.getEmail());
            helper.setText(msg);
            message.setContent(msg, "text/html; charset=UTF-8");
            helper.setSubject("[OSDS] 비밀번호 찾기 요청에 대한 임시 비밀번호를 보내드립니다.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 임시 비밀번호로 비밀번호 변경하기
        newBusinessAuth.setPassword(encodingPassword(tempPassword));
        return this.businessAuthRepository.save(newBusinessAuth);
    }

    /**
     * 회원탈퇴
     */
    public void deleteBusinessAuth(ReadAuthRequest readAuthRequest) {
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(readAuthRequest.getEmail());
        BusinessProfile businessProfile = this.businessProfileRepository.getBusinessProfileByBusinessAuth(businessAuth);

        this.businessProfileRepository.delete(businessProfile);
        this.businessAuthRepository.delete(businessAuth);
    }


    public BusinessProfile readBusinessProfile(BusinessProfileRequest businessProfileRequest) {
        // 이메일로 businessprofile 테이블에서 객체 가져오기
        BusinessProfile businessProfile = this.businessProfileRepository.getBusinessProfileByEmail(businessProfileRequest.getEmail());

        // 이메일로 businessaauth 테이플에서 객체 가져오기
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(businessProfileRequest.getEmail());

        //

        return null;
    }
}
