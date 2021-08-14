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

        // 관리자 이메일을 통해 businessAuth 객체를 받아온다.
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(gymRequest.getBusinessEmail());

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
                .intro(gymRequest.getIntro())
                .notice(gymRequest.getNotice())
                .build();

        if (businessService.readLoginLog(businessAuth.getEmail()))
            createLoginlog(businessAuth.getEmail());

        return this.gymRepository.save(gym);
    }

    /**
     * 로그인 로그 저장
     */
    public void createLoginlog(String email) {
        // 비즈니스 계정 loginlog에 저장
        LoginLog loginLog = LoginLog.builder()
                .email(email)
                .isGeneral(false)
                .build();
        this.loginLogRepository.save(loginLog);
    }

    /**
     * 체육관 목록 조회
     */
    public List<Gym> getGymList(String businessEmail) {

        BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthByEmail(businessEmail);
        List<Gym> result = gymRepository.getGymsByBusinessAuth(businessAuth);

        return result;
    }

    /**
     * 체육관 상세 정보 조회
     */
    public Gym getGymById(Long gymId) {
        Gym result = gymRepository.getGymById(gymId);
        return result;
    }

    /**
     * 체육관 업데이트
     */
    public Gym updateGym(GymUpdateRequest gymUpdateRequest) {

        String businessEmail = gymUpdateRequest.getBusinessEmail();
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(businessEmail);

        Long gymId = gymUpdateRequest.getGym().getId();
        Gym gymUpdate = gymRepository.getGymById(gymId);
        gymUpdate.setBusinessAuth(businessAuth);
        gymUpdate.setName(gymUpdateRequest.getGym().getName());
        gymUpdate.setAddress(gymUpdateRequest.getGym().getAddress());
        gymUpdate.setSido(gymUpdateRequest.getGym().getSido());
        gymUpdate.setGugun(gymUpdateRequest.getGym().getGugun());
        gymUpdate.setCourtLength(gymUpdateRequest.getGym().getCourtLength());
        gymUpdate.setCourtWidth(gymUpdateRequest.getGym().getCourtWidth());
        gymUpdate.setAirconditional(gymUpdateRequest.getGym().isAirconditional());
        gymUpdate.setWater(gymUpdateRequest.getGym().isWater());
        gymUpdate.setParking(gymUpdateRequest.getGym().isParking());
        gymUpdate.setShower(gymUpdateRequest.getGym().isShower());
        gymUpdate.setBasketball(gymUpdateRequest.getGym().isBasketball());
        gymUpdate.setScoreboard(gymUpdateRequest.getGym().isScoreboard());
        gymUpdate.setIntro(gymUpdateRequest.getGym().getIntro());
        gymUpdate.setNotice(gymUpdateRequest.getGym().getNotice());
        return gymRepository.save(gymUpdate);
    }

    /**
     * 체육관 삭제
     */
    public boolean deleteGym(String businessId, Long gymId) {
        Gym gym = gymRepository.getGymById(gymId);
        if (businessId == null || gymId == null || !gym.getBusinessAuth().getId().equals(businessId)) {
            return false;
        }
        gymRepository.deleteById(gymId);
        return true;
    }


}
