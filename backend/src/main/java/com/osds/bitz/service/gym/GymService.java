package com.osds.bitz.service.gym;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.network.request.gym.GymRequest;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import com.osds.bitz.repository.gym.GymRepository;
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

    // 체육관 등록
    public Gym createGym(GymRequest gymRequest){

        // 관리자 이메일을 통해 businessAuth 객체를 받아온다.
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(gymRequest.getBusinessEmail());

        // gym테이블 내용 설정하기
        Gym gym = Gym.builder()
                .businessAuth(businessAuth)
                .name(gymRequest.getName())
                .address(gymRequest.getAddress())
                .sido(gymRequest.getSido())
                .gugun(gymRequest.getGugun())
                .courtLength(gymRequest.getCourtLength())
                .courtWidth(gymRequest.getCourtWidth())
                .isParking(gymRequest.isParking()?true:false)
                .isShower(gymRequest.isShower()?true:false)
                .isAirconditional(gymRequest.isAirconditional()?true:false)
                .isWater(gymRequest.isWater()?true:false)
                .isBasketball(gymRequest.isBasketball()?true:false)
                .isScoreboard(gymRequest.isScoreboard()?true:false)
                .build();
        return this.gymRepository.save(gym);
    }

    // 체육관 목록
    public List<Gym> getGymList(String businessId) {

        BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthById(businessId);
        List<Gym> result = gymRepository.getGymsByBusinessAuth(businessAuth);

        return result;
    }

    public Gym getGymById(Long gymId) {
        Gym result = gymRepository.getGymById(gymId);
        return result;
    }

}
