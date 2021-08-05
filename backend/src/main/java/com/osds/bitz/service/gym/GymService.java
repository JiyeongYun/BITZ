package com.osds.bitz.service.gym;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.network.request.gym.GymRequest;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import com.osds.bitz.repository.gym.GymRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class GymService {

    @Autowired
    private GymRepository gymRepository;

    @Autowired
    private BusinessAuthRepository businessAuthRepository;

    // 체육관 등록
    public Gym createGym(GymRequest gymRequest) {

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
                .isParking(gymRequest.isParking() ? true : false)
                .isShower(gymRequest.isShower() ? true : false)
                .isAirconditional(gymRequest.isAirconditional() ? true : false)
                .isWater(gymRequest.isWater() ? true : false)
                .isBasketball(gymRequest.isBasketball() ? true : false)
                .isScoreboard(gymRequest.isScoreboard() ? true : false)
                .build();
        return this.gymRepository.save(gym);
    }

    // 체육관 삭제
    public void deleteGym(Long gymId, String businessId) throws Exception{
        Gym gym = gymRepository.getGymById(gymId);
        if (gym.getBusinessAuth().getId().equals(businessId)) // 비즈니스 아이디가 동일하다면
            gymRepository.deleteById(gymId);
        else
            throw new Exception();
    }

    // 체육관 목록
    public List<Gym> getGymList(String businessId) {

        BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthById(businessId);
        List<Gym> result = gymRepository.getGymsByBusinessAuth(businessAuth);

        return result;
    }

    // 하나의 체육관 조회
    public Gym getGymById(Long gymId) {
        Gym result = gymRepository.getGymById(gymId);
        return result;
    }

    // 체육관 업데이트
    public Gym updateGym(GymRequest gymRequest) {
        BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(gymRequest.getBusinessEmail());
        Gym result = gymRepository.getGymByBusinessAuth(businessAuth);

        log.info("{}", "변경 전 : " + result);
        log.info("{}", "ID : " + result.getId());

        Gym gymUpdate = gymRepository.getById(result.getId());
        log.info("{}" , "잘받아옴 : " + gymUpdate);

        gymUpdate.setBusinessAuth(businessAuth);
        gymUpdate.setName(gymRequest.getName());
        gymUpdate.setAddress(gymRequest.getAddress());
        gymUpdate.setSido(gymRequest.getSido());
        gymUpdate.setGugun(gymRequest.getGugun());
        gymUpdate.setCourtLength(gymRequest.getCourtLength());
        gymUpdate.setCourtWidth(gymRequest.getCourtWidth());
        gymUpdate.setAirconditional(gymRequest.isAirconditional());
        gymUpdate.setWater(gymRequest.isWater());
        gymUpdate.setParking(gymRequest.isParking());
        gymUpdate.setShower(gymRequest.isShower());
        gymUpdate.setBasketball(gymRequest.isBasketball());
        gymUpdate.setScoreboard(gymRequest.isScoreboard());
        log.info("{}", "변경 후 : " + gymUpdate);

        return gymRepository.save(gymUpdate);
    }

}
