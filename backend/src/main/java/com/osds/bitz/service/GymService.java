package com.osds.bitz.service;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.log.LoginLog;
import com.osds.bitz.model.network.request.gym.GymRequest;
import com.osds.bitz.model.network.request.gym.GymUpdateRequest;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import com.osds.bitz.repository.gym.GymRepository;
import com.osds.bitz.repository.log.LoginLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class GymService {

    @Autowired
    private GymRepository gymRepository;

    @Autowired
    private BusinessAuthRepository businessAuthRepository;

    @Autowired
    private BusinessService businessService;

    @Autowired
    private LoginLogRepository loginLogRepository;

    /**
     * 체육관 등록
     */
    public Gym createGym(GymRequest gymRequest) {
        // TODO : DB에 잘 들어가고 서버 콘솔에 warn만 찍히나, 프론트에 406에러 발생
        // 관리자 이메일을 통해 businessAuth 객체를 받아온다.
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(gymRequest.getBusinessEmail());
        log.info("{}", "businessAuth : " + businessAuth);
        // gym테이블 내용 설정하기
        Gym gym = Gym.builder()
                .businessAuth(businessAuth)
                .name(gymRequest.getName())
                .address(gymRequest.getAddress())
                .sido(gymRequest.getSido())
                .gugun(gymRequest.getGugun())
                .courtLength(gymRequest.getCourtLength())
                .courtWidth(gymRequest.getCourtWidth())
                .isParking(gymRequest.isParking())
                .isShower(gymRequest.isShower())
                .isAirconditional(gymRequest.isAirconditional())
                .isWater(gymRequest.isWater())
                .isBasketball(gymRequest.isBasketball())
                .isScoreboard(gymRequest.isScoreboard())
                .build();
        log.info("{}", "추가할 gym : " + gym);

        if (businessService.readLoginLog(businessAuth.getEmail()))
            createLoginlog(businessAuth.getEmail());

        return this.gymRepository.save(gym);
    }

    /**
     * 로그인 로그 저장
     */
    public void createLoginlog(String email) {
        // loginlog에 저장
        LoginLog loginLog = LoginLog.builder()
                .email(email)
                .isGeneral(false)
                .build();
        this.loginLogRepository.save(loginLog);
    }

    /**
     * 체육관 삭제
     */
    public void deleteGym(Long gymId, String businessId) {
        Gym gym = gymRepository.getGymById(gymId);

        // 비즈니스 아이디가 동일한 경우
        if (gym.getBusinessAuth().getId().equals(businessId))
            gymRepository.deleteById(gymId);
    }

    /**
     * 체육관 목록
     */
    public List<Gym> getGymList(String businessId) {

        BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthById(businessId);
        List<Gym> result = gymRepository.getGymsByBusinessAuth(businessAuth);

        return result;
    }

    /**
     * 하나의 체육관 조회
     */
    public Gym getGymById(Long gymId) {
        Gym result = gymRepository.getGymById(gymId);
        return result;
    }

    /**
     * 체육관 업데이트
     */
    public Gym updateGym(GymUpdateRequest gymUpdateRequest) {
        Long gymId = gymUpdateRequest.getGym().getId();
        String businessEmail = gymUpdateRequest.getBusinessEmail();
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(businessEmail);


        Gym gymUpdate = gymRepository.getById(gymId);
        log.info("{}", "요청한 정보 : " + gymUpdateRequest);
        if (gymUpdate.getBusinessAuth().getEmail().equals(businessEmail)) {

            gymUpdate = Gym.builder()
                    .businessAuth(businessAuth)
                    .id(gymId)
                    .name(gymUpdateRequest.getGym().getName())
                    .address(gymUpdateRequest.getGym().getAddress())
                    .sido(gymUpdateRequest.getGym().getSido())
                    .gugun(gymUpdateRequest.getGym().getGugun())
                    .courtLength(gymUpdateRequest.getGym().getCourtLength())
                    .courtWidth(gymUpdateRequest.getGym().getCourtWidth())
                    .isAirconditional(gymUpdateRequest.getGym().isAirconditional())
                    .isWater(gymUpdateRequest.getGym().isWater())
                    .isParking(gymUpdateRequest.getGym().isParking())
                    .isShower(gymUpdateRequest.getGym().isShower())
                    .isBasketball(gymUpdateRequest.getGym().isBasketball())
                    .isScoreboard(gymUpdateRequest.getGym().isScoreboard())
                    .build();

        } else
            gymUpdate = null;

        log.info("{}", "업데이트 완료 : " + gymUpdate);

        return gymRepository.save(gymUpdate);
    }

}
